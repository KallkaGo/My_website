import { styles } from '../styles'
import SectionWrapper from '../hoc'
import { projects } from '../constants'
import { useGsapReveal } from '../utils/useGsapReveal'

const ProjectCard = ({ name, description, tags, image, source_code_link, type = 'github', active = true }) => {
  return (
    // hover 判定放在不位移的外层 wrapper 上，避免光标在卡片底边反复跨越边界导致抖动
    <div className='gsap-reveal h-full flex group'>
      <a
        href={source_code_link || '#'}
        target='_blank'
        rel='noopener noreferrer'
        className='relative w-full h-[375px] rounded-2xl bg-[#0c0d12] border border-white/[0.08] group-hover:border-white/20 p-5 flex flex-col justify-between transition-[transform,border-color,box-shadow] duration-300 [transform:translate3d(0,0,0)] group-hover:[transform:translate3d(0,-8px,0)] group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.9)] overflow-hidden select-none'
      >
        {/* Top: Clean Media Showcase - Absolutely NO buttons, masks, or glare over the image */}
        <div>
          <div className='relative w-full h-[195px] overflow-hidden rounded-xl bg-black/40 border border-white/[0.05] mb-4 pointer-events-none'>
            <img
              src={image}
              alt={name}
              className='w-full h-full object-cover transition-transform duration-500 [transform:translate3d(0,0,0)_scale(1)] group-hover:[transform:translate3d(0,0,0)_scale(1.05)]'
              loading='lazy'
            />
          </div>

          {/* Project Title */}
          <div className='h-[28px] flex items-center mb-1.5 pointer-events-none'>
            <h3 className='text-lg font-bold text-white tracking-tight group-hover:text-purple-300 transition-colors line-clamp-1'>
              {name}
            </h3>
          </div>

          {/* Description */}
          <div className='h-[42px] pointer-events-none'>
            <p className='text-xs sm:text-[13px] text-neutral-400 font-light leading-relaxed line-clamp-2'>
              {description}
            </p>
          </div>
        </div>

        {/* Bottom Row: Tags & Direct Action Link */}
        <div className='pt-3.5 border-t border-white/[0.06] flex items-center justify-between gap-3 pointer-events-none'>
          <div className='flex flex-wrap gap-1.5 overflow-hidden max-h-[26px]'>
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag.name}
                className='text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-neutral-400 border border-white/[0.04]'
              >
                #{tag.name}
              </span>
            ))}
          </div>

          <div className='text-xs font-mono text-neutral-400 group-hover:text-white flex items-center gap-1.5 transition-colors duration-200 flex-shrink-0'>
            <span>{type === 'preview' ? 'DEMO' : 'CODE'}</span>
            <span className='inline-block transition-transform duration-200 ease-out [transform:translate3d(0,0,0)] group-hover:[transform:translate3d(4px,0,0)]'>
              &rarr;
            </span>
          </div>
        </div>
      </a>
    </div>
  )
}

const Works = () => {
  const containerRef = useGsapReveal({ y: 30, stagger: 0.08 })

  return (
    <div ref={containerRef} className='relative w-full'>
      {/* Header */}
      <div className='gsap-reveal mb-10'>
        <p className={styles.sectionSubText}>SELECTED WORKS</p>
        <h2 className={`${styles.sectionHeadText} mt-2 text-gradient-white`}>
          Projects.
        </h2>
        <p className='text-neutral-400 text-sm sm:text-base font-light max-w-2xl mt-3'>
          A curation of real-time 3D web applications, visual shaders, interactive tools, and open-source experiments.
        </p>
      </div>

      {/* Projects Grid - Equal height, uniform columns, compact and balanced */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch'>
        {[...projects].reverse().map((project, index) => (
          <ProjectCard key={project.name} index={index} {...project} />
        ))}
      </div>
    </div>
  )
}

export default SectionWrapper(Works, 'work')
