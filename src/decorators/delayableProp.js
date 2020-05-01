import { Component as BaseComponent } from 'react'
import { set, isString, upperFirst, debounce, throttle } from 'lodash'

import { $ } from '../tools/$'
import { setWrapperName } from '../tools/setWrapperName'
import { EMPTY_OBJECT } from '../constants/EMPTY_OBJECT'

function sentinel(value, sentinel) {
  if (sentinel) {
    return value
  }
  let lastArgs = null
  return set(
    (...args) => {
      lastArgs = args
    },
    'cancel',
    () => {
      if (lastArgs != null) {
        value(...lastArgs)
      }
    },
  )
}

export function delayableProp(options) {
  /*
  Delays `[name]` calls until after `[delayName]` milliseconds have elapsed since the last call if `options.mode` is `'debounce'` (default value), or calls `[name]` at most once every `[delayName]` milliseconds if `options.mode` is `'throttle'`. The `mode` can also be a function that returns a callback based from the `([name], [delayName])` arguments.
  Renames undelayed `[name]` as `['onPush' + name]`.
  If `[delayName]` is falsy, no delay occurs nor the injection of `[onPushName]`.
  */
  const name = isString(options) ? options : options.name
  const capitalizedName = upperFirst(name)
  const {
    delayName = `delay${capitalizedName}`,
    onPushName = `onPush${capitalizedName}`,
    mode = 'debounce',
  } = name === options ? EMPTY_OBJECT : options
  const debouncer =
    mode === 'debounce'
      ? debounce
      : mode === 'throttle'
      ? throttle
      : mode === 'sentinel'
      ? sentinel
      : mode
  if (process.env.NODE_ENV !== 'production') {
    if (typeof debouncer !== 'function') {
      throw new Error(`Unknown debounce mode supplied: "${mode}"`)
    }
  }
  return (Component) =>
    setWrapperName(
      Component,
      class delayableProp extends BaseComponent {
        constructor(props) {
          super(props)
          const { [name]: value, [delayName]: delay } = props
          this.state = {
            value,
            delay,
            debouncedValue: !delay ? null : debouncer(value, delay),
          }
        }
        static getDerivedStateFromProps(props, state) {
          const { [name]: value, [delayName]: delay } = props
          if (value === state.value && delay === state.delay) {
            return null
          }
          return {
            value,
            delay,
            debouncedValue: debouncer(value, delay),
          }
        }
        componentDidUpdate(prevProps, prevState) {
          const { debouncedValue } = this.state
          if (debouncedValue === prevState.debouncedValue) {
            return
          }
          if (debouncedValue && typeof debouncedValue.cancel === 'function') {
            debouncedValue.cancel()
          }
        }
        componentWillUnmount() {
          const { debouncedValue } = this.state
          if (debouncedValue && typeof debouncedValue.cancel === 'function') {
            debouncedValue.cancel()
          }
        }
        render() {
          const { props } = this
          return $(
            Component,
            !props[delayName]
              ? props
              : {
                  ...props,
                  [name]: this.state.debouncedValue,
                  [onPushName]: props[name],
                },
          )
        }
      },
    )
}
