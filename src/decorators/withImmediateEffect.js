import { Component as BaseComponent } from 'react'

import { $ } from '../tools/$'
import { setWrapperName } from '../tools/setWrapperName'
import { shouldHandle as makeShouldHandle } from '../tools/shouldHandle'

export function withImmediateEffect(shouldHandleOrKeys, handler) {
  /*
  Similar to `withEffect`, except that it runs the `handler` at component construction and before each render if `shouldHandleOrKeys` returns `true`.
  */
  const shouldHandle = makeShouldHandle(shouldHandleOrKeys)
  return (Component) =>
    setWrapperName(
      Component,
      class withImmediateEffect extends BaseComponent {
        constructor(props) {
          super(props)
          this.state = { props, cleanup: handler(this.props) }
        }
        static getDerivedStateFromProps(props, state) {
          if (shouldHandle(state.props, props)) {
            if (typeof state.cleanup === 'function') {
              state.cleanup()
            }
            return { props, cleanup: handler(props, state.value) }
          }
          return null
        }
        componentWillUnmount() {
          const { state } = this
          if (typeof state.cleanup === 'function') {
            state.cleanup()
          }
        }
        render() {
          return $(Component, this.props)
        }
      },
    )
}
