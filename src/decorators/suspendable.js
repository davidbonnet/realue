import { suspendableProp } from './suspendableProp'

export const suspendable = suspendableProp({
  /*
  Suspends `value` changes for `delay` milliseconds. Subsequent `value` or `delay` changes cancel previous suspensions. Last suspension is canceled if `value` is set to the value prior the start of the suspension.
  Calling the injected method `onPull` immediately sets `value` to the latest value.
  */
  name: 'value',
  delayName: 'delay',
  onPullName: 'onPull',
})
