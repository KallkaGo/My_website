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

    const ctx = gsap.context(() => {
      if (options.batch) {
        gsap.set(targets, { opacity: 0, y: options.y ?? 30 })
        ScrollTrigger.batch(targets, {
          start: options.start ?? 'top 88%',
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: options.duration ?? 0.6,
              ease: 'power2.out',
              stagger: options.stagger ?? 0.08,
              overwrite: 'auto',
              // 入场结束后释放合成层，卡片 hover 由内层元素负责。
              clearProps: 'transform',
            })
          },
        })
      } else {
        gsap.fromTo(
          targets,
          {
            opacity: 0,
            y: options.y ?? 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: options.duration ?? 0.7,
            ease: 'power2.out',
            stagger: options.stagger ?? 0.08,
            scrollTrigger: {
              trigger: el,
              start: options.start ?? 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        )
      }
    }, el)

    return () => ctx.revert()
  }, [])

  return containerRef
}
