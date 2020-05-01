import { Component as BaseComponent } from 'react'
import { isString, upperFirst, indexOf } from 'lodash'

import { $ } from '../tools/$'
import { lazyProperty } from '../tools/lazyProperty'
import { setWrapperName } from '../tools/setWrapperName'
import { EMPTY_OBJECT } from '../constants/EMPTY_OBJECT'

const DEFAULT_CYCLE_VALUES = [false, true]

function onCycle(element, name, valuesName, onChangeName, nameName) {
  return (payload) => {
    const {
      [name]: value,
      [valuesName]: values = DEFAULT_CYCLE_VALUES,
      [onChangeName]: onChange,
      [nameName]: valueName = name,
    } = element.props
    const index = indexOf(values, value) + 1
    onChange(values[index === values.length ? 0 : index], valueName, payload)
  }
}

export function cyclableProp(options) {
  /*
  Creates an `onChange` handler that takes the value from `get(event, path)`.
  If `path` is `nil`, the value is taken from the `value` prop instead.
  */
  const name = isString(options) ? options : options.name
  const capitalizedName = upperFirst(name)
  const {
    valuesName = `${name}Values`,
    onCycleName = `onCycle${capitalizedName}`,
    onChangeName = `onChange${capitalizedName}`,
    nameName = `${name}Name`,
  } = name === options ? EMPTY_OBJECT : options
  return (Component) =>
    setWrapperName(
      Component,
      class cycledProp extends BaseComponent {
        render() {
          const { props } = this
          return $(
            Component,
            props[onChangeName] == null
              ? props
              : {
                  ...props,
                  [onCycleName]: lazyProperty(
                    this,
                    'onCycle',
                    onCycle,
                    name,
                    valuesName,
                    onChangeName,
                    nameName,
                  ),
                },
          )
        }
      },
    )
}
