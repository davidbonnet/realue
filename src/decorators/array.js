import { Component as BaseComponent } from 'react'

import { $ } from '../tools/$'
import { lazyProperty } from '../tools/lazyProperty'
import { setWrapperName } from '../tools/setWrapperName'
import { setItem } from '../tools/setItem'
import { insertItem } from '../tools/insertItem'
import { insertItems } from '../tools/insertItems'
import { EMPTY_ARRAY } from '../constants/EMPTY_ARRAY'

function onChangeItem(element) {
  return (itemValue, itemIndex, payload) => {
    const { props } = element
    return props.onChange(
      setItem(
        props.value,
        itemIndex == null ? undefined : +itemIndex,
        itemValue,
      ),
      props.name,
      payload,
    )
  }
}

function onAddItem(element) {
  return (itemValue, itemIndex, payload) => {
    const { props } = element
    return props.onChange(
      insertItem(
        props.value,
        itemValue,
        itemIndex == null ? undefined : +itemIndex,
      ),
      props.name,
      payload,
    )
  }
}

function onAddItems(element) {
  return (itemsValues, itemIndex, payload) => {
    const { props } = element
    return props.onChange(
      insertItems(
        props.value,
        itemsValues,
        itemIndex == null ? undefined : +itemIndex,
      ),
      props.name,
      payload,
    )
  }
}

export const array = (Component) =>
  /*
  Provides `item(index, key = index)` that returns the props for the child element responsible of the item `index`.
  Also provides `onChangeItem(value, index, payload?)` that sets the item `index` to the provided `value`, and `onAddItem(value, index, payload?)` that inserts an item with the provided `value` at `index`.
  Sets `value` to `[]` if `nil`.

  Example:

    const List = array(({ value, item, onAdd }) => (
      <ul>
        {map(value, (_, index) => <li>{item(index)}</li>)}
        <li>
          <button onClick={() => onAdd('New')}>Add</button>
        </li>
      </ul>
    ))
  */
  setWrapperName(
    Component,
    class array extends BaseComponent {
      constructor(props) {
        super(props)
        this.item = (index, key = index) => {
          const { props } = this
          return {
            key,
            value: props.value && props.value[index],
            name: `${index}`,
            onChange:
              props.onChange &&
              lazyProperty(this, 'onChangeItem', onChangeItem),
          }
        }
      }
      render() {
        const { props } = this
        return $(Component, {
          ...props,
          value: props.value == null ? EMPTY_ARRAY : props.value,
          onChangeItem:
            props.onChange && lazyProperty(this, 'onChangeItem', onChangeItem),
          onAddItem:
            props.onChange && lazyProperty(this, 'onAddItem', onAddItem),
          onAddItems:
            props.onChange && lazyProperty(this, 'onAddItems', onAddItems),
          item: this.item,
        })
      }
    },
  )
