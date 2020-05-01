import { Component as BaseComponent } from 'react'
import { mapValues, isString, isArray, identity } from 'lodash'

import { $ } from '../tools/$'
import { setWrapperName } from '../tools/setWrapperName'
import { EMPTY_OBJECT } from '../constants/EMPTY_OBJECT'

export function switchChild(
  propNameOrPicker,
  componentMap,
  { destinationName = 'children' } = EMPTY_OBJECT,
) {
  /*
  Builds the element from `componentMap[key]`, with `key` being the value of the prop name `propNameOrPicker`, if `propNameOrPicker` is a string, or of the value returned by `propNameOrPicker(props)`, if `propNameOrPicker` is a function.
  The `componentMap` values are either a `[Component, childProps()]` couple or just a `Component`.

  Example:

    const EntityName = compose(
      switchChild('type', {
        user: UserName,
        device: DeviceName,
        setting: SettingName,
        invoice: InvoiceName,
      }),
    )(Children)

    const name = $(EntityName, { type: 'user', id: '42' })
})
  */
  const picker = isString(propNameOrPicker)
    ? ({ [propNameOrPicker]: value }) => value
    : propNameOrPicker
  const components = mapValues(componentMap, (value) =>
    isArray(value) ? value : [value, identity],
  )
  return (Component) =>
    setWrapperName(
      Component,
      class switchChild extends BaseComponent {
        render() {
          const { props } = this
          const value = picker(props)
          const component = components[value]
          return $(Component, {
            ...props,
            [destinationName]: $(component[0], component[1](props, value)),
          })
        }
      },
    )
}
