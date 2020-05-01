import { Component as BaseComponent } from 'react'
import { pull, fromPairs, map, intersection, debounce, pick } from 'lodash'

import { $ } from '../tools/$'
import { setWrapperName } from '../tools/setWrapperName'
import { same } from '../tools/same'

const DEFAULT_BOUNDS_PROPERTIES = ['height', 'width', 'top', 'left']

const DEFAULT_OFFSET = (node) => node.getBoundingClientRect()

export function withBounds(
  properties = DEFAULT_BOUNDS_PROPERTIES,
  offset = DEFAULT_OFFSET,
) {
  /*
  Injects bounds `properties` returned from `offset(node.current)`, and `updateBounds` which triggers a bounds update. Uses the optional `delay` prop as a debounce duration when reading element bounds.

  Example:

    withBounds(['width', 'height'])(({ width, height }) =>
      $('div', 'Dimensions: ', width, ' x ', height),
    )
  */
  const defaultState = fromPairs(map(properties, (property) => [property, 0]))
  return (Component) =>
    setWrapperName(
      Component,
      class withBounds extends BaseComponent {
        constructor(props) {
          super(props)
          const { delay = 0 } = props
          this.state = defaultState
          this.updateBounds = debounce(() => {
            const { node } = this.props
            const element =
              node == null ? node : 'current' in node ? node.current : node
            if (element == null) {
              return
            }
            const state = pick(offset(element), properties)
            if (!same(state, this.state, properties)) {
              this.setState(state)
            }
          }, delay)
        }
        componentDidMount() {
          const { updateBounds } = this
          GLOBAL_LISTENERS.subscribe('onResize', updateBounds, true)
          if (intersection(properties, ['top', 'left']).length) {
            GLOBAL_LISTENERS.subscribe('onScroll', updateBounds, true)
          }
          GLOBAL_LISTENERS.subscribe('onOrientationChange', updateBounds, true)
          updateBounds()
        }
        componentDidUpdate() {
          this.updateBounds()
        }
        componentWillUnmount() {
          const { updateBounds } = this
          GLOBAL_LISTENERS.unsubscribe('onResize', updateBounds, true)
          if (intersection(properties, ['top', 'left']).length) {
            GLOBAL_LISTENERS.unsubscribe('onScroll', updateBounds, true)
          }
          GLOBAL_LISTENERS.unsubscribe(
            'onOrientationChange',
            updateBounds,
            true,
          )
        }
        render() {
          return $(Component, {
            ...this.props,
            ...this.state,
            updateBounds: this.updateBounds,
          })
        }
      },
    )
}

const EVENT_MAPPING = {
  onMouseUp: 'mouseup',
  onMouseMove: 'mousemove',
  onMouseDown: 'mousedown',
  onTouchStart: 'touchstart',
  onTouchMove: 'touchmove',
  onTouchEnd: 'touchend',
  onTouchCancel: 'touchcancel',
  onMouseEnter: 'mouseenter',
  onMouseLeave: 'mouseleave',
  onMouseOver: 'mouseover',
  onMouseOut: 'mouseout',
  onClick: 'click',
  onScroll: 'scroll',
  onResize: 'resize',
  onOrientationChange: 'orientationchange',
  onAnimationStart: 'animationstart',
  onAnimationEnd: 'animationend',
}

const GLOBAL_LISTENERS = {
  listeners: {},
  observers: {},
  subscribe(eventType, observer, capture = false) {
    const nativeEventType = EVENT_MAPPING[eventType]
    const global = globalThis
    if (!(`on${nativeEventType}` in global)) {
      return
    }
    if (this.listeners[eventType] == null) {
      this.listeners[eventType] = {}
      this.observers[eventType] = {}
    }
    if (this.observers[eventType][capture] == null) {
      const observers = (this.observers[eventType][capture] = [])
      global.addEventListener(
        nativeEventType,
        (this.listeners[eventType][capture] = (event) => {
          const { length } = observers
          for (let i = 0; i < length; i++) {
            observers[i](event)
          }
        }),
        capture,
      )
    }
    this.observers[eventType][capture].push(observer)
  },
  unsubscribe(eventType, observer, capture = false) {
    const nativeEventType = EVENT_MAPPING[eventType]
    const global = globalThis
    if (!(`on${nativeEventType}` in global)) {
      return
    }
    if (pull(this.observers[eventType][capture], observer).length === 0) {
      global.removeEventListener(
        nativeEventType,
        this.listeners[eventType][capture],
        capture,
      )
      this.observers[eventType][capture] = null
    }
  },
}
