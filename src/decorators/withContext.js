import { $ } from '../tools/$'

export function withContext(provider, propName = 'value') {
  /*
  Injects a context `provider` that takes its value from `[propName]`.
  */
  return (Component) =>
    function withContext(props) {
      return $(provider, { value: props[propName] }, $(Component, props))
    }
}
