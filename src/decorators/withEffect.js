import { Component as BaseComponent } from 'react'

import { $ } from '../tools/$'
import { setWrapperName } from '../tools/setWrapperName'
import { shouldHandle as makeShouldHandle } from '../tools/shouldHandle'

export function withEffect(shouldHandleOrKeys, handler) {
  /*
  Similar to `useEffect`. Runs `handler(props)` at mount and on update when `shouldHandleOrKeys`, in case it is an array of prop names, mentions a prop name whose value changed, or, in case of a function, returns `true` when called with `(prevProps, nextProps)`.
  If the handler returns a callback, it is called on update before the next `handler` call or on unmount.

  Example:

    // Listens for a given event and updates whenever `event` or `listener` changes
    const withListener = withEffect(
      ['event', 'listener'],
      ({ event: eventName, listener }) => {
        window.addEventListener(eventName, listener)
        return () => window.removeEventListener(eventName, listener)
      },
    )
  */
  const shouldHandle = makeShouldHandle(shouldHandleOrKeys)
  return (Component) =>
    setWrapperName(
      Component,
      class withEffect extends BaseComponent {
        constructor(props) {
          super(props)
          this.cleanup = null
        }
        componentDidMount() {
          this.cleanup = handler(this.props)
        }
        componentDidUpdate(prevProps) {
          if (shouldHandle(prevProps, this.props)) {
            if (typeof this.cleanup === 'function') {
              this.cleanup()
            }
            this.cleanup = handler(this.props)
          }
        }
        componentWillUnmount() {
          if (typeof this.cleanup === 'function') {
            this.cleanup()
          }
        }
        render() {
          return $(Component, this.props)
        }
      },
    )
}
