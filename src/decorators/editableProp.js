import { Component as BaseComponent } from 'react'
import { isString, upperFirst } from 'lodash'

import { $ } from '../tools/$'
import { setWrapperName } from '../tools/setWrapperName'
import { EMPTY_OBJECT } from '../constants/EMPTY_OBJECT'

export function editableProp(options) {
  /*
  Enables a value prop of a given `name` to be locally editable.
  The value can be updated with `[onChangeName]`.
  */
  const name = isString(options) ? options : options.name
  const { onChangeName = `onChange${upperFirst(name)}` } =
    name === options ? EMPTY_OBJECT : options
  return (Component) =>
    setWrapperName(
      Component,
      class editableProp extends BaseComponent {
        constructor(props) {
          super(props)
          this.state = {
            value: props[name],
          }
          this.onChange = (value) => this.setState({ value })
        }
        render() {
          return $(Component, {
            ...this.props,
            [name]: this.state.value,
            [onChangeName]: this.onChange,
          })
        }
      },
    )
}
