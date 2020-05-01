import { Component as BaseComponent } from 'react'
import { mapValues, map, isString, isArray, identity } from 'lodash'

import { $, setWrapperName } from './tools'
import { EMPTY_OBJECT } from './immutables'

const DEFAULT_CHILDREN_PROPS = ({ item, ...props }) =>
  item
    ? (value, index) => ({
        ...props,
        ...item(index),
      })
    : (value, index) => ({ ...props, value, key: index })

export function withChildren(
  ChildrenComponent,
  childProps = DEFAULT_CHILDREN_PROPS,
  { destinationName = 'children', valueName = 'value' } = EMPTY_OBJECT,
) {
  /*
  Builds an array that maps every item from the `[valueName]` prop (`'value'` by default) with the result of `<Component {...childProps(props)(itemValue, itemIndex)}` and injects it as a `[destinationName]` prop (`'children'` by default).

  Example:
  
    function Item({ value }) {
      return $('li', value)
    }
    const List = compose(
      array,
      withChildren(Item),
    )('ul')
    const element = $(List, { value: [1, 2, 3] })
  */
  return (Component) =>
    setWrapperName(
      Component,
      class withChildren extends BaseComponent {
        render() {
          const { props } = this
          const value = props[valueName]
          return $(Component, {
            ...props,
            [destinationName]: ((childProps) =>
              map(value, (value, index) =>
                $(ChildrenComponent, childProps(value, index)),
              ))(childProps(props)),
          })
        }
      },
    )
}

const DEFAULT_CHILD_PROPS = (props, name) =>
  props.property && name ? { ...props, ...props.property(name) } : props

export function withChild(
  ChildComponentOrMap,
  childProps = DEFAULT_CHILD_PROPS,
  { destinationName = 'children' } = EMPTY_OBJECT,
) {
  /*
  If `ChildComponentOrMap` is a component, builds an element from the provided `ChildComponentOrMap` with the props from `childProps(props, undefined)` and injects it as a `[destinationName]` prop (`'children'` by default).
  Otherwise, if `ChildComponentOrMap` is a mapping of `name: [Component, childProps()] | Component`, transforms this mapping into `name: $(Component, childProps(props, name))` and injects it into the props at `destinationName` (`'children'` by default).
  If `childProps` is not defined, defaults to returning the result of `props.property(name)` merged into the props, if `props.property` and `name` are defined. Otherwise, all `props` are provided.

  Examples:

    const Person = compose(
      withChild({
        name: StringInput,
        lastName: StringInput,
        age: NumberInput,
      }),
    )(({ children }) => $('div', children.name, children.lastName, children.age))

    const Article = compose(withChild(Toolbar))(({ value, children }) =>
      $('div', $('p', value), children),
    )
  */
  if (
    typeof ChildComponentOrMap === 'function' ||
    isString(ChildComponentOrMap) ||
    ChildComponentOrMap.$$typeof != null
  ) {
    return (Component) =>
      setWrapperName(
        Component,
        class withChild extends BaseComponent {
          render() {
            const { props } = this
            return $(Component, {
              ...props,
              [destinationName]: $(ChildComponentOrMap, childProps(props)),
            })
          }
        },
      )
  }
  const components = mapValues(ChildComponentOrMap, (value) =>
    isArray(value) ? value : [value, childProps],
  )
  return (Component) =>
    setWrapperName(
      Component,
      class withChild extends BaseComponent {
        render() {
          const { props } = this
          return $(Component, {
            ...props,
            [destinationName]: mapValues(components, (value, name) =>
              $(value[0], value[1](props, name)),
            ),
          })
        }
      },
    )
}

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

export function Children({ children }) {
  /*
  Component that renders the provided `children`.
  */
  return children
}

export function Null() {
  return null
}
