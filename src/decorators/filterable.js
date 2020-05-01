import { Component as BaseComponent } from 'react'

import { $ } from '../tools/$'
import { setWrapperName } from '../tools/setWrapperName'
import { lazyProperty } from '../tools/lazyProperty'

function onChange(element) {
  return (value, name, payload) => {
    const { props } = element
    return !props.filterOnChange(value, name, payload)
      ? null
      : props.onChange(value, name, payload)
  }
}

export const filterable = (Component) => {
  /*
  Prevents `value` update if `filterValue(value, previousValue)` is set and returns `false`.
  Prevents `onChange` call if `filterOnChange(value, name, payload)` is set and returns `false`. Using `onPush` calls `onChange` unconditionally.
  */
  return setWrapperName(
    Component,
    class filterable extends BaseComponent {
      static getDerivedStateFromProps({ value, filterValue }, state) {
        return state &&
          (value === state.value ||
            (filterValue && !filterValue(value, state.value)))
          ? null
          : { value }
      }
      render() {
        const { props } = this
        return $(Component, {
          ...props,
          value: this.state.value,
          ...(props.onChange && props.filterOnChange
            ? {
                onChange: lazyProperty(this, 'onChange', onChange),
                onPush: props.onChange,
              }
            : null),
        })
      }
    },
  )
}
