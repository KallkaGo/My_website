
function throttle (func, delay) {
  let lastCall = 0
  let timer = null

  return (...args) => {
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
        func(...args)
      }, delay - (now - lastCall))
    }
  }
}

export {
  throttle
}