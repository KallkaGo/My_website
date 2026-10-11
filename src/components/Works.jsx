import { useEffect, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../constants'
import SectionWrapper from '../hoc'
import ProjectPrint from './ProjectPrint'
import { GemSketch, ArrowSketch } from './NotebookArt'

const featured = ['Toon Water', 'Gem'].map((name) => projects.find((project) => project.name === name))
const otherProjects = [...projects].reverse().filter((project) => !['Toon Water', 'Gem'].includes(project.name))

const Works = () => {
  const [expanded, setExpanded] = useState(false)
  useEffect(() => {
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(frame)
  }, [expanded])
  return (
    <div className='notebook-works'>
      <h2 className='sr-only'>Selected works</h2>
      <div className='featured-prints'>
        {featured.map((project, index) => <div key={project.name} className={'featured-print featured-print-' + index}>
          <ProjectPrint project={project} number={'0' + (index + 1)} caption={index === 0 ? 'Stylized water shader' : 'Real-time refraction'} />
          <div className='print-margin-note' aria-hidden='true'>
            {index === 0 ? <><span className='hand-note'>toon<br />waves &<br />foam</span><ArrowSketch /></> : <><GemSketch /><span className='hand-note'>a little<br />sparkle</span></>}
          </div>
        </div>)}
      </div>
      <div className='notebook-note-strip'>
        <span className='hand-note' aria-hidden='true'>same tools,<br />new worlds.</span>
        <button className='notebook-link archive-toggle' aria-expanded={expanded} aria-controls='project-archive' onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Close the archive' : 'All ' + projects.length + ' projects'} <span aria-hidden='true'>{expanded ? '−' : '+'}</span>
        </button>
      </div>
      <div id='project-archive' hidden={!expanded} className='project-archive'>
        <div className='archive-heading'><p className='section-kicker'>More pages from the notebook</p><h3 className='section-title'>Keep exploring.</h3></div>
        <div className='archive-grid'>
          {otherProjects.map((project, index) => <article key={project.name} className='archive-project'>
            <a href={project.source_code_link} target='_blank' rel='noopener noreferrer'>
              <div className='print-mount'><div className='print-image-window'><img src={project.image} alt={project.name} loading='lazy' decoding='async' style={project.imageScale ? { '--image-scale': project.imageScale } : undefined} /></div></div>
              <div className='archive-project-title'><h4><span>{String(index + 3).padStart(2, '0')} /</span> {project.name}</h4><span aria-hidden='true'>↗</span></div>
              <p>{project.description}</p>
              <div className='archive-project-tags'>{project.tags.map((tag) => <span key={tag.name}>{tag.name}</span>)}<span>{project.type === 'preview' ? 'Demo' : 'Code'} ↗</span></div>
            </a>
          </article>)}
        </div>
      </div>
    </div>
  )
}
export default SectionWrapper(Works, 'work')
