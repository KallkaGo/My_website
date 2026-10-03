import { useEffect } from 'react'
import Lenis from 'lenis'

export const useSmoothScroll = (enabled = true) => {
  useEffect(() => {
    if (!enabled) return

    // 使用浏览器的高精度 rAF 时间；不要再从 GSAP ticker 重复驱动。
    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      lerp: 0.12,
      wheelMultiplier: 1.1,
      touchMultiplier: 1,
    })
    window.lenis = lenis

    // ScrollTrigger 已监听原生 scroll；本页的入场动画无需再手动 update。
    const handleAnchorClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return
      const anchor = e.target.closest('a')
      if (!anchor || (anchor.target && anchor.target !== '_self')) return
      const href = anchor.getAttribute('href')
      if (href && href.startsWith('#') && href.length > 1) {
        const targetElement = document.getElementById(href.slice(1))
        if (targetElement) {
          e.preventDefault()
          lenis.scrollTo(targetElement, {
            offset: -70,
            immediate: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
          })
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      document.removeEventListener('click', handleAnchorClick)
      lenis.destroy()
      if (window.lenis === lenis) window.lenis = null
    }
  }, [enabled])
}
