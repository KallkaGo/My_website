import { styles } from '../styles'
import { targets } from '../constants'
import SectionWrapper from '../hoc'
import { useGsapReveal } from '../utils/useGsapReveal'

const targetIcons = {
  'Unity learning': (
    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.75' className='w-6 h-6 text-amber-400'>
      <path strokeLinecap='round' strokeLinejoin='round' d='M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9' />
      <path strokeLinecap='round' strokeLinejoin='round' d='M12 12.75l9-5.25M12 12.75v9M12 12.75L3 7.5' />
    </svg>
  ),
  'fitness every day': (
    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.75' className='w-6 h-6 text-emerald-400'>
      <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z' />
    </svg>
  ),
  'Opengl learning': (
    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.75' className='w-6 h-6 text-cyan-400'>
      <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.25 0h1.5m14.25 0h1.5' />
      <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15' />
    </svg>
  ),
}

const targetDetails = {
  'Unity learning': 'C# scripting, gameplay physics, shader graph, and 3D environment architecture.',
  'fitness every day': 'Daily discipline, progressive strength training, cardio, and physical resilience.',
  'Opengl learning': 'GLSL pipelines, vertex buffers, memory optimization, and compute shaders.',
}

const TargetCard = ({ index, target }) => {
  return (
    // hover 判定放在不位移的外层 wrapper 上，避免光标在卡片底边反复跨越边界导致抖动
    <div className='gsap-reveal h-full flex group'>
      <div className='relative w-full h-[270px] rounded-2xl bg-[#0c0d12] border border-white/[0.08] group-hover:border-white/20 p-6 flex flex-col justify-between transition-[transform,border-color,box-shadow] duration-300 [transform:translate3d(0,0,0)] group-hover:[transform:translate3d(0,-8px,0)] group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)] overflow-hidden select-none'>
        {/* Top: Status & Icon */}
        <div className='pointer-events-none'>
          <div className='flex items-center justify-between mb-4'>
            <div className='w-11 h-11 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center group-hover:border-white/20 transition-all duration-300'>
              {targetIcons[target] || (
                <div className='w-3 h-3 rounded-full bg-purple-400' />
              )}
            </div>
            <span className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400 tracking-wider'>
              <span className='w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse' />
              IN PROGRESS
            </span>
          </div>

          {/* Title with fixed height */}
          <div className='h-[36px] flex items-center mb-1.5'>
            <h3 className='text-lg font-bold text-white tracking-tight group-hover:text-purple-300 transition-colors line-clamp-1'>
              {target}
            </h3>
          </div>

          {/* Description with fixed height */}
          <div className='h-[46px]'>
            <p className='text-xs sm:text-[13px] text-neutral-400 font-light leading-relaxed line-clamp-2'>
              {targetDetails[target] || 'Continuous dedicated practice.'}
            </p>
          </div>
        </div>

        {/* Bottom progress bar aesthetic */}
        <div className='pt-4 border-t border-white/[0.06] pointer-events-none'>
          <div className='flex justify-between items-center text-[10px] font-mono text-neutral-500 mb-2'>
            <span>ACTIVE COMMITMENT</span>
            <span className='text-neutral-400'>2026 &bull; ON TRACK</span>
          </div>
          <div className='w-full h-1.5 bg-white/[0.05] rounded-full overflow-hidden'>
            <div
              className='h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 rounded-full'
              style={{ width: `${68 + index * 10}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const Target = () => {
  const containerRef = useGsapReveal({ y: 30, stagger: 0.1 })

  return (
    <div ref={containerRef} className='relative w-full'>
      {/* Header */}
      <div className='gsap-reveal mb-10'>
        <p className={styles.sectionSubText}>MILESTONES</p>
        <h2 className={`${styles.sectionHeadText} mt-2 text-gradient-white`}>
          Focus &amp; Targets.
        </h2>
        <p className='text-neutral-400 text-sm sm:text-base font-light max-w-xl mt-3'>
          Current technical milestones and daily disciplines pursued with deliberate consistency.
        </p>
      </div>

      {/* Target Cards Grid - Strictly uniform columns without glare or mask */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch'>
        {targets.length > 0 &&
          targets.map((target, index) => (
            <TargetCard key={target.name} index={index} {...target} />
          ))}
      </div>
    </div>
  )
}

export default SectionWrapper(Target, 'target')