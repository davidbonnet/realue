import { EMPTY_ARRAY } from '../constants/EMPTY_ARRAY'

export function insertItem(
  array,
  value,
  index = array == null ? 0 : array.length,
) {
  /*
  Returns a new array with the `value` inserted into the `array` at the provided `index`, provided `value` is not `undefined`, in which case the `array` is returned untouched.
  If the `index` is not provided, the `value` appended to the `array`.
  If the `array` is `nil`, it is considered as an `EMPTY_ARRAY`.
  */
  return array == null
    ? value === undefined
      ? EMPTY_ARRAY
      : [value]
    : value === undefined
    ? array
    : [...array.slice(0, index), value, ...array.slice(index)]
}
