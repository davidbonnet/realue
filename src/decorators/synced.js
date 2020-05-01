import { syncedProp } from './syncedProp'

export const synced = syncedProp({
  /*
  Enables prop `value` to be locally editable while staying in sync with its parent value.
  The prop can be updated with prop `onChange(value, name, payload)`, which triggers the optional parent prop `onChange`.
  Calling `onPull()` sets the local value to the parent value.
  The return value of the optional parent prop `onPull(newValue, previousValue)` is used on prop `value` changes or when calling `onPull()`.
  */
  name: 'value',
  onMergeName: 'onMerge',
  onChangeName: 'onChange',
  onPullName: 'onPull',
})
