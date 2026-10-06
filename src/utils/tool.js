
function throttle (func, delay) {
  let lastCall = 0
  let timer = null
  let latestArgs

  const throttled = (...args) => {
    latestArgs = args
    const now = Date.now()

    if (now - lastCall >= delay) {
      // 立即执行
      lastCall = now
      if (timer) {
        clearTimeout(timer)
        timer = null
      }

      func(...args)
    } else if (!timer) {
      // 在剩余时间后执行最后一次调用
      timer = setTimeout(() => {
        lastCall = Date.now()
        timer = null
        func(...latestArgs)
      }, delay - (now - lastCall))
    }
  }

  throttled.cancel = () => {
    clearTimeout(timer)
    timer = null
    latestArgs = undefined
  }

  return throttled
}

export {
  throttle
}
