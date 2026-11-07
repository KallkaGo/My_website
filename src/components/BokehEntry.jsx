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
    const header = document.querySelector('.notebook-header')
    let bokeh
    let texture
    let disposed = false
    let frame = 0
    let imageLayout
    let styleCache = new WeakMap()
    let lastProgress = Number.NaN
    let lastProgressText
    let lastRendering
    let lastOpening
    let lastIntroActive
    const still = reducedMotion || unavailable

    // 滚动回调每帧都会改写同一批样式；缓存后只在值真正变化时写入，
    // 避免重复写入触发样式/布局重算。
    const cacheFor = (el) => {
      let cache = styleCache.get(el)
      if (!cache) {
        cache = new Map()
        styleCache.set(el, cache)
      }
      return cache
    }
    const setStyle = (el, property, value) => {
      if (!el) return
      const cache = cacheFor(el)
      if (cache.get(property) === value) return
      cache.set(property, value)
      el.style[property] = value
    }
    const setVar = (el, name, value) => {
      if (!el) return
      const cache = cacheFor(el)
      if (cache.get(name) === value) return
      cache.set(name, value)
      el.style.setProperty(name, value)
    }
    const invalidate = () => {
      styleCache = new WeakMap()
      lastProgress = Number.NaN
    }
    const updateRendering = (active) => {
      const next = active ? 'active' : 'paused'
      if (lastRendering !== next) {
        lastRendering = next
        entry.dataset.rendering = next
      }
      bokeh?.three.setEnabled(active)
    }

    const update = (force = false) => {
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

      // 用已测量的坐标判断可见性，避免刚写入 transform 就强制浏览器重新布局。
      const centerY = entryBottom + imageLayout.centerY - remaining + (progress < 1 ? y : 0)
      const halfHeight = imageLayout.height * scale / 2
      const active = !still && centerY + halfHeight > 0 && centerY - halfHeight < window.innerHeight
      updateRendering(active)

      // 开场结束后 progress 长期停在 1；只保留上面的渲染开关检查，跳过全部样式写入。
      if (!force && progress === lastProgress) return
      lastProgress = progress

      setStyle(pages, 'transform', remaining > 0 ? `translate3d(0, ${-remaining}px, 0)` : '')
      setStyle(art, 'transform', progress < 1 ? `translate3d(${x}px, ${y}px, 0) scale(${scale})` : '')
      const textOpacity = smooth(0.64, 0.92, progress)
      const captionOpacity = smooth(0.84, 0.98, progress)
      setVar(pages, '--opening-text-opacity', String(textOpacity))
      setVar(pages, '--opening-text-visibility', textOpacity > 0.001 ? 'visible' : 'hidden')
      setVar(pages, '--opening-caption-opacity', String(captionOpacity))
      setVar(pages, '--opening-caption-visibility', captionOpacity > 0.001 ? 'visible' : 'hidden')

      const opening = progress < 1
      if (lastOpening !== opening) {
        lastOpening = opening
        pages.classList.toggle('notebook-opening', opening)
      }

      const copyOpacity = 1 - smooth(0.01, 0.16, progress)
      setStyle(copyRef.current, 'opacity', String(copyOpacity))
      setStyle(copyRef.current, 'visibility', copyOpacity < 0.001 || still ? 'hidden' : 'visible')
      const footerOpacity = 1 - smooth(0.025, 0.15, progress)
      setStyle(footerRef.current, 'opacity', String(footerOpacity))
      setStyle(footerRef.current, 'visibility', footerOpacity < 0.001 || still ? 'hidden' : 'visible')

      // 导航色只作用在 header 自身；写到 :root 会让整页样式失效。
      const navPaper = smooth(0.025, 0.16, progress)
      setVar(header, '--bokeh-nav-paper', String(navPaper))
      setVar(header, '--bokeh-nav-ink', `rgb(${Math.round(mix(245, 41, navPaper))}, ${Math.round(mix(238, 63, navPaper))}, ${Math.round(mix(231, 48, navPaper))})`)
      const introActive = progress < 1
      if (lastIntroActive !== introActive) {
        lastIntroActive = introActive
        root.classList.toggle('bokeh-intro-active', introActive)
      }

      const progressText = progress.toFixed(3)
      if (lastProgressText !== progressText) {
        lastProgressText = progressText
        entry.dataset.progress = progressText
      }
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
      invalidate()
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
      invalidate()
    }
    const onScroll = () => update()
    const handleRefresh = () => update(true)

    // 入场动画按文档中的最终位置测量，不能把开场放大的坐标缓存下来。
    ScrollTrigger.addEventListener('refreshInit', resetCamera)
    ScrollTrigger.addEventListener('refresh', handleRefresh)

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
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', scheduleMeasure)
    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      cancelAnimationFrame(refresh)
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', scheduleMeasure)
      ScrollTrigger.removeEventListener('refreshInit', resetCamera)
      ScrollTrigger.removeEventListener('refresh', handleRefresh)
      pages.style.transform = ''
      pages.classList.remove('notebook-opening')
      pages.style.removeProperty('--opening-text-opacity')
      pages.style.removeProperty('--opening-text-visibility')
      pages.style.removeProperty('--opening-caption-opacity')
      pages.style.removeProperty('--opening-caption-visibility')
      art.style.transform = ''
      art.style.transformOrigin = ''
      root.classList.remove('bokeh-intro-active')
      header?.style.removeProperty('--bokeh-nav-paper')
      header?.style.removeProperty('--bokeh-nav-ink')
      // 兼容热更新前旧版本写在 :root 上的值。
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
