let timer
export const debounce = (callback, delay = 1500) => {
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    callback()
  }, delay)
}
