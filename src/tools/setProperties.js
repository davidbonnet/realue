import { omitBy, isUndefined, keys } from 'lodash'

import { EMPTY_OBJECT } from '../constants/EMPTY_OBJECT'

import { same } from './same'

function omitUndefined(object) {
  for (const name in object) {
    if (object[name] === undefined) {
      return omitBy(object, isUndefined)
    }
  }
  return object
}

export function setProperties(object, values) {
  /*
  Returns a new object with the properties of `values` merged into `object`.
  */
  return values == null
    ? object == null
      ? EMPTY_OBJECT
      : object
    : object == null
    ? omitUndefined(values)
    : same(object, values, keys(values))
    ? object
    : omitUndefined({ ...object, ...values })
}
