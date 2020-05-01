import { resilientProp } from './resilientProp'

/*
Keeps the last non-`nil` value of prop `value`. 
*/
export const resilient = resilientProp({ name: 'value', delayName: 'done' })
