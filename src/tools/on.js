export function on(target, event, listener, options) {
  /*
  Listens for `event` on `target`, calling `listener(event)` at each incoming `event`. The provided `options` are identical to those provided to `addEventListener`.
  Returns a function that removes the `listener` from the `target` for the specified `event`.
  If `listener` is not defined, returns a function that accepts the remaining `(listener, options)` arguments.
  */
  if (!listener) {
    return (listener, options) => on(target, event, listener, options)
  }
  target.addEventListener(event, listener, options)
  return () => target.removeEventListener(event, listener, options)
}
