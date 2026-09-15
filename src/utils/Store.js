import { create } from "zustand"

// 页面级就绪状态。全屏 loading 会等到 readyModules 里登记的重型模块
// （WebGL 背景、粒子、星空、太阳）全部初始化完成后再放行入场动画，
// 这样动画不会和 WebGL 上下文创建、shader 编译、纹理上传抢主线程。
const useInteractStore = create(() => ({
  system: '',
  appReady: false,
  readyModules: {},
}))

export const markModuleReady = (id) => {
  const { readyModules } = useInteractStore.getState()
  if (readyModules[id]) return
  useInteractStore.setState({ readyModules: { ...readyModules, [id]: true } })
}

export { useInteractStore }
