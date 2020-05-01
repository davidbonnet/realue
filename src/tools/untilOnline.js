import { until } from './until'
import { on } from './on'

export async function untilOnline(signal) {
  /*
  Returns a promise that waits for the browser to be back online.
  Resolves to `true` if it it was offline before calling this function, `false` otherwise.
  If a `signal` is provided, listens to it to cancel the promise.
  */
  const { navigator, window } = globalThis
  if (window && navigator && !navigator.onLine) {
    await until(on(window, 'online'), signal)
    return true
  }
  return false
}
