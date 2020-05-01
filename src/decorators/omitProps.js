import { omit } from 'lodash'
import { mapProps } from 'recompose'

export function omitProps(propNames) {
  /*
  Removes provided `propNames`.
  */
  return mapProps((props) => omit(props, propNames))
}
