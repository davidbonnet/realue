import { Component as BaseComponent } from 'react'
import { keys, identity } from 'lodash'

import { $ } from '../tools/$'
import { setWrapperName } from '../tools/setWrapperName'
import { EMPTY_OBJECT } from '../constants/EMPTY_OBJECT'

/* eslint-disable no-console */
function wrapProps(
  title,
  currentWrappedMethods,
  props,
  previousProps,
  propNames,
) {
  let wrappedMethods = currentWrappedMethods
  let updated = false
  console.group(title)
  for (const name of propNames || keys(props)) {
    const value = props[name]
    const previousValue = previousProps[name]
    if (value !== previousValue) {
      if (!updated) {
        updated = true
      }
      if (typeof value === 'function') {
        if (wrappedMethods === currentWrappedMethods) {
          wrappedMethods = { ...currentWrappedMethods }
        }
        wrappedMethods[name] = (...parameters) => {
          console.group(`Calling "${title}.${name}" with parameters:`)
          for (const parameter of parameters) {
            console.log(parameter)
          }
          console.groupEnd()
          return value(...parameters)
        }
      }
      console.group(name)
      console.log('Previous:', previousValue)
      console.log('New:', value)
      console.groupEnd()
    }
  }
  if (!updated) {
    console[propNames ? 'log' : 'warn'](
      'Element got re-rendered with no property changes',
    )
  }
  console.groupEnd()
  for (const name in wrappedMethods) {
    if (props[name] == null) {
      if (wrappedMethods === currentWrappedMethods) {
        wrappedMethods = { ...currentWrappedMethods }
      }
      delete wrappedMethods[name]
    }
  }
  /* eslint-enable no-console */
  return {
    wrappedMethods,
    props,
  }
}

export function logProps(propNames, title) {
  /*
  Logs the provided `propNames` whenever they change.
  The `title` defaults to the component name.
  If `propNames` is `nil`, logs all props.
  */
  if (process.env.NODE_ENV === 'production') {
    return identity
  }
  return (Component) =>
    setWrapperName(
      Component,
      class logProps extends BaseComponent {
        constructor(props) {
          super(props)
          this.state = wrapProps(
            title || Component.displayName || Component.name,
            EMPTY_OBJECT,
            props,
            EMPTY_OBJECT,
            propNames,
          )
        }
        static getDerivedStateFromProps(props, state) {
          return wrapProps(
            title || Component.displayName || Component.name,
            state.wrappedMethods,
            props,
            state.props,
            propNames,
          )
        }
        render() {
          return $(Component, { ...this.props, ...this.state.wrappedMethods })
        }
      },
    )
}
