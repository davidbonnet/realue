import { omit } from 'lodash'

export function omitted(propNames) {
  /*
  Returns a function that returns all props without the ones whose name is in `propNames`.

  Example :

    // Only omit the `value` prop
    returned(omitted(['value']))
  */
  return (props) => omit(props, propNames)
}
