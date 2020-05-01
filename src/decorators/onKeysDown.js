import { withHandlers } from 'recompose'

export function onKeysDown(keys) {
  /*
  Triggers the specified `keys` handlers on key down. Each handler is called with the current `(props, event)`.
  */
  return withHandlers({
    onKeyDown: (props) => (event) => {
      const handler = keys[event.key]
      if (handler) {
        handler(props, event)
      }
      const { onKeyDown } = props
      if (onKeyDown && !event.isPropagationStopped()) {
        onKeyDown(event)
      }
    },
  })
}
