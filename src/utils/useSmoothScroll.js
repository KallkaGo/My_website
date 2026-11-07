import { useEffect } from 'react'

// 原生滚动由浏览器合成器驱动；锚点使用浏览器的 smooth scroll。
export const useSmoothScroll = (enabled = true) => {
  useEffect(() => {
    if (!enabled) return

    const handleAnchorClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return
      const anchor = e.target.closest('a')
      if (!anchor || (anchor.target && anchor.target !== '_self')) return
      const href = anchor.getAttribute('href')
      if (href && href.startsWith('#') && href.length > 1) {
        const targetElement = document.getElementById(href.slice(1))
        if (targetElement) {
          e.preventDefault()
          if (href === '#main') targetElement.focus({ preventScroll: true })
          const scrollTarget = href === '#main' ? document.getElementById('notebook') ?? targetElement : targetElement
          // 开场期间页面暂时平移到视口，锚点仍落在开场结束后的文档位置。
          const opening = document.querySelector('.bokeh-entry')
          const offset = scrollTarget.closest('.notebook-pages') && opening
            ? Math.max(0, opening.getBoundingClientRect().bottom)
            : 0
          const immediate = window.matchMedia('(prefers-reduced-motion: reduce)').matches
          const scrollMarginTop = Number.parseFloat(getComputedStyle(scrollTarget).scrollMarginTop) || 0
          window.scrollTo({
            top: scrollTarget.getBoundingClientRect().top + window.scrollY + offset - scrollMarginTop,
            behavior: immediate ? 'instant' : 'smooth',
          })
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)
    return () => document.removeEventListener('click', handleAnchorClick)
  }, [enabled])
}
