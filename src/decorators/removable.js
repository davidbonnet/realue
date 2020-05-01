import { Component as BaseComponent } from 'react'

import { $ } from '../tools/$'
import { lazyProperty } from '../tools/lazyProperty'
import { setWrapperName } from '../tools/setWrapperName'

function onRemove(element) {
  return (payload) => {
    const { props } = element
    return props.onChange(undefined, props.name, payload)
  }
}

export const removable = (Component) =>
  setWrapperName(
    Component,
    class removable extends BaseComponent {
      render() {
        const { props } = this
        return $(Component, {
          ...props,
          onRemove: props.onChange && lazyProperty(this, 'onRemove', onRemove),
        })
      }
    },
  )
