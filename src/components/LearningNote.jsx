import { styles } from '../styles'
import SectionWrapper from '../hoc'
import { learningNote } from '../constants'
import { useGsapReveal } from '../utils/useGsapReveal'
import './notebook-sections.css'

const LearningNoteEntry = ({ index, title, description, image, articlelink }) => (
  <li className='gsap-reveal'>
    <a href={articlelink} target='_blank' rel='noopener noreferrer' className='notebook-note-entry'>
      <span className='notebook-entry-number' aria-hidden='true'>{String(index + 1).padStart(2, '0')}</span>
      <div className='notebook-note-copy'>
        <p className='notebook-entry-label'>ARTICLE / NOTE {String(index + 1).padStart(2, '0')}</p>
        <h3>{title}</h3>
        <p className='body-copy'>{description}</p>
        <span className='notebook-note-link'>READ FULL ARTICLE <span aria-hidden='true'>↗</span></span>
        <span className='sr-only'> (opens in a new tab)</span>
      </div>
      {image && (
        <div className='notebook-note-mount'>
          <img src={image} alt={title} loading='lazy' decoding='async' />
        </div>
      )}
    </a>
  </li>
)

const LearningNote = () => {
  const containerRef = useGsapReveal({ y: 30, stagger: 0.1 })
  return (
    <div ref={containerRef} className='notebook-notes'>
      <div className='gsap-reveal notebook-section-heading'>
        <p className={styles.sectionSubText}>WRITINGS &amp; LOGS</p>
        <h2 className={`${styles.sectionHeadText} mt-2`}>Learning Notes.</h2>
        <p className='body-copy max-w-2xl mt-4'>
          Technical insights, shader breakdowns, and notes documented during front-end and WebGL engineering exploration.
        </p>
      </div>
      <ol className='notebook-note-list'>
        {learningNote.map((note, index) => <LearningNoteEntry key={note.title} index={index} {...note} />)}
      </ol>
    </div>
  )
}

export default SectionWrapper(LearningNote, 'notes')
