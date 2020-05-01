export function lazyProperty(object, propertyName, valueBuilder, ...options) {
  /*
  Returns `object[propertyName]` if not `nil`, otherwise sets the result of `valueBuilder(object)` to it and returns it.
  This enables setting properties only when it is first fetched.
  */
  const value = object[propertyName]
  if (value != null) {
    return value
  }
  return (object[propertyName] = valueBuilder(object, ...options))
}
