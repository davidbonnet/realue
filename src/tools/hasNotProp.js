import { memoize } from 'lodash'

/*
Returns a function that checks if `props[name]` is `nil`.
*/
export const hasNotProp = memoize((name) => ({ [name]: prop }) => prop == null)
