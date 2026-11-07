import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const useGsapReveal = (options = {}) => {
  const containerRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const targets = el.querySelectorAll('.gsap-reveal')
    if (!targets.length) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      // 只做 opacity：位移会让文字每帧重新栅格化，并留下 transform 合成层。
      gsap.fromTo(
        targets,
        { opacity: 0 },
        {
          opacity: 1,
          duration: options.duration ?? 0.7,
          ease: 'power2.out',
          stagger: options.stagger ?? 0.08,
          clearProps: 'opacity',
          scrollTrigger: {
            trigger: el,
            start: options.start ?? 'top 85%',
            toggleActions: 'play none none none',
            once: true,
          },
          onStart: () => gsap.set(targets, { willChange: 'opacity' }),
          onComplete: () => gsap.set(targets, { clearProps: 'willChange' }),
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return containerRef
}
