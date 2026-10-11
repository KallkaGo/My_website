import { styles } from '../styles'
import { targets } from '../constants'
import SectionWrapper from '../hoc'
import { useGsapReveal } from '../utils/useGsapReveal'
import './notebook-sections.css'

const targetDetails = {
  'Unity learning': 'C# scripting, gameplay physics, shader graph, and 3D environment architecture.',
  'fitness every day': 'Daily discipline, progressive strength training, cardio, and physical resilience.',
  'Opengl learning': 'GLSL pipelines, vertex buffers, memory optimization, and compute shaders.',
}

const TargetEntry = ({ target }) => (
  <li className='gsap-reveal notebook-target-entry'>
    <span className='notebook-target-box' aria-hidden='true' />
    <div>
      <h3>{target}</h3>
      <p className='body-copy'>{targetDetails[target] || 'Continuous dedicated practice.'}</p>
    </div>
    <span className='notebook-entry-label notebook-target-status'>IN PROGRESS</span>
  </li>
)

const Target = () => {
  const containerRef = useGsapReveal({ y: 30, stagger: 0.1 })
  return (
    <div ref={containerRef} className='notebook-targets'>
      <div className='gsap-reveal notebook-section-heading'>
        <p className={styles.sectionSubText}>MILESTONES</p>
        <h2 className={`${styles.sectionHeadText} mt-2`}>Focus &amp; Targets.</h2>
        <p className='body-copy max-w-2xl mt-4'>
          Current technical milestones and daily disciplines pursued with deliberate consistency.
        </p>
      </div>
      <ul className='notebook-target-list'>
        {targets.map((target) => <TargetEntry key={target.name} {...target} />)}
      </ul>
    </div>
  )
}

export default SectionWrapper(Target, 'target')
