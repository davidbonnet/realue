import { compose, mapProps } from 'recompose'

import { picked } from '../tools/picked'
import { SCOPE_NAME } from '../constants/SCOPE_NAME'
import { RETURN_NAME } from '../constants/RETURN_NAME'

export function scopedWith(inputMapperOrMap) {
  /*
  Processes the `decorators` in an isolated props scope so as to avoid poluting the passed props.

  Example:
  
    compose(
      withProps({ value: 1 }),
      scoped(
        withProps({ value: 2, otherValue: 3 })
      ),
      // Logs unique prop `value` that equals `1`
      logProps()
    )

  */
  const inputProps =
    inputMapperOrMap == null
      ? null
      : typeof inputMapperOrMap === 'function'
      ? inputMapperOrMap
      : picked(inputMapperOrMap)
  return (...decorators) =>
    compose(
      inputProps == null
        ? mapProps((props) => ({ ...props, [SCOPE_NAME]: props }))
        : mapProps((props) => ({ ...inputProps(props), [SCOPE_NAME]: props })),
      ...decorators,
      mapProps((props) =>
        props[RETURN_NAME]
          ? { ...props[SCOPE_NAME], ...props[RETURN_NAME] }
          : props[SCOPE_NAME],
      ),
    )
}
