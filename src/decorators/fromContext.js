import { $ } from '../tools/$'
import { setWrapperName } from '../tools/setWrapperName'

export function fromContext(consumer, propName = 'value') {
  /*
  Injects the value of the context `consumer` into `[propName]`.
  */
  return (Component) =>
    setWrapperName(Component, function fromContext(props) {
      return $(consumer, null, (value) =>
        $(Component, { ...props, [propName]: value }),
      )
    })
}
