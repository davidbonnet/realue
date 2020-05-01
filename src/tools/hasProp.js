import { memoize } from 'lodash'

/*
Returns a function that checks if `props[name]` is not `nil`.
*/
export const hasProp = memoize((name) => ({ [name]: prop }) => prop != null)
