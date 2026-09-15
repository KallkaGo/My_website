import SectionWrapper from '../hoc'
import { technologies } from '../constants'
import { styles } from '../styles'
import { useGsapReveal } from '../utils/useGsapReveal'

const TechCard = ({ tech }) => {
  return (
    // hover 判定放在不位移的外层 wrapper 上，避免光标在卡片底边反复跨越边界导致抖动
    <div className='gsap-reveal h-full flex group'>
      <div className='relative w-full h-[120px] rounded-2xl bg-[#0c0d12] border border-white/[0.08] group-hover:border-white/20 p-4 flex flex-col items-center justify-center gap-2.5 transition-[transform,border-color,box-shadow] duration-300 [transform:translate3d(0,0,0)] group-hover:[transform:translate3d(0,-8px,0)] group-hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.8)] overflow-hidden select-none'>
        {/* Icon with uniform size container */}
        <div className='w-11 h-11 flex items-center justify-center transition-transform duration-300 pointer-events-none [transform:translate3d(0,0,0)_scale(1)] group-hover:[transform:translate3d(0,0,0)_scale(1.1)]'>
          <img
            src={tech.icon}
            alt={tech.name}
            className={`max-w-full max-h-full object-contain filter ${
              tech.name === 'Three JS' ? 'brightness-0 invert opacity-90' : 'opacity-85 group-hover:opacity-100'
            } transition-opacity duration-300`}
            loading='lazy'
          />
        </div>

        {/* Tech label */}
        <span className='text-xs font-medium text-neutral-400 group-hover:text-white transition-colors text-center tracking-wide line-clamp-1 pointer-events-none'>
          {tech.name}
        </span>
      </div>
    </div>
  )
}

const Tech = () => {
  const containerRef = useGsapReveal({ y: 25, stagger: 0.04 })

  return (
    <div ref={containerRef} className='relative w-full'>
      {/* Header */}
      <div className='gsap-reveal mb-10'>
        <p className={styles.sectionSubText}>TECH STACK</p>
        <h2 className={`${styles.sectionHeadText} mt-2 text-gradient-white`}>
          Tech Stack.
        </h2>
        <p className='text-neutral-400 text-sm sm:text-base font-light max-w-xl mt-3'>
          Modern frameworks, shader tools, and graphics libraries powering real-time web applications.
        </p>
      </div>

      {/* Modern Minimalist Tech Grid - All cards exactly uniform without glare or mask */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 items-stretch'>
        {technologies.map((tech, index) => (
          <TechCard key={tech.name} tech={tech} index={index} />
        ))}
      </div>
    </div>
  )
}

export default SectionWrapper(Tech, 'tech')
