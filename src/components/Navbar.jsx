import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { styles } from '../styles'
import { navLinks } from '../constants'
import { kallkaLogo, menu, close, backgroundMusic, music, muted } from '../assets'


const Navbar = () => {
  const [active, setActive] = useState('')
  const [toggle, setToggle] = useState(false)
  const [isMuted, SetisMuted] = useState(false)
  const musicRef = useRef(null)

  const toggleMuted = () => {
    SetisMuted(!isMuted)
    if (!isMuted) {
      musicRef.current.play()
    } else {
      musicRef.current.pause()
    }

  }

  useEffect(() => {

  }, [])

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary `}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link to='/'
          className='flex items-center gap-2'
          onClick={() => {
            setActive('')
            window.scrollTo(0, 0)
          }}
        >
          <img src={kallkaLogo} alt="logo" className=' xs:w-[80px] xs:h-[60px] w-[56px] h-[42px] object-contain rounded-lg' />
          <p className='text-white xs:text-[18px] text-[14px] font-bold cursor-pointer flex '> Kallka &nbsp; <span
            className='sm:block hidden'
          >| A Front end Web Developer
          </span> </p>
        </Link>
        <ul className='list-none hidden sm:flex flex-row gap-10'>
          {
            navLinks.map((link, index) => {
              return (
                <li key={link.id}
                  className={`${active === link.title ? 'text-white' : 'text-secondary'}
                    hover:text-white text-[18px] font-medium cursor-pointer
                    `
                  }
                  onClick={() => setActive(link.title)}
                >
                  <a href={`#${link.id}`}>{link.title}</a>
                </li >
              )
            })
          }
        </ul>
        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img src={toggle ? close : menu} alt="menu " className='xs:w-[28px] xs:h-[28px] w-[20px] h-[20px] object-contain cursor-pointer'
            onClick={() => { setToggle(!toggle) }}
          />
          <div className={`${!toggle ? 'hidden' : 'flex'} p-6 black-gradient absolute
          top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl 
          `}>
            <ul className='list-none flex  justify-end items-start flex-col gap-4'>
              {
                navLinks.map((link) => {
                  return (
                    <li key={link.id}
                      className={`${active === link.title ? 'text-white' : 'text-secondary'}
                   font-poppins font-medium cursor-pointer text-[16px]
                    `
                      }
                      onClick={() => {
                        setToggle(!toggle)
                        setActive(link.title)
                      }}
                    >
                      <a href={`#${link.id}`}>{link.title}</a>
                    </li >
                  )
                })
              }
            </ul>

          </div>
        </div>
        <div className=' ml-5 xs:w-[40px] xs:h-[40px] w-[30px] h-[30px] '>
          <audio loop ref={musicRef}>
            <source src={backgroundMusic} />
          </audio>
          <img src={isMuted ? music : muted}   alt="music" onClick={toggleMuted} className='cursor-pointer' />
        </div>
      </div>
    </nav >
  )
}

export default Navbar