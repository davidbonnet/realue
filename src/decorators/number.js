import { $ } from '../tools/$'
import { setWrapperName } from '../tools/setWrapperName'

export const number = (Component) =>
  /*
  Sets `value` to `0` if `nil`.
  */
  setWrapperName(Component, function number(props) {
    return $(
      Component,
      props.value != null
        ? props
        : {
            ...props,
            value: 0,
          },
    )
  })
