import { Component as BaseComponent } from 'react'
import { isString } from 'lodash'

import { $ } from '../tools/$'
import { setWrapperName } from '../tools/setWrapperName'
import { EMPTY_OBJECT } from '../constants/EMPTY_OBJECT'

export function resilientProp(options) {
  /*
  Keeps the last non-`nil` value of prop `[name]`.
  If `constantName` is provided, keeps the last non-`nil` value of prop `[name]` only if prop `[constantName]` did change.
  If `delayName` is provided, unconditionally updates the value of prop `[name]` only if prop `[delayName]` is truthy.
  */
  const name = isString(options) ? options : options.name
  const { constantName = false, delayName = false } =
    name === options ? EMPTY_OBJECT : options
  return (Component) =>
    setWrapperName(
      Component,
      class resilientProp extends BaseComponent {
        constructor(props) {
          super(props)
          this.state = constantName
            ? {
                value: props[name],
                constant: props[constantName],
              }
            : { value: props[name] }
        }
        static getDerivedStateFromProps(props, state) {
          const value = props[name]
          if (constantName) {
            if (props[constantName] === state.constant) {
              return null
            }
            return {
              value: value == null ? state.value : value,
              constant: props[constantName],
            }
          }
          if (delayName) {
            if (props[delayName]) {
              if (value === state.value) {
                return null
              }
              return { value }
            }
          }
          if (value == null || value === state.value) {
            return null
          }
          return { value }
        }
        render() {
          return $(Component, {
            ...this.props,
            [name]: this.state.value,
          })
        }
      },
    )
}
