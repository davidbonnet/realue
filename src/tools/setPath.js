import { isArray, isPlainObject } from 'lodash'

import { setItem } from './setItem'
import { setProperty } from './setProperty'

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
