import { same } from './same'

export function shouldHandle(shouldHandleOrKeys) {
  return typeof shouldHandleOrKeys === 'function'
    ? shouldHandleOrKeys
    : (props, nextProps) => !same(props, nextProps, shouldHandleOrKeys)
}
