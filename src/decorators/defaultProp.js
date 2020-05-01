import { isString, upperFirst } from 'lodash'

import { $ } from '../tools/$'
import { setWrapperName } from '../tools/setWrapperName'
import { EMPTY_OBJECT } from '../constants/EMPTY_OBJECT'

export function defaultProp(options) {
  /*
  Sets `[name]` to `[defaultName]` if `[name]` is `nil`.
  */
  const name = isString(options) ? options : options.name
  const { defaultName = `default${upperFirst(name)}` } =
    name === options ? EMPTY_OBJECT : options
  return (Component) =>
    setWrapperName(Component, function defaultProp(props) {
      const { [defaultName]: defaultValue, [name]: value } = props
      return $(
        Component,
        defaultValue == null
          ? props
          : {
              ...props,
              [name]: value == null ? defaultValue : value,
            },
      )
    })
}
