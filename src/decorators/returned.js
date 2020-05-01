import { withProps } from 'recompose'

import { picked } from '../tools/picked'
import { RETURN_NAME } from '../constants/RETURN_NAME'

export function returned(propsMapperOrMap) {
  /*
  Enables the injection of props from an isolated scope. The `propsMapperOrMap` can be a function that takes the current props and returns the props to inject, or a name list or map of prop names similar to the one provided to `picked()`.

  Example:

    scoped(...decorators, returned({ user: 'value' }))

  */
  const returnedProps =
    typeof propsMapperOrMap === 'function'
      ? propsMapperOrMap
      : picked(propsMapperOrMap)
  return withProps((props) => ({ [RETURN_NAME]: returnedProps(props) }))
}
