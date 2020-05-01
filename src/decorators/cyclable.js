import { cyclableProp } from './cyclableProp'

export const cyclable = cyclableProp({
  name: 'value',
  valuesName: 'values',
  onChangeName: 'onChange',
  onCycleName: 'onCycle',
  nameName: 'name',
})
