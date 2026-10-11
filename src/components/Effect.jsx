import { useRef } from 'react'
import { ParticlesCanvas } from './canvas'
import MotionStudyCard from './MotionStudyCard'
import SectionWrapper from '../hoc'
import { useGsapReveal } from '../utils/useGsapReveal'

const MouseEffect = () => {
  const containerRef = useGsapReveal({ y: 30, stagger: 0.1 })
  const motionRef = useRef({ x: 0, y: 0, hover: 0 })

  return (
    <div ref={containerRef} className='notebook-lab'>
      <div className='gsap-reveal notebook-lab-header'>
        <p className='section-kicker'>INTERACTIVE LAB</p>
        <h2 className='section-title'>Shader force field.</h2>
        <p className='body-copy notebook-lab-intro'>
          A picture that follows your movement. Move across the card and let the details drift.
        </p>
      </div>
      <figure className='notebook-lab-study'>
        <MotionStudyCard className='motion-field-card' motionRef={motionRef} label='Interactive particle effect' hoverEnabled={false}>
          <div className='study-card-label' aria-hidden='true'><span>01 / Particles</span><span>Move to explore ↗</span></div>
          <div className='notebook-lab-viewport' aria-label='Interactive GPU particle shader'>
            <ParticlesCanvas />
          </div>
        </MotionStudyCard>
        <figcaption className='notebook-lab-caption'>
          <div>
            <span className='notebook-study-title'>Particles, set in motion.</span>
            <span className='notebook-study-detail'>An interactive picture, with a little room to play.</span>
          </div>
          <p className='notebook-lab-hint hand-note'>a little movement, a new perspective ↗</p>
        </figcaption>
      </figure>
    </div>
  )
}

export default SectionWrapper(MouseEffect, 'lab')
