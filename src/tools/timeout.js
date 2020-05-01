const {
  setTimeout,
  clearTimeout,
  requestAnimationFrame,
  cancelAnimationFrame,
} = globalThis

export function timeout(duration, callback) {
  /*
  Calls `callback` after at least `duration` milliseconds. Returns a function that cancels the future call of `callback`, if not already called.
  */
  if (!duration && requestAnimationFrame && cancelAnimationFrame) {
    const timer = requestAnimationFrame(callback)
    return () => {
      cancelAnimationFrame(timer)
    }
  }
  let timer = setTimeout(() => {
    timer = null
    callback()
  }, duration)
  return () => {
    if (timer == null) {
      return
    }
    clearTimeout(timer)
    timer = null
  }
}
