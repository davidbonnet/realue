import { Component as BaseComponent } from 'react'
import { map } from 'lodash'

import { $ } from '../tools/$'
import { setWrapperName } from '../tools/setWrapperName'
import { EMPTY_OBJECT } from '../constants/EMPTY_OBJECT'

const defaultChildProps = ({ item, ...props }) =>
  item
    ? (value, index) => ({
        ...props,
        ...item(index),
      })
    : (value, index) => ({ ...props, value, key: index })

export function withChildren(
  ChildrenComponent,
  childProps = defaultChildProps,
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
