import { useEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const MotionStudyCard = ({ children, className = '', motionRef, label, hoverEnabled = true }) => {
  const shellRef = useRef(null)
  const surfaceRef = useRef(null)
  const targetRef = useRef({ x: 0, y: 0, hover: 0, enter: 0 })
  const frameRef = useRef(0)
  const wakeRef = useRef(() => {})

  useEffect(() => {
    const shell = shellRef.current
    const surface = surfaceRef.current
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    let visible = false
    let previousTime = 0
    motionRef.current.enter = query.matches ? 1 : 0

    const paint = () => {
      const current = motionRef.current
      surface.style.setProperty('--study-x', current.x.toFixed(5))
      surface.style.setProperty('--study-y', current.y.toFixed(5))
      surface.style.setProperty('--study-hover', current.hover.toFixed(5))
      surface.style.setProperty('--study-enter', current.enter.toFixed(5))
    }
    const tick = (time) => {
      frameRef.current = 0
      const delta = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 1 / 60
      previousTime = time
      const amount = 1 - Math.exp(-delta * 8)
      const current = motionRef.current
      const target = targetRef.current
      let unsettled = false
      for (const key of ['x', 'y', 'hover', 'enter']) {
        current[key] += (target[key] - current[key]) * amount
        if (Math.abs(target[key] - current[key]) < 0.0001) current[key] = target[key]
        else unsettled = true
      }
      paint()
      if (unsettled && visible && !query.matches) frameRef.current = requestAnimationFrame(tick)
      else previousTime = 0
    }
    const wake = () => {
      if (visible && !query.matches && !frameRef.current) frameRef.current = requestAnimationFrame(tick)
    }
    wakeRef.current = wake
    const reset = () => {
      Object.assign(targetRef.current, { x: 0, y: 0, hover: 0 })
      if (query.matches || !visible) {
        cancelAnimationFrame(frameRef.current)
        frameRef.current = 0
        previousTime = 0
        Object.assign(motionRef.current, targetRef.current)
        paint()
      } else wake()
    }
    const entrance = ScrollTrigger.create({
      trigger: shell,
      start: 'top 96%',
      end: 'top 52%',
      onUpdate: (self) => {
        targetRef.current.enter = query.matches ? 1 : self.progress
        if (visible && !query.matches) wake()
        else { motionRef.current.enter = targetRef.current.enter; paint() }
      },
      onRefresh: (self) => {
        targetRef.current.enter = query.matches ? 1 : self.progress
        motionRef.current.enter = targetRef.current.enter
        paint()
      },
    })
    const preferenceChanged = () => {
      targetRef.current.enter = query.matches ? 1 : entrance.progress
      reset()
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (!visible) reset()
      else wake()
    })
    observer.observe(shell)
    query.addEventListener('change', preferenceChanged)
    paint()
    return () => {
      observer.disconnect()
      query.removeEventListener('change', preferenceChanged)
      entrance.kill()
      cancelAnimationFrame(frameRef.current)
      frameRef.current = 0
      wakeRef.current = () => {}
    }
  }, [motionRef])

  const move = (event) => {
    if (event.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // 从不旋转的外层计算指针位置，避免卡片倾斜反过来改变输入坐标。
    const bounds = shellRef.current.getBoundingClientRect()
    const clamp = (value) => Math.max(-1, Math.min(1, value))
    Object.assign(targetRef.current, {
      x: clamp((event.clientX - bounds.left) / bounds.width * 2 - 1),
      y: clamp((event.clientY - bounds.top) / bounds.height * 2 - 1),
      hover: 1,
    })
    wakeRef.current()
  }
  const leave = () => {
    Object.assign(targetRef.current, { x: 0, y: 0, hover: 0 })
    wakeRef.current()
  }

  return (
    <div ref={shellRef} className={`motion-study-shell ${className}`} aria-label={label} onPointerMove={hoverEnabled ? move : undefined} onPointerLeave={hoverEnabled ? leave : undefined} onPointerCancel={hoverEnabled ? leave : undefined}>
      <div ref={surfaceRef} className='motion-study-surface'>
        {children}
        <div className='motion-study-sheen' aria-hidden='true' />
      </div>
    </div>
  )
}

export default MotionStudyCard
