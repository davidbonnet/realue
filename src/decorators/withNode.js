import { Component as BaseComponent, createRef } from 'react'

import { $ } from '../tools/$'
import { setWrapperName } from '../tools/setWrapperName'

export const withNode = (Component) =>
  /*
  Injects a `node` reference created with `React.createRef()` to be applied on any element through the `ref` attribute.

  Example:

    const Example = withNode(({ node }) =>
      $('div', { ref: node }, node.current ? 'Referenced' : 'Not referenced'),
    )
  */
  setWrapperName(
    Component,
    class withNode extends BaseComponent {
      constructor(props) {
        super(props)
        this.node = createRef()
      }
      render() {
        return $(Component, { ...this.props, node: this.node })
      }
    },
  )
