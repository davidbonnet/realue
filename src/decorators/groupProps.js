import { pick } from 'lodash'
import { withPropsOnChange } from 'recompose'

export function groupProps(destinationName, propNames) {
  /*
  Groups `propNames` into an object stored at `destinationName` and updates them when any property value listed in `propNames` changes.
  */
  return withPropsOnChange(propNames, (props) => ({
    [destinationName]: pick(props, propNames),
  }))
}
