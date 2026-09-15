import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const useSmoothScroll = (enabled = true) => {
  useEffect(() => {
    if (!enabled) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
    })

    window.lenis = lenis

    // Synchronize Lenis and GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    const tickerCallback = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    // Smooth anchor navigation
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault()
        const targetElement = document.querySelector(href)
        if (targetElement) {
          lenis.scrollTo(targetElement, {
            offset: -70,
            duration: 1.2,
          })
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      gsap.ticker.remove(tickerCallback)
      document.removeEventListener('click', handleAnchorClick)
      lenis.destroy()
      window.lenis = null
    }
  }, [enabled])
}
