import { Component as BaseComponent } from 'react'

import { $ } from '../tools/$'
import { setWrapperName } from '../tools/setWrapperName'

export function withImmediateGlobalEffect(handler) {
  /*
  Runs `handler()` when the first element of this component is constructed (that is, before it mounts).
  If the handler returns a callback, it is called when the last element of this component is unmounted.
  If the handler returns `false`, it will never be run again for this component.
  */
  let elementsCount = 0
  let cleanup = null
  return (Component) =>
    setWrapperName(
      Component,
      class withImmediateGlobalEffect extends BaseComponent {
        constructor(props) {
          super(props)
          if (elementsCount === 0 && cleanup !== false) {
            cleanup = handler()
          }
          elementsCount += 1
        }
        componentWillUnmount() {
          elementsCount -= 1
          if (elementsCount === 0 && typeof cleanup === 'function') {
            cleanup()
            cleanup = null
          }
        }
        render() {
          return $(Component, this.props)
        }
      },
    )
}
