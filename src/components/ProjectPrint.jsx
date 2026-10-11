const ProjectPrint = ({ project, number, caption, priority = false, tape = false }) => (
  <article className='project-print'>
    <a className='project-print-link' href={project.source_code_link} target='_blank' rel='noopener noreferrer' aria-label={'Explore ' + project.name + ' (opens in a new tab)'}>
      <div className={'print-mount' + (tape ? ' print-mount-taped' : '')}>
        <div className='print-image-window'>
          <img src={project.image} alt={project.name} loading={priority ? 'eager' : 'lazy'} fetchpriority={priority ? 'high' : 'auto'} decoding='async' />
        </div>
      </div>
      <div className='print-caption'>
        <div><h3><span className='print-number'>{number} /</span> {project.name}</h3><p>{caption}</p></div>
        <span className='print-arrow' aria-hidden='true'>↗</span>
      </div>
    </a>
  </article>
)
export default ProjectPrint
