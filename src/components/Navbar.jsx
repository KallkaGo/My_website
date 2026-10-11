import { useEffect, useRef, useState } from 'react'
import { navLinks } from '../constants'
import { bgm2 } from '../assets'

const primaryLinks = ['work', 'lab', 'notes', 'about', 'contact'].map((id) => navLinks.find((link) => link.id === id))
const linkTitle = (link) => link.id === 'lab' ? 'Experiments' : link.id === 'work' ? 'Work' : link.title

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const musicRef = useRef(null)
  const menuRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') { setOpen(false); buttonRef.current?.focus() }
    }
    const closeOutside = (event) => {
      if (!menuRef.current?.contains(event.target) && !buttonRef.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    document.addEventListener('pointerdown', closeOutside)
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.removeEventListener('pointerdown', closeOutside)
    }
  }, [open])

  const toggleMusic = async () => {
    if (!musicRef.current) return
    if (isPlaying) { musicRef.current.pause(); setIsPlaying(false); return }
    try { await musicRef.current.play(); setIsPlaying(true) } catch { setIsPlaying(false) }
  }

  return (
    <header className='notebook-header'>
      <a className='skip-link' href='#main'>Skip to content</a>
      <nav className='notebook-nav notebook-container' aria-label='Main navigation'>
        <a href='#home' className='notebook-brand' aria-label='Kallka home'>Kallka</a>
        <div className='desktop-nav'>
          {primaryLinks.map((link) => <a key={link.id} href={'#' + link.id}>{linkTitle(link)}{link.id === 'contact' && <span aria-hidden='true'> ↗</span>}</a>)}
        </div>
        <div className='nav-controls'>
          <audio loop preload='none' ref={musicRef} src={bgm2} />
          <button className='sound-button' onClick={toggleMusic} aria-label={isPlaying ? 'Pause background music' : 'Play background music'} aria-pressed={isPlaying}>
            <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' aria-hidden='true'><path d='M4 9h4l5-4v14l-5-4H4z' />{isPlaying ? <path d='M17 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14' /> : <path d='m17 9 5 6m0-6-5 6' />}</svg>
          </button>
          <button ref={buttonRef} className='menu-button' aria-expanded={open} aria-controls='mobile-navigation' onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'} <span aria-hidden='true'>{open ? '−' : '+'}</span></button>
        </div>
        {open && <div id='mobile-navigation' ref={menuRef} className='mobile-nav'>
          {navLinks.map((link) => <a key={link.id} href={'#' + link.id} onClick={() => setOpen(false)}>{linkTitle(link)} <span aria-hidden='true'>↗</span></a>)}
        </div>}
      </nav>
    </header>
  )
}
export default Navbar
