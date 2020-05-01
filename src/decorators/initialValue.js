import { initialProp } from './initialProp'

/*
Sets `value` to `initialValue` on first render, if `initialValue` is not `nil`, then to `value` for subsequent renders.
*/
export const initialValue = initialProp('value')
