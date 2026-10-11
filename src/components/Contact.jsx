import { useRef, useState } from 'react'
import emailJs from '@emailjs/browser'
import { SunCanvas } from './canvas'
import MotionStudyCard from './MotionStudyCard'
import SectionWrapper from '../hoc'
import { useGsapReveal } from '../utils/useGsapReveal'
import './notebook-interactive.css'

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState(null)
  const containerRef = useGsapReveal({ y: 30, stagger: 0.15 })
  const motionRef = useRef({ x: 0, y: 0, hover: 0 })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const validateForm = () => {
    const nameInput = form.name.trim()
    const emailInput = form.email.trim()
    const messageInput = form.message.trim()
    return !nameInput || !emailInput || !messageInput
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      setStatusMessage({ type: 'error', text: 'Please fill in all fields before sending.' })
      return
    }

    setLoading(true)
    setStatusMessage(null)

    emailJs
      .send(
        'service_hzorj2i',
        'template_q26i4rg',
        {
          from_name: form.name,
          to_name: 'Kallka',
          from_email: form.email,
          to_mail: 'kallka.ciallo@gmail.com',
          message: form.message,
        },
        'shVZm0O5U1s-sguCF'
      )
      .then(
        () => {
          setLoading(false)
          setStatusMessage({ type: 'success', text: 'Thank you! Your message has been sent successfully.' })
          setForm({
            name: '',
            email: '',
            message: '',
          })
        },
        (err) => {
          setLoading(false)
          console.error(err)
          setStatusMessage({ type: 'error', text: 'Something went wrong. Please try again later.' })
        }
      )
  }

  return (
    <div ref={containerRef} className='notebook-contact'>
      <div className='notebook-contact-layout'>
        <div className='gsap-reveal notebook-contact-note'>
          <p className='section-kicker'>GET IN TOUCH</p>
          <h2 className='section-title notebook-contact-title'>Let’s make something.</h2>
          <p className='body-copy notebook-contact-intro'>
            Have an inquiry, a project in mind, or a shader you want to talk about? Leave me a note.
          </p>

          <div className='notebook-contact-status' role='status' aria-live='polite' aria-atomic='true'>
            {statusMessage && (
              <p className={`notebook-status-message notebook-status-${statusMessage.type}`}>
                {statusMessage.text}
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className='notebook-contact-form' aria-busy={loading}>
            <div className='notebook-contact-field'>
              <label htmlFor='contact-name'>Your name</label>
              <input
                id='contact-name'
                type='text'
                name='name'
                autoComplete='name'
                value={form.name}
                onChange={handleChange}
                placeholder='Alex Morgan'
              />
            </div>
            <div className='notebook-contact-field'>
              <label htmlFor='contact-email'>Your email</label>
              <input
                id='contact-email'
                type='email'
                name='email'
                autoComplete='email'
                value={form.email}
                onChange={handleChange}
                placeholder='alex@example.com'
              />
            </div>
            <div className='notebook-contact-field'>
              <label htmlFor='contact-message'>Your message</label>
              <textarea
                id='contact-message'
                rows={4}
                name='message'
                value={form.message}
                onChange={handleChange}
                placeholder='Tell me what you’re thinking…'
              />
            </div>
            <button type='submit' disabled={loading} className='notebook-button notebook-contact-send'>
              {loading ? 'Sending…' : 'Send your note ↗'}
            </button>
          </form>

          <div className='notebook-contact-direct'>
            <span>Or write directly</span>
            <a href='mailto:kallka.ciallo@gmail.com' className='notebook-link'>
              kallka.ciallo@gmail.com
            </a>
          </div>
        </div>

        <figure className='notebook-sun-study'>
          <MotionStudyCard className='motion-sun-card' motionRef={motionRef} label='Interactive Sun shader' hoverEnabled={false}>
            <div className='study-card-label' aria-hidden='true'><span>02 / Sun</span><span>Light, in motion</span></div>
            <div className='notebook-sun-viewport' role='img' aria-label='A rotating golden sun with glowing coronal loops, centered in the notebook'>
              <div className='notebook-sun-canvas'><SunCanvas /></div>
            </div>
            <div className='sun-card-footnote' aria-hidden='true'><span>A little warmth,<br />for the next idea.</span><span>↗</span></div>
          </MotionStudyCard>
          <figcaption className='notebook-sun-caption'>
            <div>
              <span className='notebook-study-title'>Keep a little light.</span>
              <span className='notebook-study-detail'>A living sun, turning with every new idea.</span>
            </div>
            <span className='notebook-margin-note' aria-hidden='true'>keep exploring ↗</span>
          </figcaption>
        </figure>
      </div>
    </div>
  )
}

export default SectionWrapper(Contact, 'contact')
