import { Component as BaseComponent } from 'react'
import { isString, upperFirst } from 'lodash'

import { $ } from '../tools/$'
import { setWrapperName } from '../tools/setWrapperName'
import { setProperty } from '../tools/setProperty'
import { setProperties } from '../tools/setProperties'
import { lazyProperty } from '../tools/lazyProperty'
import { EMPTY_OBJECT } from '../constants/EMPTY_OBJECT'

function onChangeProperty(element, name, nameName, onChangeName) {
  return (propertyValue, propertyName, payload) => {
    const { props } = element
    return props[onChangeName](
      setProperty(props[name], propertyName, propertyValue),
      props[nameName],
      payload,
    )
  }
}

function onChangeProperties(element, name, nameName, onChangeName) {
  return (values, payload) => {
    const { props } = element
    return props[onChangeName](
      setProperties(props[name], values),
      props[nameName],
      payload,
    )
  }
}

export function objectProp(options) {
  /*
  Provides `[propertyName](name, key = name)` that returns the props for the child element responsible of the property `name` of the object at `[name]`.
  Also provides `[onChangePropertyName](value, name, payload?)` that sets the property `name` of the object at `[name]` to the provided `value`, and `[onChangePropertiesName](values, payload?)` that merges the provided `values` into the object at `[name]`.
  Sets `[name]` to `{}` if `nil`.
  */
  const name = isString(options) ? options : options.name
  const capitalizedName = upperFirst(name)
  const {
    onChangeName = `onChange${capitalizedName}`,
    onChangePropertyName = `onChange${capitalizedName}Property`,
    onChangePropertiesName = `onChange${capitalizedName}Properties`,
    propertyName = `${name}Property`,
    nameName = `${name}Name`,
    // NOTE: Add destination options
  } = name === options ? EMPTY_OBJECT : options
  return (Component) =>
    setWrapperName(
      Component,
      class objectProp extends BaseComponent {
        constructor(props) {
          super(props)
          this.property = (propertyName, key = propertyName) => {
            const { props } = this
            const value = props[name]
            return {
              value: value && value[propertyName],
              key,
              name: propertyName,
              onChange: props[onChangeName] && this.onChangeProperty,
            }
          }
        }
        render() {
          const { props } = this
          const value = props[name]
          return $(Component, {
            ...props,
            [name]: value == null ? EMPTY_OBJECT : value,
            [onChangePropertyName]:
              props[onChangeName] &&
              lazyProperty(
                this,
                'onChangeProperty',
                onChangeProperty,
                name,
                nameName,
                onChangeName,
              ),
            [onChangePropertiesName]:
              props[onChangeName] &&
              lazyProperty(
                this,
                'onChangeProperties',
                onChangeProperties,
                name,
                nameName,
                onChangeName,
              ),
            [propertyName]: this.property,
          })
        }
      },
    )
}
