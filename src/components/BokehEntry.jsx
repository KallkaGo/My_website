import { useEffect, useRef, useState } from 'react'
import { SRGBColorSpace, TextureLoader } from 'three'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { particleTex } from '../assets'
import { Bokeh1Background } from '../utils/bokeh'
import { markModuleReady } from '../utils/Store'
import './bokeh-entry.css'

const clamp = (value) => Math.max(0, Math.min(1, value))
const smooth = (start, end, value) => {
  const t = clamp((value - start) / (end - start))
  return t * t * (3 - 2 * t)
}
const mix = (a, b, t) => a + (b - a) * t

const BokehEntry = () => {
  const entryRef = useRef(null)
  const copyRef = useRef(null)
  const footerRef = useRef(null)
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [unavailable, setUnavailable] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReducedMotion(query.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const entry = entryRef.current
    const pages = document.querySelector('.notebook-pages')
    const image = document.querySelector('.bokeh-study-image')
    const art = document.querySelector('.bokeh-art-camera')
    const canvas = document.getElementById('bokeh-study-canvas')
    const root = document.documentElement
    let bokeh
    let texture
    let disposed = false
    let frame = 0
    let imageLayout
    let removeLenisListener
    const still = reducedMotion || unavailable

    const update = () => {
      if (disposed || !imageLayout) return
      const entryTop = imageLayout.entryTop - window.scrollY
      const entryBottom = entryTop + imageLayout.entryHeight
      const raw = still ? 1 : clamp(-entryTop / Math.max(1, imageLayout.entryHeight))
      const progress = raw > 0.999 ? 1 : raw
      const pullback = smooth(0.025, 0.94, progress)
      const remaining = still ? 0 : Math.max(0, entryBottom)
      const startScale = Math.max(window.innerWidth / imageLayout.width, window.innerHeight / imageLayout.height) * 1.015
      // 只有动态作品和纸框缩放，文字保持原本的字号与排版。
      const scale = Math.exp(Math.log(startScale) * (1 - pullback))
      const x = (window.innerWidth / 2 - imageLayout.centerX) * (1 - pullback)
      const y = (window.innerHeight / 2 - imageLayout.centerY) * (1 - pullback)
      pages.style.transform = remaining > 0 ? `translate3d(0, ${-remaining}px, 0)` : ''
      art.style.transform = progress < 1 ? `translate3d(${x}px, ${y}px, 0) scale(${scale})` : ''
      pages.classList.toggle('notebook-opening', progress < 1)
      const textOpacity = smooth(0.64, 0.92, progress)
      const captionOpacity = smooth(0.84, 0.98, progress)
      pages.style.setProperty('--opening-text-opacity', String(textOpacity))
      pages.style.setProperty('--opening-text-visibility', textOpacity > 0.001 ? 'visible' : 'hidden')
      pages.style.setProperty('--opening-caption-opacity', String(captionOpacity))
      pages.style.setProperty('--opening-caption-visibility', captionOpacity > 0.001 ? 'visible' : 'hidden')

      const copyOpacity = 1 - smooth(0.01, 0.16, progress)
      copyRef.current.style.opacity = String(copyOpacity)
      copyRef.current.style.visibility = copyOpacity < 0.001 || still ? 'hidden' : 'visible'
      const footerOpacity = 1 - smooth(0.025, 0.15, progress)
      footerRef.current.style.opacity = String(footerOpacity)
      footerRef.current.style.visibility = footerOpacity < 0.001 || still ? 'hidden' : 'visible'

      const navPaper = smooth(0.025, 0.16, progress)
      root.classList.toggle('bokeh-intro-active', progress < 1)
      root.style.setProperty('--bokeh-nav-paper', String(navPaper))
      root.style.setProperty('--bokeh-nav-ink', `rgb(${Math.round(mix(245, 41, navPaper))}, ${Math.round(mix(238, 63, navPaper))}, ${Math.round(mix(231, 48, navPaper))})`)
      entry.dataset.progress = progress.toFixed(3)

      // 用已测量的坐标判断可见性，避免刚写入 transform 就强制浏览器重新布局。
      const centerY = entryBottom + imageLayout.centerY - remaining + (progress < 1 ? y : 0)
      const halfHeight = imageLayout.height * scale / 2
      const active = !still && centerY + halfHeight > 0 && centerY - halfHeight < window.innerHeight
      entry.dataset.rendering = active ? 'active' : 'paused'
      bokeh?.three.setEnabled(active)
    }

    const measure = () => {
      if (disposed) return
      pages.style.transform = ''
      art.style.transform = ''
      const pageBounds = pages.getBoundingClientRect()
      const bounds = image.getBoundingClientRect()
      const artBounds = art.getBoundingClientRect()
      const entryBounds = entry.getBoundingClientRect()
      imageLayout = {
        width: bounds.width,
        height: bounds.height,
        centerX: bounds.left - pageBounds.left + bounds.width / 2,
        centerY: bounds.top - pageBounds.top + bounds.height / 2,
        entryTop: entryBounds.top + window.scrollY,
        entryHeight: entryBounds.height,
      }
      art.style.transformOrigin = `${bounds.left - artBounds.left + bounds.width / 2}px ${bounds.top - artBounds.top + bounds.height / 2}px`
      update()
    }
    const scheduleMeasure = () => {
      if (disposed) return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(measure)
    }
    const resetCamera = () => {
      pages.style.transform = ''
      art.style.transform = ''
    }
    const bindLenis = () => {
      removeLenisListener?.()
      // Lenis 写入滚动位置后立即同步相机，不等下一帧的原生 scroll 事件。
      removeLenisListener = window.lenis?.on('scroll', update)
    }

    // 入场动画按文档中的最终位置测量，不能把开场放大的坐标缓存下来。
    ScrollTrigger.addEventListener('refreshInit', resetCamera)
    ScrollTrigger.addEventListener('refresh', update)

    measure()
    if (!unavailable) {
      try {
        bokeh = Bokeh1Background(canvas, {
          count: window.innerWidth < 680 ? 576 : 1024,
          minPixelRatio: Math.min(3, Math.max(window.innerWidth / imageLayout.width, window.innerHeight / imageLayout.height)),
          maxPixelRatio: 3,
          rendererOptions: { alpha: true, antialias: true },
        })
        bokeh.setColors([0xc18417, 0x510de5, 0xa8381f])
        bokeh.setBackgroundColor(0x07060b)
        texture = new TextureLoader().load(particleTex, (loaded) => {
          if (disposed) return
          loaded.flipY = false
          loaded.colorSpace = SRGBColorSpace
          bokeh.bindMap(loaded)
          bokeh.three.render()
          markModuleReady('bokeh')
        }, undefined, () => {
          if (!disposed) setUnavailable(true)
        })
        update()
      } catch {
        setUnavailable(true)
      }
    } else {
      markModuleReady('bokeh')
    }

    const observer = new ResizeObserver(scheduleMeasure)
    observer.observe(pages)
    observer.observe(image)
    document.fonts?.ready.then(scheduleMeasure)
    const refresh = requestAnimationFrame(() => ScrollTrigger.refresh())
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('lenis-ready', bindLenis)
    bindLenis()
    window.addEventListener('resize', scheduleMeasure)
    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      cancelAnimationFrame(refresh)
      observer.disconnect()
      window.removeEventListener('scroll', update)
      window.removeEventListener('lenis-ready', bindLenis)
      removeLenisListener?.()
      window.removeEventListener('resize', scheduleMeasure)
      ScrollTrigger.removeEventListener('refreshInit', resetCamera)
      ScrollTrigger.removeEventListener('refresh', update)
      pages.style.transform = ''
      pages.classList.remove('notebook-opening')
      pages.style.removeProperty('--opening-text-opacity')
      pages.style.removeProperty('--opening-text-visibility')
      pages.style.removeProperty('--opening-caption-opacity')
      pages.style.removeProperty('--opening-caption-visibility')
      art.style.transform = ''
      art.style.transformOrigin = ''
      root.classList.remove('bokeh-intro-active')
      root.style.removeProperty('--bokeh-nav-paper')
      root.style.removeProperty('--bokeh-nav-ink')
      bokeh?.dispose()
      texture?.dispose()
    }
  }, [reducedMotion, unavailable])

  return (
    <section id='home' ref={entryRef} className={`bokeh-entry${reducedMotion || unavailable ? ' bokeh-entry-still' : ''}`} aria-label='Opening the notebook'>
      <div ref={copyRef} className='bokeh-entry-copy notebook-container'>
        <p className='bokeh-kicker'>Bokeh / 00</p>
        <p className='bokeh-entry-title'>A little light,<br />a world within.</p>
        <p className='bokeh-entry-description'>Every experiment begins with a closer look.</p>
      </div>
      <div ref={footerRef} className='bokeh-entry-footer notebook-container'>
        <span className='bokeh-scroll-cue'><span aria-hidden='true'>↓</span> Scroll to open the notebook</span>
        <a href='#notebook'>Enter the notebook <span aria-hidden='true'>↗</span></a>
      </div>
    </section>
  )
}

export default BokehEntry
