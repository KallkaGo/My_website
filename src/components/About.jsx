import { styles } from '../styles'
import { services } from '../constants'
import SectionWrapper from '../hoc'
import { useGsapReveal } from '../utils/useGsapReveal'
import './notebook-sections.css'

const serviceDescriptions = {
  'Vue Developer': 'Component architecture, reactive state flows, and modular front-end engineering.',
  'React Developer': 'High-performance interactive interfaces, hooks-based design, and modern web apps.',
  '3D Lovers': 'Three.js, WebGL shaders, real-time lighting, post-processing, and 3D scenes.',
  'Games and sports enthusiasts': 'Game mechanics passion, spatial mathematics, energetic physics, and vitality.',
}

const serviceLabels = {
  'Vue Developer': 'FRONTEND',
  'React Developer': 'FRONTEND',
  '3D Lovers': 'CREATIVE 3D',
  'Games and sports enthusiasts': 'PASSION',
}

const ServiceEntry = ({ index, title }) => (
  <li className='gsap-reveal notebook-capability'>
    <span className='notebook-entry-number' aria-hidden='true'>{String(index + 1).padStart(2, '0')}</span>
    <div>
      <p className='notebook-entry-label'>{serviceLabels[title] || 'DEVELOPMENT'}</p>
      <h3>{title}</h3>
      <p className='body-copy'>{serviceDescriptions[title]}</p>
    </div>
  </li>
)

const About = () => {
  const containerRef = useGsapReveal({ y: 30, stagger: 0.1 })
  return (
    <div ref={containerRef} className='notebook-about'>
      <div className='notebook-about-intro'>
        <div className='gsap-reveal notebook-section-heading'>
          <p className={styles.sectionSubText}>INTRODUCTION</p>
          <h2 className={`${styles.sectionHeadText} mt-2`}>Overview.</h2>
        </div>
        <p className='gsap-reveal body-copy notebook-bio'>
          I am a graphics rendering enthusiast with a deep passion for <strong>WebGL, Three.js, shaders, and front-end technologies</strong>. I explore computer graphics, real-time lighting, and procedural materials, turning mathematical shaders and geometry into captivating interactive visual experiences. Outside coding, I enjoy gaming (MMORPG &amp; FPS) and continuous self-improvement.
        </p>
        <span className='gsap-reveal notebook-bio-note' aria-hidden='true'>continuous self-improvement ↗</span>
      </div>
      <ol className='notebook-capabilities'>
        {services.map((service, index) => <ServiceEntry key={service.title} index={index} {...service} />)}
      </ol>
    </div>
  )
}

export default SectionWrapper(About, 'about')
