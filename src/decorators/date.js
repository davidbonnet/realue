import { $ } from '../tools/$'
import { setWrapperName } from '../tools/setWrapperName'

export const date = (Component) =>
  /*
  Sets `value` to `new Date(0)` if `nil`.
  */
  setWrapperName(Component, function date(props) {
    return $(
      Component,
      props.value != null
        ? props
        : {
            ...props,
            value: new Date(0),
          },
    )
  })
