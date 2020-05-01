import {
  identity,
  map,
  find,
  upperCase,
  isString,
  assign,
  pick,
  lowerCase,
  isPlainObject,
  isArray,
  keys,
  mapKeys,
} from 'lodash'

import { sleep, untilOnline } from './promises'
import { EMPTY_OBJECT, setProperty } from './immutables'

export class QueryError extends Error {
  /*
  Error to be thrown in case there is an issue with the query call. Only instances of this error will be caught by the `retry()` middleware. 
  */
  constructor(message, status, response) {
    super(message)
    if (isPlainObject(message)) {
      this.value = message
    }
    this.status = status
    this.response = response
  }
}

// Middlewares

export function retry({
  amount = 5,
  delay = 1000,
  delayDelta = 500,
} = EMPTY_OBJECT) {
  /*
  Retries a failed query call up to `amount` times, with a given `delay` in milliseconds at ±`delayDelta` milliseconds.
  Note that an `amount` set to `Infinity` results in indefinitely trying to resolve a query call.
  Only instances of `QueryError` will result in new tries. Other errors will propagate immediately.
  */
  delay -= delayDelta
  delayDelta *= 2
  return (next) => (query) => {
    let errorsLeft = amount
    const fetch = () =>
      next(query).catch((error) =>
        untilOnline().then((wasOffline) => {
          if (wasOffline) {
            return fetch()
          }
          if (
            !(error instanceof QueryError) ||
            error.status < 500 ||
            --errorsLeft < 0
          ) {
            throw error
          }
          return sleep(
            delay + ((Math.random() * delayDelta) | 0),
            query.signal,
          ).then(fetch)
        }),
      )
    return fetch()
  }
}

export function branchQuery(condition, left, right = identity) {
  /*
  Dispatches an incoming query to `left` if `condition(query)` returns a truthy value, `right` otherwise. This is helpful for sending queries to different resolvers.

  Example:

    const request = compose(
      split(query => query.protocol === 'gql', gqlHandlers),
      fetchJson(),
    )(identity)
  */
  return (next) => (query) => (condition(query) ? left : right)(next)(query)
}

export function cache({
  serialize = ({ value = EMPTY_OBJECT, method = 'get', type, refresh }) =>
    !refresh && method === 'get' && value.id && `${type}/${value.id}`,
  engine = new Map(),
  duration = 10 * 60 * 1000,
} = EMPTY_OBJECT) {
  /*
  Caches the result of a query if `serialize` returns a non-empty string key. The `engine` should follow the `Map` API. Elements are kept in the cache until the `duration` in milliseconds expires.
  Note that a `duration` set to `Infinity` indefinitely keeps items in the cache.
  */
  return (next) => (query) => {
    const key = serialize(query)
    if (!key) {
      return next(query)
    }
    const item = engine.get(key)
    if (item == null || item.expiration <= Date.now()) {
      return next(query).then((result) => {
        engine.set(key, { result, expiration: Date.now() + duration })
        return result
      })
    }
    return Promise.resolve(item.result)
  }
}

export function aggregate({
  categorize = ({ type, method = 'get' }) => method === 'get' && type,
  serialize = ({ value = EMPTY_OBJECT }) => value.id,
  delay = 200,
  reduce = (queries) => ({
    type: queries[0].type,
    method: 'list',
    filter: {
      id: map(queries, 'value.id'),
    },
  }),
  pick = (result, query) => {
    const queryResult = find(result, query.value)
    if (!queryResult) {
      throw new Error('Not found')
    }
    return queryResult
  },
} = EMPTY_OBJECT) {
  /*
  Aggregates multiple incoming query calls into one query.
  Queries are grouped according to the string key returned by `categorize(query)`. Inside a group, each query is identified with `serialize(query)`.
  The aggregated query is built from the object returned by `reduce(queries)`, after at least `delay` milliseconds after the first non-aggregated aggregatable query call.
  When the aggregated query resolves, the result is dispatched back to each aggregatable query call of the category by dispatching the result for each query returned by `pick(result, query)`.`
  */
  const groups = new Map()
  return (next) => (query) => {
    const category = categorize(query)
    if (!category) {
      return next(query)
    }
    const key = serialize(query)
    if (!key) {
      return next(query)
    }
    if (!groups.has(category)) {
      const queries = []
      groups.set(category, {
        request: sleep(delay).then(() => {
          groups.delete(category)
          return queries.length === 1
            ? next(queries[0])
            : next(reduce(queries, category))
        }),
        requests: {},
        queries,
      })
    }
    const { request, requests, queries } = groups.get(category)
    if (requests[key]) {
      return requests[key]
    }
    queries.push(query)
    return (requests[key] = Promise.resolve(request).then((result) =>
      queries.length === 1 ? result : pick(result, query),
    ))
  }
}

const BODY_METHODS = {
  post: true,
  put: true,
  patch: true,
}

export function toFetchQuery(routes, transform = identity) {
  /*
  Converts a `query` into a DOM Fetch query. The resulting `query` is passed onto `transform(query)` before sending it.
  To be used in conjunction with `fetchJson()`.
  */
  return (next) => (query) => {
    const { method = 'get' } = query
    const routeOrUrl = routes[query.type][method](query)
    const route = isString(routeOrUrl) ? { url: routeOrUrl } : routeOrUrl
    const { method: fetchMethod = method } = route
    return next(
      transform(
        {
          body:
            BODY_METHODS[lowerCase(fetchMethod)] && JSON.stringify(query.value),
          method: fetchMethod === 'list' ? 'GET' : upperCase(fetchMethod),
          mode: 'cors',
          cache: 'no-store',
          signal: query.signal,
          ...route,
        },
        query,
      ),
    )
  }
}

const { URLSearchParams } = globalThis

export function queryString(values) {
  /*
  Returns a key-sorted query string from provided `values` object.
  */
  const result = new URLSearchParams()
  for (const name in values) {
    const value = values[name]
    if (value == null) {
      continue
    }
    result.append(name, values[name])
  }
  result.sort()
  return result.toString()
}

const QUERY_SEARCH_PARAMS = ['fields', 'start', 'limit', 'order']

export function searchParams(query) {
  /*
  Returns an object containing all search parameters of a provided `query`.
  */
  return assign(pick(query, QUERY_SEARCH_PARAMS), query.filter)
}

export const json = (next) => (query) => {
  if (query.body != null) {
    query.headers = setProperty(
      query.headers,
      'content-type',
      'application/json',
    )
  }
  return next(query).then(
    (response) => response.json(),
    (error) => {
      if (error.response) {
        return error.response.json().then((result) => {
          throw new QueryError(result, error.status)
        })
      }
      throw error
    },
  )
}

export const text = (next) => (query) =>
  next(query).then(
    (response) => response.text(),
    (error) => {
      if (error.response) {
        return error.response.text().then((result) => {
          throw new QueryError(result, error.status)
        })
      }
      throw error
    },
  )

export function fetch(fetch = globalThis.fetch) {
  /*
  Calls the provided `fetch`, which defaults to the DON `fetch` function, with the incoming `query`.
  To be used in conjunction with `toFetchQuery()`.
  */
  if (process.env.NODE_ENV !== 'production' && !fetch) {
    console.error('Could not find a global `fetch` function')
  }
  return () => (query) => {
    return fetch(query.url, query).then(
      (response) => {
        if (!response.ok) {
          throw new QueryError(response.statusText, response.status, response)
        }
        return response
      },
      (error) => {
        throw new QueryError(error.message, error.status || 500)
      },
    )
  }
}

export function logQuery(title = 'Query') {
  /*
  Logs the outgoing query and the incoming result or the error.
  */
  if (process.env.NODE_ENV === 'production') {
    return identity
  }
  return (next) => (query) => {
    /* eslint-disable no-console */
    console.group(title)
    console.info('query', query)
    return next(query).then(
      (result) => {
        console.log('result', result)
        console.groupEnd()
        return result
      },
      (error) => {
        console.log('error', error)
        console.groupEnd()
        throw error
      },
    )
    /* eslint-enable no-console */
  }
}

export function concurrent(next) {
  /*
  Runs concurrent queries if `query.queries` contains a list or a map of queries, resulting in a list or map of resolved queries.
  Otherwise, passes the query to the next handler.
  */
  const request = (query) => {
    const { queries } = query
    if (!queries) {
      return next(query)
    }
    const names = !isArray(queries) && keys(queries)
    return Promise.all(
      map(names ? map(names, (name) => queries[name]) : queries, (query) =>
        request(query),
      ),
    ).then((results) =>
      names ? mapKeys(results, (result, index) => names[index]) : results,
    )
  }
  return request
}
