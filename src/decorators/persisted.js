import { persistedProp } from './persistedProp'

export const persisted = persistedProp({
  /*
  Persists prop `value` in the storage found in prop `storage`, optionally prepending the value found in `domain` to the key when looking for the value. On mount, if the value is found in the storage, it is set to prop `value`. Its value is updated in the storage when `onChange(value, name, payload)` is called.
  */
  name: 'value',
  onChangeName: 'onChange',
})
