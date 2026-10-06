import { useEffect, useRef, useState } from 'react'
import { useInteractStore } from '../utils/Store'

// 需要等待初始化完成的重型模块，对应各自组件里的 markModuleReady 上报。
const REQUIRED_MODULES = ['bokeh', 'stars', 'particles', 'sun']

// 全屏 loading：盖住首屏，等字体、首帧和全部 WebGL 模块初始化完成后再淡出，
// 之后才放行 Hero / Navbar 的入场动画，避免动画与 WebGL 上下文创建、
// shader 编译、纹理上传抢主线程而掉帧。
//
// 进度条与文字动画只用 transform / opacity，运行在合成器线程上，
// 因此即使主线程被 WebGL 初始化占住，loading 本身也不会卡。
const AppLoader = () => {
  const readyModules = useInteractStore((s) => s.readyModules)
  const [base, setBase] = useState({ fonts: false, frame: false })
  const [progress, setProgress] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const [removed, setRemoved] = useState(false)

  const startRef = useRef(null)
  const currentRef = useRef(0)
  const lastPctRef = useRef(-1)

  if (startRef.current === null) startRef.current = performance.now()

  const readyCount = REQUIRED_MODULES.filter((id) => readyModules[id]).length
  const total = REQUIRED_MODULES.length

  // loading 期间锁住滚动，避免背后的长页面被滚走
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  // 基础就绪信号：网页字体 + 首帧渲染
  useEffect(() => {
    let cancelled = false
    const mark = (key) => {
      if (!cancelled) setBase((prev) => (prev[key] ? prev : { ...prev, [key]: true }))
    }

    if (document.fonts?.ready) document.fonts.ready.then(() => mark('fonts'))
    else mark('fonts')

    requestAnimationFrame(() => requestAnimationFrame(() => mark('frame')))

    return () => {
      cancelled = true
    }
  }, [])

  // 进度推进：字体 20% + 首帧 20% + 模块 60%，用平滑插值避免数字跳变
  useEffect(() => {
    const MIN_MS = 700
    const MAX_MS = 6000
    let raf

    const tick = () => {
      const elapsed = performance.now() - startRef.current
      const modulesDone = readyCount === total
      const allDone = base.fonts && base.frame && modulesDone

      let target =
        (base.fonts ? 0.2 : 0) + (base.frame ? 0.2 : 0) + (readyCount / total) * 0.6

      if (elapsed >= MAX_MS) target = 1
      else if (allDone && elapsed >= MIN_MS) target = 1
      else target = Math.min(target, 0.94)

      currentRef.current += (target - currentRef.current) * 0.08
      const pct = Math.min(100, Math.round(currentRef.current * 100))

      if (pct !== lastPctRef.current) {
        lastPctRef.current = pct
        setProgress(pct)
      }

      if (pct >= 100) {
        setLeaving(true)
        return
      }
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [base, readyCount, total])

  // 开始淡出时立刻放行入场动画，覆盖层与内容淡入重叠进行，做到无缝衔接
  useEffect(() => {
    if (!leaving) return
    useInteractStore.setState({ appReady: true })
    document.body.style.overflow = ''
    const timer = setTimeout(() => setRemoved(true), 700)
    return () => clearTimeout(timer)
  }, [leaving])

  if (removed) return null

  return (
    <div
      data-app-loader
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#08080a] ${
        leaving ? 'loader-leave pointer-events-none' : ''
      }`}
    >
      <div className='loader-rise flex flex-col items-center'>
        <div className='w-[320px] sm:w-[460px]'>
          <div className='h-[3px] w-full bg-white/[0.08] overflow-hidden'>
            <div
              className='h-full w-full origin-left bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-300'
              style={{ transform: `scaleX(${progress / 100})` }}
            />
          </div>

          <div className='mt-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em]'>
            <span className='text-neutral-500'>Initializing WebGL</span>
            <span className='text-neutral-300 tabular-nums'>
              {String(progress).padStart(3, '0')}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppLoader
