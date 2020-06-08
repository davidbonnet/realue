import { Children } from 'react'
import { memoize, omitBy, isNil, some, isEmpty } from 'lodash'

import { $ } from './tools'

const { toArray } = Children

export function Flex({
  container = false,
  direction = 'row',
  wrap = false,
  align = 'stretch',
  justify = 'start',
  scroll = false,
  className,
  children,
  item = false,
  overflow = scroll
    ? item
      ? 'auto'
      : 'hidden'
    : container &&
      some(
        toArray(children),
        (child) => child && child.props && child.props.scroll,
      )
    ? 'hidden'
    : null,
  grow = false,
  shrink = overflow === 'hidden' ? true : !grow,
  basis = shrink && overflow !== 'hidden' ? 'auto' : '0',
  Component = 'div',
  ...style
}) {
  /*
  Abstracts usage of CSS flexbox.
  */
  return $(
    Component,
    {
      style: merge(
        flex(
          container,
          direction,
          wrap,
          grow,
          shrink,
          basis,
          item,
          align,
          justify,
          overflow,
        ),
        style,
      ),
      className,
    },
    children,
  )
}

function merge(a, b) {
  return isEmpty(b) ? a : { ...a, ...b }
}

const flex = memoize(
  (
    container,
    direction,
    wrap,
    grow,
    shrink,
    basis,
    item,
    align,
    justify,
    overflow,
  ) =>
    omitBy(
      {
        // Container
        display: container ? 'flex' : null,
        flexFlow: container ? `${direction} ${wrap ? 'wrap' : 'nowrap'}` : null,
        alignItems: container ? alignFlex(align) : null,
        justifyContent: container ? alignFlex(justify) : null,
        // Item
        flex: item
          ? `${grow ? '1' : '0'} ${shrink ? '1' : '0'} ${basis}`
          : null,
        alignSelf: !container ? alignFlex(align) : null,
        // Container and item
        overflow,
      },
      isNil,
    ),
  (...args) => (args.length === 1 ? `${args[0]}` : args.join(' ')),
)

function alignFlex(align) {
  return !align
    ? null
    : align === 'start' || align === 'end'
    ? `flex-${align}`
    : align
}

export function Box({ children, className, Component = 'div', ...style }) {
  /*
  Merges provided style properties into `style` property.
  */
  return $(Component, { style, className }, children)
}
