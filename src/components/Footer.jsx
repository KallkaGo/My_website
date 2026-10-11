import React from 'react'

const Footer = () => {
  const scrollToTop = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: reduceMotion })
      return
    }
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? 'instant' : 'smooth',
    })
  }

  return (
    <footer className='notebook-footer'>
      <div className='notebook-footer-inner'>
        <div className='notebook-footer-brand'>
          <span>Kallka</span>
          <p>
            &copy; {new Date().getFullYear()} Crafted with React &amp; Three.js.
          </p>
        </div>

        <div className='notebook-footer-links'>
          <a
            href='https://github.com/KallkaGo'
            target='_blank'
            rel='noopener noreferrer'
            className='notebook-link'
          >
            GitHub
          </a>
          <a
            href='mailto:kallka.ciallo@gmail.com'
            className='notebook-link'
          >
            Email
          </a>
        </div>

        <button
          onClick={scrollToTop}
          type='button'
          className='notebook-footer-top'
        >
          <span>Back to top</span>
          <span aria-hidden='true'>&uarr;</span>
        </button>
      </div>
    </footer>
  )
}

export default Footer
