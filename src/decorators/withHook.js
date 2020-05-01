import { stubArray, isArray, isString, fromPairs, map } from 'lodash'

import { $ } from '../tools/$'
import { Null } from '../components/Null'

export function withHook(hook, source = stubArray, result) {
  /*
  Uses the provided `hook`, with the arguments extracted from `source`,
  and reinjects the value from `result` back into the props.

  Example:

    compose(
      withProps({ initialCount: 0 }),
      withHook(useState, ['initialCount'], ['count', 'onChangeCount']),
    )(({ count, onChangeCount }) =>
      $(
        'div',
        'Count: ',
        count,
        $('button', { onClick: () => onChangeCount(count + 1) }),
      ),
    )
  */
  const sourceValues =
    source == null
      ? stubArray
      : isString(source)
      ? (props) => [props[source]]
      : isArray(source)
      ? (props) => map(source, (name) => props[name])
      : source
  const resultValues =
    result == null
      ? Null
      : isString(result)
      ? (values) => ({ [result]: values })
      : isArray(result)
      ? (values) =>
          fromPairs(map(result, (name, index) => [name, values[index]]))
      : result
  return (Component) => (props) =>
    $(Component, {
      ...props,
      ...resultValues(hook(...sourceValues(props))),
    })
}
