import { Component as BaseComponent } from 'react'
import { isString, upperFirst } from 'lodash'

import { $ } from '../tools/$'
import { setWrapperName } from '../tools/setWrapperName'
import { EMPTY_OBJECT } from '../constants/EMPTY_OBJECT'

export function initialProp(options) {
  /*
  Sets `[name]` to `[initialName]` on first render if `[initialName]` is not `nil`, then to `[name]` for subsequent renders.
  */
  const name = isString(options) ? options : options.name
  const { initialName = `initial${upperFirst(name)}` } =
    name === options ? EMPTY_OBJECT : options
  return (Component) =>
    setWrapperName(
      Component,
      class initialProp extends BaseComponent {
        constructor(props) {
          super(props)
          this.state = { initial: true }
        }
        componentDidMount() {
          if (this.state.initial) {
            this.setState({ initial: false })
          }
        }
        render() {
          const { props } = this
          return $(
            Component,
            this.state.initial
              ? { ...props, [name]: props[initialName] }
              : props,
          )
        }
      },
    )
}
