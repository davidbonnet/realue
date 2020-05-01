import { Component as BaseComponent } from 'react'
import { isString, upperFirst } from 'lodash'

import { $ } from '../tools/$'
import { setWrapperName } from '../tools/setWrapperName'
import { EMPTY_OBJECT } from '../constants/EMPTY_OBJECT'

const { setTimeout, clearTimeout } = globalThis

export function suspendableProp(options) {
  /*
  Suspends `[name]` changes for `[delayName]` milliseconds. Subsequent `[name]` or `[delayName]` changes cancel previous suspensions. Last suspension is canceled if `[name]` is set to the value prior the start of the suspension.
  Calling the injected method `[onPullName]` immediately sets `[name]` to the latest value.
  If `[delayName]` is falsy, no suspension occurs, nor the injection of `[onPullName]`.
  */
  const name = isString(options) ? options : options.name
  const capitalizedName = upperFirst(name)
  const {
    delayName = `delay${capitalizedName}`,
    onPullName = `onPull${capitalizedName}`,
  } = name === options ? EMPTY_OBJECT : options
  return (Component) =>
    setWrapperName(
      Component,
      class suspendableProp extends BaseComponent {
        constructor(props) {
          super(props)
          this.state = {
            value: props[name],
          }
          this.timer = null
          this.onPull = () => {
            if (!this.mounted) {
              return
            }
            const { props } = this
            if (this.timer) {
              clearTimeout(this.timer)
              this.timer = null
            }
            if (props[name] === this.state.value) {
              return
            }
            this.setState({
              value: props[name],
            })
          }
        }
        componentDidMount() {
          this.mounted = true
        }
        static getDerivedStateFromProps(props, state) {
          if (props[delayName] || props[name] === state.value) {
            return null
          }
          return { value: props[name] }
        }
        componentDidUpdate(prevProps) {
          const { props } = this
          if (
            props[name] === prevProps[name] &&
            props[delayName] === prevProps[delayName]
          ) {
            return
          }
          if (this.timer !== null) {
            clearTimeout(this.timer)
            this.timer = null
          }
          if (props[delayName] && props[name] !== this.state.value) {
            this.timer = setTimeout(this.onPull, props[delayName])
          }
        }
        componentWillUnmount() {
          this.mounted = false
        }
        render() {
          const { props } = this
          return $(
            Component,
            !props[delayName]
              ? props
              : {
                  ...props,
                  [name]: this.state.value,
                  [onPullName]: this.onPull,
                },
          )
        }
      },
    )
}
