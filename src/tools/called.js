export function called(object, property, ...args) {
  if (args.length > 0) {
    object[property](...args)
  } else {
    object[property]()
  }
  return object
}
