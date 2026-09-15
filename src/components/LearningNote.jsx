import { styles } from '../styles'
import SectionWrapper from '../hoc'
import { learningNote } from '../constants'
import { useGsapReveal } from '../utils/useGsapReveal'

const LearningNoteCard = ({ index, title, description, image, articlelink }) => {
  return (
    // hover 判定放在不位移的外层 wrapper 上，避免光标在卡片底边反复跨越边界导致抖动
    <div className='gsap-reveal h-full flex group'>
      <a
        href={articlelink}
        target='_blank'
        rel='noopener noreferrer'
        className='relative block w-full h-[230px] rounded-2xl bg-[#0c0d12] border border-white/[0.08] group-hover:border-white/20 p-6 flex flex-col justify-between transition-[transform,border-color,box-shadow] duration-300 [transform:translate3d(0,0,0)] group-hover:[transform:translate3d(0,-8px,0)] group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)] overflow-hidden select-none'
      >
        {/* Content & Thumbnail */}
        <div className='flex gap-5 items-start justify-between pointer-events-none'>
          <div className='flex-1'>
            <div className='flex items-center gap-2 mb-2'>
              <span className='font-mono text-[10px] text-purple-400 uppercase tracking-widest'>
                ARTICLE
              </span>
              <span className='text-neutral-600'>&bull;</span>
              <span className='font-mono text-[10px] text-neutral-500'>NOTE 0{index + 1}</span>
            </div>

            <div className='h-[48px] flex items-center mb-1'>
              <h3 className='text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-purple-300 transition-colors line-clamp-2 leading-snug'>
                {title}
              </h3>
            </div>

            <div className='h-[38px]'>
              <p className='text-xs sm:text-[13px] text-neutral-400 font-light leading-relaxed line-clamp-2'>
                {description}
              </p>
            </div>
          </div>

          {image && (
            <div className='relative flex-shrink-0 w-[120px] sm:w-[130px] h-[85px] rounded-xl overflow-hidden bg-black/50 border border-white/[0.06] pointer-events-none'>
              <img
                src={image}
                alt={title}
                className='w-full h-full object-cover transition-transform duration-500 opacity-85 group-hover:opacity-100 [transform:translate3d(0,0,0)_scale(1)] group-hover:[transform:translate3d(0,0,0)_scale(1.05)]'
                loading='lazy'
              />
            </div>
          )}
        </div>

        {/* Bottom link indicator */}
        <div className='pt-3.5 border-t border-white/[0.06] flex items-center justify-between text-neutral-500 text-xs font-mono pointer-events-none'>
          <span className='group-hover:text-neutral-300 transition-colors tracking-wider text-[11px]'>READ FULL ARTICLE</span>
          <span className='inline-block text-neutral-400 group-hover:text-white transition-transform duration-200 ease-out [transform:translate3d(0,0,0)] group-hover:[transform:translate3d(6px,0,0)]'>
            &rarr;
          </span>
        </div>
      </a>
    </div>
  )
}

const LearningNote = () => {
  const containerRef = useGsapReveal({ y: 30, stagger: 0.1 })

  return (
    <div ref={containerRef} className='relative w-full'>
      {/* Header */}
      <div className='gsap-reveal mb-10'>
        <p className={styles.sectionSubText}>WRITINGS &amp; LOGS</p>
        <h2 className={`${styles.sectionHeadText} mt-2 text-gradient-white`}>
          Learning Notes.
        </h2>
        <p className='text-neutral-400 text-sm sm:text-base font-light max-w-2xl mt-3'>
          Technical insights, shader breakdowns, and notes documented during front-end and WebGL engineering exploration.
        </p>
      </div>

      {/* Cards Grid - Uniform equal height rows */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch'>
        {learningNote.length > 0 &&
          learningNote.map((notes, index) => (
            <LearningNoteCard key={notes.title} index={index} {...notes} />
          ))}
      </div>
    </div>
  )
}

export default SectionWrapper(LearningNote, 'notes')
