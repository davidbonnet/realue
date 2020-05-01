import { Component as BaseComponent } from 'react'
import { isString, upperFirst } from 'lodash'

import { $ } from '../tools/$'
import { setWrapperName } from '../tools/setWrapperName'
import { EMPTY_OBJECT } from '../constants/EMPTY_OBJECT'

export function syncedProp(options) {
  /*
  Enables a prop with a given `name` to be locally editable while staying in sync with its parent value.
  The prop can be updated with prop `[onChangeName](value, name, payload)`, which triggers the optional parent prop `[onChangeName]`.
  Calling `[onPullName]()` sets the local value to the parent value.
  The return value of the optional parent prop `[onPullName](newValue, previousValue)` is used on prop `[name]` changes or when calling `[onPullName]()`.
  */
  const name = isString(options) ? options : options.name
  const capitalizedName = upperFirst(name)
  const {
    onMergeName = `onMerge${capitalizedName}`,
    onChangeName = `onChange${capitalizedName}`,
    onPullName = `onPull${capitalizedName}`,
  } = name === options ? EMPTY_OBJECT : options
  return (Component) =>
    setWrapperName(
      Component,
      class syncedProp extends BaseComponent {
        constructor(props) {
          super(props)
          const { value } = props
          this.state = {
            value,
            originalValue: value,
          }
          this.onChange = (value, name, payload) => {
            if (value === this.state.value) {
              return
            }
            const { [onChangeName]: onChange } = this.props
            return this.setState(
              { value },
              onChange == null
                ? undefined
                : () => onChange(value, name, payload),
            )
          }
          this.onPull = () => {
            const {
              props: { [onMergeName]: onMerge },
              state: { value, originalValue },
            } = this
            const nextValue =
              onMerge == null ? originalValue : onMerge(originalValue, value)
            this.setState({
              value: nextValue,
            })
            return nextValue
          }
        }
        static getDerivedStateFromProps(props, state) {
          const { [name]: value, [onMergeName]: onMerge } = props
          if (value === state.originalValue) {
            return null
          }
          return {
            value: onMerge == null ? value : onMerge(value, state.value),
            originalValue: value,
          }
        }
        render() {
          return $(Component, {
            ...this.props,
            [name]: this.state.value,
            [onChangeName]: this.onChange,
            [onPullName]: this.onPull,
          })
        }
      },
    )
}
