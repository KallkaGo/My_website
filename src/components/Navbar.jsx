import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { styles } from '../styles'
import { navLinks } from '../constants'
import { kallkaLogo, menu, close, backgroundMusic, music, muted } from '../assets'
import { throttle } from '../utils/tool'


const Navbar = () => {
  const [active, setActive] = useState('')
  const [toggle, setToggle] = useState(false)
  const [isMuted, SetisMuted] = useState(false)
  const [opacity, setOpacity] = useState(0)
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
    const handleScroll = throttle(() => {
      const scrollTop = window.scrollY // 获取滚动的像素
      const newOpacity = Math.min(scrollTop / 200, 1) // 控制透明度 0 到 1
      setOpacity(newOpacity)
      // for (let i = 0; i < navLinks.length; i++) {
      //   const section = document.getElementById(navLinks[i].id)
      //   if (section) {
      //     const rect = section.getBoundingClientRect()
      //     const isVisible = rect.top >= -200 && rect.bottom <= window.innerHeight
      //     if (isVisible) {
      //       setActive(navLinks[i].title)
      //       break
      //     }
      //     setActive('')
      //   }
      // }
    }, 100)

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])


  return (

    <motion.div
      className='navbar'
      style={{ backgroundColor: `rgba(0,0,0,${opacity}) !important`, position: "fixed", top: 0, zIndex: 20, width: "100%" }}
      initial={{ backgroundColor: `rgba(0,0,0,0)` }}
      animate={{ backgroundColor: `rgba(0,0,0,${opacity})` }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      whileHover={{ backgroundColor: `rgba(0,0,0,1)` }}
    >
      <nav
        className={`${styles.paddingX} w-full flex items-center py-5 `}
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
                    <a href={`#${link.id}`}>{link.title} </a>
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
            <img src={isMuted ? music : muted} alt="music" onClick={toggleMuted} className='cursor-pointer' />
          </div>
        </div>
      </nav >
    </motion.div>

  )
}

export default Navbar