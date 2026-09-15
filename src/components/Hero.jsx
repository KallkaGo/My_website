import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import BrokenBgCanvas from './canvas/BrokenBg'
import { useInteractStore } from '../utils/Store'

const Hero = () => {
  const ready = useInteractStore((s) => s.appReady)
  const sectionRef = useRef(null)

  // 入场动画等 loading 结束（appReady）后再播放，避免与 WebGL 初始化抢主线程。
  // 用 useLayoutEffect 让 GSAP 在首次绘制前就写好初始态，不会先闪一下。
  // scope 必须给整个 section：滚动指示器是内容容器的兄弟节点，只扫内容容器会漏掉它。
  useLayoutEffect(() => {
    if (!ready || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-hero-item]',
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: 'expo.out',
          stagger: 0.12,
          delay: 0.1,
        }
      )

      gsap.fromTo(
        '[data-hero-scroll]',
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 1, ease: 'expo.out', delay: 0.7 }
      )

      // 滚动指示器里的小圆点循环下移
      gsap.to('[data-scroll-dot]', {
        y: 12,
        duration: 0.9,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [ready])

  return (
    <section
      ref={sectionRef}
      className='relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden pt-24 pb-16 px-6 sm:px-12'
    >
      {/* WebGL Bokeh Background */}
      <BrokenBgCanvas />

      {/* Radial vignette mask to softly fade canvas edges */}
      <div className='absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(8,8,10,0.6)_65%,#08080a_100%)]' />

      {/* 入场动画等 loading 结束后才挂载，首帧即从初始态开始播放 */}
      {ready && (<>
      {/* Hero Content */}
      <div className='relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center'>
        {/* Status indicator badge */}
        <div
          data-hero-item
          className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md mb-8'
        >
          <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse' />
          <span className='text-xs font-mono uppercase tracking-[0.2em] text-neutral-300'>
            Graphics Rendering Enthusiast
          </span>
        </div>

        {/* Main Display Headline */}
        <h1
          data-hero-item
          className='text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.08] select-none mb-6'
        >
          Crafting <span className='text-gradient-purple'>interactive</span> &amp; <br className='hidden sm:block' />
          3D web realities.
        </h1>

        {/* Subtitle / Bio */}
        <p
          data-hero-item
          className='text-base sm:text-lg md:text-xl text-neutral-400 max-w-2xl font-light leading-relaxed mb-8'
        >
          Hi, I'm <span className='text-white font-medium'>Kalkka</span>. A graphics rendering enthusiast dedicated to WebGL, real-time shaders, and fluid 3D web experiences. Merging creative technology with modern digital design.
        </p>

        {/* Philosophy Quote Box - Minimalist & refined */}
        <div
          data-hero-item
          className='max-w-xl mx-auto mb-10 px-5 py-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md text-center'
        >
          <p className='text-xs sm:text-sm text-neutral-400 font-serif italic tracking-wide'>
            "The true beginning of independence and autonomy starts when one detaches from the brilliance of those they admire."
          </p>
        </div>

        {/* Quick CTA Actions */}
        <div data-hero-item className='flex flex-wrap items-center justify-center gap-4'>
          <a
            href='#work'
            className='px-6 py-3 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-neutral-200 transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105'
          >
            Selected Works
          </a>
          <a
            href='#lab'
            className='px-6 py-3 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/10 hover:border-white/20 font-medium text-xs tracking-wider uppercase transition-all duration-200 backdrop-blur-md'
          >
            Interactive Lab
          </a>
          <a
            href='#contact'
            className='px-6 py-3 rounded-full text-neutral-400 hover:text-white text-xs tracking-wider uppercase transition-colors'
          >
            Get In Touch &rarr;
          </a>
        </div>
      </div>

      {/* Minimal Scroll Down Indicator */}
      <div
        data-hero-scroll
        className='absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10'
      >
        <a href='#about' className='group flex flex-col items-center gap-2'>
          <span className='text-[10px] font-mono tracking-[0.25em] text-neutral-500 uppercase group-hover:text-neutral-300 transition-colors'>
            SCROLL
          </span>
          <div className='w-5 h-9 rounded-full border border-white/20 group-hover:border-white/40 flex justify-center pt-1.5 transition-colors'>
            <div data-scroll-dot className='w-1 h-1.5 rounded-full bg-neutral-300' />
          </div>
        </a>
      </div>
      </>)}
    </section>
  )
}

export default Hero
