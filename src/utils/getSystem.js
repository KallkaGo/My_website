export const getSystem = () => {
  const userAgent = navigator.userAgent.toLowerCase()

  if (userAgent.match(/iphone|ipod|android|ios|mobile/) !== null) {
    // 包含手机或移动设备关键字，可能是手机
    return 'mobile'
  } else {
    // 不包含手机关键字，可能是电脑
    return 'pc'
  }
}