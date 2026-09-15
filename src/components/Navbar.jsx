import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { navLinks } from '../constants'
import { menu, close, bgm1, bgm2 } from '../assets'
import { throttle } from '../utils/tool'
import { useInteractStore } from '../utils/Store'

const Navbar = () => {
  const appReady = useInteractStore((s) => s.appReady)
  const [active, setActive] = useState('')
  const [toggle, setToggle] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [bgm] = useState(() => {
    const arr = [bgm1, bgm2]
    return arr[Math.floor(Math.random() * arr.length)]
  })

  const musicRef = useRef(null)
  const navRef = useRef(null)
  const drawerRef = useRef(null)

  // 导航栏入场：等 loading 结束（appReady）后再播放，避免与 WebGL 初始化抢主线程
  useLayoutEffect(() => {
    if (!appReady || !navRef.current) return
    const tween = gsap.fromTo(
      navRef.current,
      { autoAlpha: 0, y: -20 },
      { autoAlpha: 1, y: 0, duration: 0.6, ease: 'expo.out' }
    )
    return () => tween.kill()
  }, [appReady])

  // 移动端抽屉改为常驻挂载、用 GSAP 控制显隐，省掉 AnimatePresence 的挂载/卸载编排。
  // 先落初始态，避免首次渲染闪一下。
  useLayoutEffect(() => {
    const el = drawerRef.current
    if (!el) return
    gsap.set(el, { autoAlpha: 0, y: -10, scale: 0.98 })
  }, [])

  useLayoutEffect(() => {
    const el = drawerRef.current
    if (!el) return
    gsap.to(el, {
      autoAlpha: toggle ? 1 : 0,
      y: toggle ? 0 : -10,
      scale: toggle ? 1 : 0.98,
      duration: 0.2,
      ease: 'power2.out',
      overwrite: true,
    })
  }, [toggle])

  const toggleMusic = () => {
    if (!musicRef.current) return
    if (!isPlaying) {
      musicRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch((err) => {
        console.log("Audio play failed:", err)
      })
    } else {
      musicRef.current.pause()
      setIsPlaying(false)
    }
  }

  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollTop = window.scrollY
      setScrolled(scrollTop > 40)
    }, 100)

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className='fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-8 pt-4 sm:pt-6 pointer-events-none'>
      <nav
        ref={navRef}
        className={`pointer-events-auto w-full max-w-6xl rounded-full transition-all duration-300 px-5 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between ${
          scrolled
            ? 'bg-[#0a0a0e]/80 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
            : 'bg-[#0a0a0e]/50 backdrop-blur-md border border-white/[0.05]'
        }`}
      >
        {/* Desktop Navigation Links */}
        <ul className='list-none hidden md:flex flex-row items-center gap-1 sm:gap-2 mx-auto'>
          {navLinks.map((link) => {
            const isActive = active === link.title
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setActive(link.title)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 block ${
                    isActive
                      ? 'text-white bg-white/[0.08]'
                      : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {link.title}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Right side controls: Audio toggle & Mobile menu button */}
        <div className='flex items-center gap-3 ml-auto md:ml-0'>
          {/* BGM Equalizer Button */}
          <button
            onClick={toggleMusic}
            aria-label='Toggle Background Music'
            className='flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/20 transition-all text-xs text-neutral-300 font-mono'
            title={isPlaying ? 'Pause Background Music' : 'Play Background Music'}
          >
            <audio loop ref={musicRef} src={bgm} />
            <div className='flex items-end gap-[3px] h-3 w-3.5 justify-center'>
              <span
                className={`w-[2px] bg-purple-400 rounded-full transition-all duration-300 ${
                  isPlaying ? 'h-3 animate-pulse' : 'h-1.5 opacity-40'
                }`}
              />
              <span
                className={`w-[2px] bg-purple-300 rounded-full transition-all duration-300 ${
                  isPlaying ? 'h-2 animate-pulse delay-75' : 'h-2.5 opacity-40'
                }`}
              />
              <span
                className={`w-[2px] bg-purple-400 rounded-full transition-all duration-300 ${
                  isPlaying ? 'h-3 animate-pulse delay-150' : 'h-1 opacity-40'
                }`}
              />
            </div>
            <span className='hidden sm:inline text-[11px] text-neutral-400'>
              {isPlaying ? 'BGM ON' : 'BGM OFF'}
            </span>
          </button>

          {/* Mobile Menu Trigger */}
          <div className='md:hidden flex items-center'>
            <button
              onClick={() => setToggle(!toggle)}
              aria-label='Toggle menu'
              className='p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-neutral-300 hover:text-white'
            >
              <img
                src={toggle ? close : menu}
                alt='menu'
                className='w-5 h-5 object-contain filter invert opacity-80'
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer（常驻挂载，GSAP 控制显隐） */}
      <div
        ref={drawerRef}
        className='pointer-events-auto absolute top-20 left-4 right-4 bg-[#0e0e14]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 shadow-2xl md:hidden'
      >
      <ul className='flex flex-col gap-3'>
        {navLinks.map((link) => (
          <li key={link.id}>
            <a
              href={`#${link.id}`}
              onClick={() => {
                setToggle(false)
                setActive(link.title)
              }}
              className='block py-2 px-3 rounded-lg text-sm font-medium text-neutral-300 hover:text-white hover:bg-white/[0.06] transition-colors'
            >
              {link.title}
            </a>
          </li>
        ))}
      </ul>
      </div>
    </header>
  )
}

export default Navbar