import React from 'react'
import { styles } from '../styles'
import { services } from '../constants'
import SectionWrapper from '../hoc'
import { useGsapReveal } from '../utils/useGsapReveal'

const skillAccents = {
  'Vue Developer': {
    color: '#42b883',
    badge: 'FRONTEND',
    icon: (
      <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.75' className='w-6 h-6 text-[#42b883]'>
        <path strokeLinecap='round' strokeLinejoin='round' d='M3 3l9 16L21 3M7.5 3l4.5 8L16.5 3' />
      </svg>
    ),
  },
  'React Developer': {
    color: '#61dafb',
    badge: 'FRONTEND',
    icon: (
      <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.75' className='w-6 h-6 text-[#61dafb]'>
        <ellipse cx='12' cy='12' rx='10' ry='4.5' strokeLinecap='round' />
        <ellipse cx='12' cy='12' rx='10' ry='4.5' strokeLinecap='round' transform='rotate(60 12 12)' />
        <ellipse cx='12' cy='12' rx='10' ry='4.5' strokeLinecap='round' transform='rotate(120 12 12)' />
        <circle cx='12' cy='12' r='1.5' fill='currentColor' />
      </svg>
    ),
  },
  '3D Lovers': {
    color: '#c084fc',
    badge: 'CREATIVE 3D',
    icon: (
      <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.75' className='w-6 h-6 text-[#c084fc]'>
        <path strokeLinecap='round' strokeLinejoin='round' d='M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9' />
      </svg>
    ),
  },
  'Games and sports enthusiasts': {
    color: '#fb7185',
    badge: 'PASSION',
    icon: (
      <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.75' className='w-6 h-6 text-[#fb7185]'>
        <path strokeLinecap='round' strokeLinejoin='round' d='M15.59 14.37a5 5 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.458 14.96 14.96 0 012.759-.302z' />
      </svg>
    ),
  },
}

const serviceDescriptions = {
  'Vue Developer': 'Component architecture, reactive state flows, and modular front-end engineering.',
  'React Developer': 'High-performance interactive interfaces, hooks-based design, and modern web apps.',
  '3D Lovers': 'Three.js, WebGL shaders, real-time lighting, post-processing, and 3D scenes.',
  'Games and sports enthusiasts': 'Game mechanics passion, spatial mathematics, energetic physics, and vitality.',
}

const ServiceCard = ({ index, title }) => {
  const meta = skillAccents[title] || {
    color: '#a855f7',
    badge: 'DEVELOPMENT',
    icon: <div className='w-2 h-2 rounded-full bg-purple-400' />,
  }

  return (
    // hover 判定放在不位移的外层 wrapper 上，避免光标在卡片底边反复跨越边界导致抖动
    <div className='gsap-reveal h-full flex group'>
      <div className='relative w-full h-[300px] rounded-2xl bg-[#0c0d12] border border-white/[0.08] group-hover:border-white/20 p-6 flex flex-col justify-between transition-[transform,border-color,box-shadow] duration-300 [transform:translate3d(0,0,0)] group-hover:[transform:translate3d(0,-8px,0)] group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)] overflow-hidden select-none'>
        {/* Top: Icon & Index */}
        <div className='pointer-events-none'>
          <div className='flex items-center justify-between mb-5'>
            <div className='w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-300 bg-white/[0.03] border-white/[0.08] group-hover:border-white/20 group-hover:bg-white/[0.06]'>
              {meta.icon}
            </div>
            <span className='font-mono text-xs text-neutral-500 tracking-wider'>
              0{index + 1}
            </span>
          </div>

          {/* Title with fixed height */}
          <div className='h-[48px] flex items-center mb-2'>
            <h3 className='text-lg font-bold text-white tracking-tight group-hover:text-purple-300 transition-colors line-clamp-2 leading-snug'>
              {title}
            </h3>
          </div>

          {/* Description with fixed height */}
          <div className='h-[62px]'>
            <p className='text-xs sm:text-[13px] text-neutral-400 font-light leading-relaxed line-clamp-3'>
              {serviceDescriptions[title]}
            </p>
          </div>
        </div>

        {/* Bottom indicator horizontally aligned */}
        <div className='pt-4 border-t border-white/[0.06] flex items-center justify-between text-neutral-500 text-[11px] font-mono pointer-events-none'>
          <span className='tracking-wider text-neutral-400'>{meta.badge}</span>
          <span className='inline-block text-neutral-400 group-hover:text-white transition-[transform,color] duration-200 ease-out text-sm [transform:translate3d(0,0,0)] group-hover:[transform:translate3d(6px,0,0)]'>
            &rarr;
          </span>
        </div>
      </div>
    </div>
  )
}

const About = () => {
  const containerRef = useGsapReveal({ y: 30, stagger: 0.1 })

  return (
    <div ref={containerRef} className='relative w-full'>
      {/* Header */}
      <div className='gsap-reveal mb-6'>
        <p className={styles.sectionSubText}>INTRODUCTION</p>
        <h2 className={`${styles.sectionHeadText} mt-2 text-gradient-white`}>
          Overview.
        </h2>
      </div>

      {/* Description */}
      <div className='gsap-reveal max-w-3xl mb-12'>
        <p className='text-neutral-400 text-base sm:text-lg leading-relaxed font-light'>
          I am a graphics rendering enthusiast with a deep passion for <span className='text-white font-normal'>WebGL, Three.js, shaders, and front-end technologies</span>. I explore computer graphics, real-time lighting, and procedural materials, turning mathematical shaders and geometry into captivating interactive visual experiences. Outside coding, I enjoy gaming (MMORPG &amp; FPS) and continuous self-improvement.
        </p>
      </div>

      {/* Service Cards Grid - Uniform sizing across all screens without glare or mask */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </div>
  )
}

export default SectionWrapper(About, 'about')
