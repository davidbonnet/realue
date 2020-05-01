import { indexOf } from 'lodash'

import { setItem } from './setItem'

export function replaceItem(array, previousValue, value) {
  /*
  Returns a new array with the first occurence of the `previousValue` in `array` replaced by `value`.
  Returns the same `array` if the `previousValue` is not found.
  If the `array` is `nil`, it is considered as an `EMPTY_ARRAY`.
  */
  return setItem(array, indexOf(array, previousValue), value)
}
