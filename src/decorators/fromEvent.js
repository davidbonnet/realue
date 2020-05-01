import { Component as BaseComponent } from 'react'
import { get, memoize } from 'lodash'

import { $ } from '../tools/$'
import { setWrapperName } from '../tools/setWrapperName'
import { lazyProperty } from '../tools/lazyProperty'

function onChange(element, path) {
  switch (path) {
    case 'target.value':
      return (event) => {
        const { props } = element
        return props.onChange(event.target.value, props.name, event)
      }
    case 'target.checked':
      return (event) => {
        const { props } = element
        return props.onChange(event.target.checked, props.name, event)
      }
    case undefined:
    case null:
      return (event) => {
        const { props } = element
        return props.onChange(props.value, props.name, event)
      }
    default:
      return (event) => {
        const { props } = element
        props.onChange(get(event, path), props.name, event)
      }
  }
}

export const fromEvent = memoize((path) => {
  /*
  Creates an `onChange` handler that takes the value from `get(event, path)`.
  If `path` is `nil`, the value is taken from the `value` prop instead.
  */
  return (Component) =>
    setWrapperName(
      Component,
      class fromEvent extends BaseComponent {
        render() {
          const { props } = this
          return $(
            Component,
            props.onChange == null
              ? props
              : {
                  ...props,
                  onChange: lazyProperty(this, 'onChange', onChange, path),
                },
          )
        }
      },
    )
})
