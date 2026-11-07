import { useEffect } from 'react'
import SectionWrapper from '../hoc'
import { technologies } from '../constants'
import { styles } from '../styles'
import { useGsapReveal } from '../utils/useGsapReveal'
import './notebook-sections.css'

const TechEntry = ({ tech }) => (
  <li className='gsap-reveal notebook-tech-entry'>
    {tech.monochrome ? (
      // 用 mask 生成单色图标，避免滚动时对 12 个 img 逐帧执行 filter。
      <span
        className='notebook-tech-icon notebook-tech-icon-mono'
        style={{ '--tech-icon': `url("${tech.icon}")` }}
        aria-hidden='true'
      />
    ) : (
      <img
        src={tech.icon}
        alt=''
        className='notebook-tech-icon'
        loading='lazy'
        decoding='async'
      />
    )}
    <span>{tech.name}</span>
  </li>
)

const Tech = () => {
  const containerRef = useGsapReveal({ stagger: 0.04 })
  // 在 loading 覆盖层期间就把图标读入缓存，避免滚到 Tech Stack 时才解码。
  useEffect(() => {
    technologies.forEach(({ icon }) => {
      const image = new Image()
      image.decoding = 'async'
      image.src = icon
    })
  }, [])
  return (
    <div ref={containerRef} className='notebook-tech'>
      <div className='gsap-reveal notebook-section-heading'>
        <p className={styles.sectionSubText}>TECH STACK</p>
        <h2 className={`${styles.sectionHeadText} mt-2`}>Tech Stack.</h2>
        <p className='body-copy max-w-2xl mt-4'>
          Modern frameworks, game engines, and graphics libraries powering real-time interactive experiences.
        </p>
      </div>
      <ul className='notebook-tech-strip'>
        {technologies.map((tech) => <TechEntry key={tech.name} tech={tech} />)}
      </ul>
    </div>
  )
}

export default SectionWrapper(Tech, 'tech')
