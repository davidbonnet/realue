import { forwardRef } from 'react'
import { compose } from 'recompose'

import { $ } from '../tools/$'

export const forwardNode = compose(
  /*
  Renames the provided `ref` into `node`.
  */
  forwardRef,
  (Component) => (props, key) => $(Component, { ...props, node: key }),
)
