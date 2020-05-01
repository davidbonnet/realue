const {
  setInterval,
  clearInterval,
  requestAnimationFrame,
  cancelAnimationFrame,
} = globalThis

export function interval(duration, callback) {
  /*
  Calls `callback` at least every `duration` milliseconds. Returns a function that stops future calls of `callback`. If `duration` is falsy, uses `requestAnimationFrame`.
  */
  if (!duration && requestAnimationFrame && cancelAnimationFrame) {
    let timer
    const update = () => {
      if (timer == null) {
        return
      }
      callback()
      timer = requestAnimationFrame(update)
    }
    timer = requestAnimationFrame(update)
    return () => {
      cancelAnimationFrame(timer)
      timer = null
    }
  }
  const timer = setInterval(callback, duration)
  return () => {
    clearInterval(timer)
  }
}
