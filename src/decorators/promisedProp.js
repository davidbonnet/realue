import { Component as BaseComponent } from 'react'
import { isString, upperFirst } from 'lodash'
import isPromise from 'is-promise'

import { $ } from '../tools/$'
import { setWrapperName } from '../tools/setWrapperName'
import { EMPTY_OBJECT } from '../constants/EMPTY_OBJECT'

function attachPromise(element, promise) {
  return promise.then(
    (value) => {
      if (!element.mounted || element.state.promise !== promise) {
        return
      }
      element.setState({ done: true, error: undefined, value })
    },
    (error) => {
      if (!element.mounted || element.state.promise !== promise) {
        return
      }
      element.setState({
        done: true,
        error,
        value: undefined,
      })
    },
  )
}

function stateFromPromise(promise) {
  const done = !isPromise(promise)
  return {
    promise,
    done,
    error: undefined,
    value: done ? promise : undefined,
  }
}

export function promisedProp(options) {
  /*
  Observes the promise at `[name]` and injects the resolved value at `[name]`.
  Before the promise resolves, `[doneName]` is `false` and `[name]` is `undefined`.
  If an error occured in the promise, `[errorName]` is set to it. Otherwise, `[name]` is set to the resolved value amd `[doneName]` is `true`.
  If the promise provided at prop `[name]` changes, `[doneName]`, `[errorName]`, and `[name]` are reset and any previous promise is discarded.
  */
  const name = isString(options) ? options : options.name
  const capitalizedName = upperFirst(name)
  const {
    doneName = `done${capitalizedName}`,
    errorName = `error${capitalizedName}`,
  } = name === options ? EMPTY_OBJECT : options
  return (Component) =>
    setWrapperName(
      Component,
      class promisedProp extends BaseComponent {
        constructor(props) {
          super(props)
          this.state = stateFromPromise(props[name])
          this.mounted = false
        }
        componentDidMount() {
          this.mounted = true
          const { state } = this
          if (!state.result.done) {
            attachPromise(this, state.promise)
          }
        }
        static getDerivedStateFromProps(props, state) {
          const promise = props[name]
          if (promise === state.promise) {
            return null
          }
          return stateFromPromise(promise)
        }
        componentDidUpdate(prevProps, prevState) {
          const { state } = this
          if (state.promise !== prevState.promise && !state.result.done) {
            attachPromise(this, state.promise)
          }
        }
        componentWillUnmount() {
          this.mounted = false
        }
        render() {
          return $(Component, {
            ...this.props,
            [name]: this.state.value,
            [doneName]: this.state.done,
            [errorName]: this.state.error,
          })
        }
      },
    )
}
