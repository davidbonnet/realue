import { isArray, pick, mapValues, get } from 'lodash'

export function picked(propNamesOrMap) {
  /*
  Returns a function that returns a subset of the provided object or a mapping of selected property paths.

  Examples:

    // Only keeps the `value` prop
    mapProps(picked(['value']))

    // Only keeps the `value` prop renamed to `user`
    mapProps(picked({ user: 'value' }))

    // Injects selected properties of `value`
    withProps(picked({ done: 'value.done', error: 'value.error', value: 'value.value' }))

  */
  if (isArray(propNamesOrMap)) {
    return (props) => pick(props, propNamesOrMap)
  }
  return (props) => mapValues(propNamesOrMap, (path) => get(props, path))
}
