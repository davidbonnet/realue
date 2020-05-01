import { Component as BaseComponent } from 'react'

import { $ } from '../tools/$'
import { setWrapperName } from '../tools/setWrapperName'

export const refreshable = (Component) =>
  /*
  Adds an `onRefresh` prop that enables refreshing the component.
  */
  setWrapperName(
    Component,
    class refreshable extends BaseComponent {
      constructor(props) {
        super(props)
        this.onRefresh = (callback) => this.forceUpdate(callback)
      }
      render() {
        return $(Component, { ...this.props, onRefresh: this.onRefresh })
      }
    },
  )
