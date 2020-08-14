import {
  concat,
  get,
  indexOf,
  keys,
  omit,
  slice,
  uniq,
  omitBy,
  isUndefined,
  isArray,
  isPlainObject,
} from 'lodash'

/*
Immutable empty array. Using this instead of `[]` avoids having several instances of immutable empty arrays.
*/
export const EMPTY_ARRAY = Object.freeze([])

/*
Immutable empty object. Using this instead of `{}` avoids having several instances of immutable empty objects.
*/
export const EMPTY_OBJECT = Object.freeze(Object.create(null))

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
    : [...slice(array, 0, index), value, ...slice(array, index)]
}

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
    : [...slice(array, 0, index), ...value, ...slice(array, index)]
}

export function replaceItem(array, previousValue, value) {
  /*
  Returns a new array with the first occurence of the `previousValue` in `array` replaced by `value`.
  Returns the same `array` if the `previousValue` is not found.
  If the `array` is `nil`, it is considered as an `EMPTY_ARRAY`.
  */
  return setItem(array, indexOf(array, previousValue), value)
}

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
      ? [...slice(array, 0, index), ...slice(array, index + 1)]
      : array
    : array[index] === value
    ? array
    : [...slice(array, 0, index), value, ...slice(array, index + 1)]
}

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
    ? omitUndefined(values, isUndefined)
    : same(object, values, keys(values))
    ? object
    : omitUndefined({ ...object, ...values })
}

export function setPath(target, path, value, index = 0) {
  /*
  Returns a new object or array based on `target` with its `path` set to `value`.
  Recursively uses `setItem` and `setProperty` based on the type of each `path` item (`number` and `object`, respectively).
  If `path` is `nil`, returns `value`.
  */
  if (!path || index === path.length) {
    return value
  }
  const key = path[index]
  const setter = typeof key === 'number' ? setItem : setProperty
  return setter(
    !target
      ? null
      : setter === setItem
      ? !isArray(target)
        ? null
        : target
      : !isPlainObject(target)
      ? null
      : target,
    key,
    setPath(target && target[key], path, value, index + 1),
  )
}

export function same(
  a,
  b,
  properties = a !== b &&
    a != null &&
    b != null &&
    uniq(concat(keys(a), keys(b))),
  deep = false,
) {
  /*
  Returns `true` if objects `a` and `b` have the same `properties`.
  Unless provided, `properties` are the combined set of property names from `a` and `b`.
  If `deep` is `true`, considers properties as paths (e.g., `p1.p2`).
  */
  if (a === b) {
    return true
  }
  if (a == null || b == null) {
    return false
  }
  const { length } = properties
  for (let i = 0; i < length; i++) {
    const property = properties[i]
    if (deep) {
      if (get(a, property) !== get(b, property)) {
        return false
      }
    } else {
      if (a[property] !== b[property]) {
        return false
      }
    }
  }
  return true
}

export function different(properties, deep = true) {
  /*
  Returns a function that returns `true` if one of the `properties` of the objects `(a, b)` differs. This is usefull when deep-nested comparisons are required.

  Example:

    // Extracts the name from a `value` prop and updates it only if it changes
    const withName = withPropsOnChange(
      different(['value.name']),
      ({ value: { name } }) => ({ name }),
    )
  */
  return (a, b) => !same(a, b, properties, deep)
}
