import { omit } from 'lodash'

import { EMPTY_OBJECT } from '../constants/EMPTY_OBJECT'

export function setProperty(object, key, value) {
  /*
  Returns a new object with `object[key]` set to `value` if `object[key]` is strictly different from `value`. Otherwise, returns the provided `object`.
  If `value` is `undefined`, ensures that the returned object does not contain the `key`.
  If `key` is `undefined`, returns the `object` untouched.
  If `object` is `nil`, it is considered as an `EMPTY_OBJECT`.
  */
  return key === undefined
    ? object == null
      ? EMPTY_OBJECT
      : object
    : object == null
    ? value === undefined
      ? EMPTY_OBJECT
      : { [key]: value }
    : value === undefined
    ? key in object
      ? omit(object, key)
      : object
    : object[key] === value
    ? object
    : { ...object, [key]: value }
}
