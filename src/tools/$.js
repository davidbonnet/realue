import { createElement, isValidElement } from 'react'

const { isArray } = Array

export function $(component, propsOrChild, ...children) {
  /*
  Creates a react element from the provided `component`, setting its props to `propsOrChild` if it is an object or `null`, and its children to `propsOrChild` if it is not an object and the rest of the provided `children`.

  Similar to a reduced version of [hyperscript](https://github.com/hyperhype/hyperscript).

  Examples:

    $('div',
      $('h1', 'Realue'),
      $('p', 'A simple set of tools and decorators for React.'),
      $('p', { style: { color: 'gold' } }, 'Watchout, it is very addictive.'),
    )
  */
  return typeof propsOrChild === 'object' &&
    !isArray(propsOrChild) &&
    !isValidElement(propsOrChild)
    ? createElement(component, propsOrChild, ...children)
    : createElement(component, null, propsOrChild, ...children)
}
