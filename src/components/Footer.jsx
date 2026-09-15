import React from 'react'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <footer className='relative z-10 border-t border-white/[0.06] bg-[#070709] py-12 px-6 sm:px-16'>
      <div className='max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6'>
        {/* Left: Brand & Copyright */}
        <div className='flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left'>
          <span className='font-bold tracking-wider text-white text-sm'>
            KALLKA
          </span>
          <span className='hidden sm:inline text-neutral-600'>|</span>
          <p className='text-xs font-mono text-neutral-500'>
            &copy; {new Date().getFullYear()} Designed &amp; Crafted with React &amp; Three.js.
          </p>
        </div>

        {/* Center: Social Links */}
        <div className='flex items-center gap-6 text-xs font-mono text-neutral-400'>
          <a
            href='https://github.com/KallkaGo'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-white transition-colors'
          >
            GitHub
          </a>
          <a
            href='mailto:kallka.ciallo@gmail.com'
            className='hover:text-white transition-colors'
          >
            Email
          </a>
        </div>

        {/* Right: Back to top button */}
        <button
          onClick={scrollToTop}
          className='px-3.5 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/20 text-xs font-mono text-neutral-400 hover:text-white transition-all flex items-center gap-2'
        >
          <span>BACK TO TOP</span>
          <span>&uarr;</span>
        </button>
      </div>
    </footer>
  )
}

export default Footer
