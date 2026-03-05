import React from 'react'
import { Tilt } from 'react-tilt'
import { motion } from 'framer-motion'
import { styles } from '../styles'
import { services } from '../constants'
import { fadeIn, textVariant } from '../utils/motion.js'
import SectionWrapper from '../hoc'
import { useInteractStore } from '../utils/Store.js'

// Sci-fi SVG Icons
const sciFiIcons = {
  'Vue Developer': (
    <svg viewBox='0 0 100 100' className='w-16 h-16'>
      <defs>
        <linearGradient id='vueGrad' x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' stopColor='#42b883' stopOpacity='1' />
          <stop offset='100%' stopColor='#35495e' stopOpacity='1' />
        </linearGradient>
      </defs>
      <polygon points='50,15 20,40 20,85 50,60 80,85 80,40' fill='url(#vueGrad)' opacity='0.9' />
      <polygon points='50,15 20,40 50,60 80,40' fill='#42b883' />
      <circle cx='50' cy='50' r='45' fill='none' stroke='url(#vueGrad)' strokeWidth='1' opacity='0.3' />
      <circle cx='50' cy='50' r='35' fill='none' stroke='url(#vueGrad)' strokeWidth='0.5' opacity='0.2' />
    </svg>
  ),
  'React Developer': (
    <svg viewBox='0 0 100 100' className='w-16 h-16'>
      <defs>
        <linearGradient id='reactGrad' x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' stopColor='#61dafb' stopOpacity='1' />
          <stop offset='100%' stopColor='#282c34' stopOpacity='1' />
        </linearGradient>
      </defs>
      <ellipse cx='50' cy='50' rx='35' ry='12' fill='none' stroke='url(#reactGrad)' strokeWidth='2' opacity='0.7' />
      <ellipse cx='50' cy='50' rx='35' ry='12' fill='none' stroke='url(#reactGrad)' strokeWidth='2' opacity='0.7' transform='rotate(60 50 50)' />
      <ellipse cx='50' cy='50' rx='35' ry='12' fill='none' stroke='url(#reactGrad)' strokeWidth='2' opacity='0.7' transform='rotate(120 50 50)' />
      <circle cx='50' cy='50' r='6' fill='#61dafb' />
      <circle cx='50' cy='50' r='45' fill='none' stroke='url(#reactGrad)' strokeWidth='1' opacity='0.3' />
    </svg>
  ),
  '3D Lovers': (
    <svg viewBox='0 0 100 100' className='w-16 h-16'>
      <defs>
        <linearGradient id='3dGrad' x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' stopColor='#a855f7' stopOpacity='1' />
          <stop offset='100%' stopColor='#3b82f6' stopOpacity='1' />
        </linearGradient>
      </defs>
      <polygon points='50,20 80,35 80,65 50,80 20,65 20,35' fill='none' stroke='url(#3dGrad)' strokeWidth='2' />
      <polygon points='50,20 50,80 20,65 20,35' fill='url(#3dGrad)' opacity='0.2' />
      <line x1='50' y1='20' x2='50' y2='80' stroke='url(#3dGrad)' strokeWidth='1' opacity='0.5' />
      <line x1='20' y1='35' x2='80' y2='35' stroke='url(#3dGrad)' strokeWidth='1' opacity='0.5' />
      <line x1='20' y1='65' x2='80' y2='65' stroke='url(#3dGrad)' strokeWidth='1' opacity='0.5' />
      <circle cx='50' cy='50' r='45' fill='none' stroke='url(#3dGrad)' strokeWidth='1' opacity='0.3' />
    </svg>
  ),
  'Games and sports enthusiasts': (
    <svg viewBox='0 0 100 100' className='w-16 h-16'>
      <defs>
        <linearGradient id='gameGrad' x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' stopColor='#f472b6' stopOpacity='1' />
          <stop offset='100%' stopColor='#a855f7' stopOpacity='1' />
        </linearGradient>
      </defs>
      <rect x='25' y='30' width='50' height='40' rx='5' fill='none' stroke='url(#gameGrad)' strokeWidth='2' />
      <circle cx='40' cy='50' r='5' fill='url(#gameGrad)' opacity='0.8' />
      <circle cx='60' cy='50' r='5' fill='url(#gameGrad)' opacity='0.8' />
      <rect x='35' y='55' width='30' height='5' rx='2' fill='url(#gameGrad)' opacity='0.6' />
      <line x1='20' y1='40' x2='25' y2='40' stroke='url(#gameGrad)' strokeWidth='2' opacity='0.5' />
      <line x1='20' y1='60' x2='25' y2='60' stroke='url(#gameGrad)' strokeWidth='2' opacity='0.5' />
      <line x1='75' y1='40' x2='80' y2='40' stroke='url(#gameGrad)' strokeWidth='2' opacity='0.5' />
      <line x1='75' y1='60' x2='80' y2='60' stroke='url(#gameGrad)' strokeWidth='2' opacity='0.5' />
      <circle cx='50' cy='50' r='45' fill='none' stroke='url(#gameGrad)' strokeWidth='1' opacity='0.3' />
    </svg>
  ),
}

const ServiceCard = ({ index, title }) => {
  const system = useInteractStore((state) => state.system)

  const cardContent = (
    <motion.div
      variants={fadeIn('up', 'spring', index * 0.1, 0.5)}
      className='relative group cursor-pointer h-full'
    >
      {/* Subtle glow effect */}
      <div className='absolute -inset-0.5 bg-gradient-to-br from-purple-600/20 to-pink-600/20
        rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition duration-500'>
      </div>

      {/* Card */}
      <div className='relative bg-[#151525] rounded-2xl p-8 border border-gray-700/50
        hover:border-purple-500/30 transition-all duration-300
        shadow-xl overflow-hidden h-[280px] flex flex-col items-center justify-center'>
        {/* Hover background */}
        <div className='absolute inset-0 bg-gradient-to-br from-purple-900/10 to-pink-900/10
          opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
        </div>

        {/* Content */}
        <div className='relative z-10 flex flex-col items-center justify-center gap-6'>
          {/* Icon */}
          <div className='relative'>
            <div className='absolute inset-0 bg-purple-500/20 blur-xl rounded-full
              opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
            </div>
            <div className='relative group-hover:scale-110 transition-transform duration-300'>
              {sciFiIcons[title]}
            </div>
          </div>

          {/* Title */}
          <h3 className='text-white text-xl font-bold text-center
            group-hover:text-transparent group-hover:bg-clip-text
            group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400
            transition-all duration-300'>
            {title}
          </h3>
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className='w-[250px]'>
      {system === 'pc' ? (
        <Tilt options={{ max: 10, scale: 1.02, speed: 500 }}>
          {cardContent}
        </Tilt>
      ) : (
        cardContent
      )}
    </div>
  )
}

const About = () => {
  return (
    <div className='relative'>
      {/* Background grid */}
      <div className='absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),
        linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] -z-10'>
      </div>

      {/* Header */}
      <motion.div variants={textVariant()} className='mb-8'>
        <p className={`${styles.sectionSubText} text-purple-400`}>Introduction</p>
        <h2 className={`${styles.sectionHeadText} bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400
          bg-clip-text text-transparent`}>
          Overview.
        </h2>
        <div className='h-1 w-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-4'>
            </div>
      </motion.div>

      {/* Description */}
      <motion.p
        variants={fadeIn('', '', 0.1, 1)}
        className='mt-4 text-gray-300 text-[17px] max-w-3xl leading-[30px]
          bg-gradient-to-br from-[#1a1a2e]/60 to-[#151525]/60
          backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50'
      >
        I'm a skilled software developer with experience in TypeScript and
        JavaScript, and expertise in frameworks like React, Vue.js, and
        Three.js. I'm a quick learner and collaborate closely with clients to
        create efficient, scalable, and user-friendly solutions that solve
        real-world problems. Also I am a fan of games from MMORPG to FPS, I wish I could be your friend!
      </motion.p>

      {/* Service Cards */}
      <div className='mt-20 flex flex-wrap gap-8 justify-center'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </div>
  )
}

export default SectionWrapper(About, 'about')
