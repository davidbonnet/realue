import { objectProp } from './objectProp'

/*
Provides `property(name, key = name)` that returns the props for the child element responsible of the property `name`.
Also provides `onChangeProperty(value, name, payload?)` that sets the property `name` to the provided `value`.
Sets `value` to `{}` if `nil`.
*/
export const object = objectProp({
  name: 'value',
  onChangeName: 'onChange',
  onChangePropertyName: 'onChangeProperty',
  onChangePropertiesName: 'onChangeProperties',
  propertyName: 'property',
  nameName: 'name',
})
