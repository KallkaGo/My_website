import SectionWrapper from '../hoc'
import { technologies } from '../constants'
import { styles } from '../styles'
import { useGsapReveal } from '../utils/useGsapReveal'
import './notebook-sections.css'

const TechEntry = ({ tech }) => (
  <li className='gsap-reveal notebook-tech-entry'>
    <img
      src={tech.icon}
      alt=''
      className={tech.monochrome ? 'notebook-tech-icon notebook-tech-icon-mono' : 'notebook-tech-icon'}
      loading='lazy'
      decoding='async'
    />
    <span>{tech.name}</span>
  </li>
)

const Tech = () => {
  const containerRef = useGsapReveal({ y: 25, stagger: 0.04 })
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
