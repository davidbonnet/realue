import { Component as BaseComponent } from 'react'
import { mapValues, isString, isArray } from 'lodash'

import { $ } from '../tools/$'
import { setWrapperName } from '../tools/setWrapperName'
import { EMPTY_OBJECT } from '../constants/EMPTY_OBJECT'

const defaultChildProps = (props, name) =>
  props.property && name ? { ...props, ...props.property(name) } : props

export function withChild(
  ChildComponentOrMap,
  childProps = defaultChildProps,
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
