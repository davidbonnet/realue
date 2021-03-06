import { $, setWrapperName } from './tools'

export const string = (Component) =>
  /*
  Sets `value` to `''` if not set.
  */
  setWrapperName(Component, function string(props) {
    return $(
      Component,
      props.value != null
        ? props
        : {
            ...props,
            value: '',
          },
    )
  })
