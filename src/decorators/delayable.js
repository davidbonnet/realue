import { delayableProp } from './delayableProp'

export const delayable = delayableProp({
  /*
  Delays `onChange` calls until after `delay` milliseconds have elapsed since the last call.
  Renames undelayed `onChange` as `onPush`.
  */
  name: 'onChange',
  delayName: 'delay',
  onPushName: 'onPush',
})
