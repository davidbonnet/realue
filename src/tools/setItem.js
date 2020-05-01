import { EMPTY_ARRAY } from '../constants/EMPTY_ARRAY'

export function setItem(array, index, value) {
  /*
  Returns a new array with `array[index]` set to `value` if `array[index]` is strictly different from `value`. Otherwise, returns the provided `array`.
  If `value` is `undefined`, ensures that the returned array does not contain the item found at `index`.
  If `index` is greater than `array.length`, appends `value` to the `array`.
  If `index` equals `-1` or is `undefined`, returns the `array` untouched.
  If the `array` is `nil`, it is considered as an `EMPTY_ARRAY`.
  */
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    if (index != null && !isFinite(index)) {
      throw new Error(
        `Expected "index" to be a number, but is of type "${typeof index}" instead`,
      )
    }
  }
  return index === -1 || index == null
    ? array == null
      ? EMPTY_ARRAY
      : array
    : array == null
    ? value === undefined
      ? EMPTY_ARRAY
      : [value]
    : value === undefined
    ? index < array.length
      ? [...array.slice(0, index), ...array.slice(index + 1)]
      : array
    : array[index] === value
    ? array
    : [...array.slice(0, index), value, ...array.slice(index + 1)]
}
