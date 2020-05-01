let defaultStorage = null

export function DOMStorage(type) {
  const { [type]: storage } = globalThis
  return storage
    ? {
        get(name) {
          try {
            const value = JSON.parse(storage.getItem(name))
            // Ensures compatibility with defaultProps()
            return value == null ? undefined : value
          } catch (error) {
            return undefined
          }
        },
        set(name, value) {
          const stringifiedValue = JSON.stringify(value)
          if (stringifiedValue == null) {
            storage.removeItem(name)
          } else {
            storage.setItem(name, JSON.stringify(value))
          }
        },
      }
    : defaultStorage
    ? defaultStorage
    : (defaultStorage = new Map())
}
