import { stubTrue } from 'lodash'

import { AbortError } from '../errors/AbortError'

export function until(register, signal, sentinel = stubTrue) {
  /*
  Listens for an event with the provided `register` function until `sentinel(event)` returns a truthy value.
  If a `signal` is provided, listens to it to cancel the promise.
  */
  return new Promise((resolve, reject) => {
    const unregister = register((result) => {
      if (!sentinel(result)) {
        return
      }
      unregister()
      resolve(result)
    })
    if (signal) {
      signal.addEventListener('abort', () => {
        unregister()
        reject(new AbortError('Aborted'))
      })
    }
  })
}
