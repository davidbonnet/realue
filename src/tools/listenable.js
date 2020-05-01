export function listenable(initialValue) {
  /*
  Returns a listenable value encapsulated in an object with the following properties:
  - `value`: the actual value
  - `on(listener)`: a `listener` registerer that returns an unregisterer for this function
  - `set(value)`: a new `value` setter that gets emitted to all registered listeners

  Example:

    const height = listenable(0)
    function log(value) {
      console.log(`Updated to ${value}`)
    }
    const off = height.on(log)
    // Returns 0
    height.value
    // Calls `log(300)`
    height.set(300)
    // Stops loging value changes
    off()
  */
  let value = initialValue
  const listeners = []
  return {
    get value() {
      return value
    },
    on(listener) {
      listeners.push(listener)
      return () => {
        listeners.splice(listeners.indexOf(listener), 1)
        return listeners.length
      }
    },
    set(newValue) {
      value = newValue
      const { length } = listeners
      for (let i = 0; i < length; i++) {
        listeners[i](newValue)
      }
      return length
    },
  }
}
