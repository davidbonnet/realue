import { Component as BaseComponent } from 'react'

import { $ } from '../tools/$'
import { setWrapperName } from '../tools/setWrapperName'
import { lazyProperty } from '../tools/lazyProperty'
import { EMPTY_OBJECT } from '../constants/EMPTY_OBJECT'

function transformedOnChange(element) {
  return (value, name, payload) => {
    const { props } = element
    return props.onChange(
      props.transformOnChange(value, name, payload, element.state),
      name,
      payload,
    )
  }
}

export const transformable = (Component) =>
  /*
  Replaces `value` with the return value of `transformValue(value, previous: { transformedValue?, value? })`, if set. Note that `previous` is not provided when the component first mounts, since there are no previous prop values.
  Replaces `value` passed to `onChange(value, name, payload)` with the return value of `transformOnChange(value, name, payload, previous: { transformedValue?, value? })`, if set.
  */
  setWrapperName(
    Component,
    class transformable extends BaseComponent {
      constructor(props) {
        super(props)
        const { value, transformValue } = props
        this.state = {
          value,
          transformValue,
          transformedValue:
            transformValue && transformValue(value, EMPTY_OBJECT),
        }
      }
      static getDerivedStateFromProps({ value, transformValue }, state) {
        return value === state.value && transformValue === state.transformValue
          ? null
          : {
              value,
              transformValue,
              transformedValue: transformValue && transformValue(value, state),
            }
      }
      render() {
        const { props, state } = this
        const { transformValue, transformOnChange } = props
        return $(
          Component,
          !(transformValue || transformOnChange)
            ? props
            : {
                ...props,
                value: transformValue ? state.transformedValue : props.value,
                onChange:
                  transformOnChange && props.onChange
                    ? lazyProperty(
                        this,
                        'transformedOnChange',
                        transformedOnChange,
                      )
                    : props.onChange,
              },
        )
      }
    },
  )
