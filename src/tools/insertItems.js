import { EMPTY_ARRAY } from '../constants/EMPTY_ARRAY'

export function insertItems(
  array,
  value,
  index = array == null ? 0 : array.length,
) {
  /*
  Returns a new array with the `value` array merged into the `array` at the provided `index`, provided `value` is not `nil`, in which case the `array` is returned untouched.
  If the `index` is not provided, the `value` array is appended to the `array`.
  If the `array` is `nil`, it is considered as an `EMPTY_ARRAY`.
  */
  return array == null
    ? value == null
      ? EMPTY_ARRAY
      : value
    : value == null
    ? array
    : [...array.slice(0, index), ...value, ...array.slice(index)]
}
