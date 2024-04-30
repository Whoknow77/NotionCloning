let timer
export const debounce = (callback, delay = 1000) => {
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    callback()
  }, delay)
}
