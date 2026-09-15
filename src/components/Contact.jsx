import { useState } from 'react'
import emailJs from '@emailjs/browser'
import { styles } from '../styles'
import { SunCanvas } from './canvas'
import SectionWrapper from '../hoc'
import { useGsapReveal } from '../utils/useGsapReveal'

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState(null)
  const containerRef = useGsapReveal({ y: 30, stagger: 0.15 })

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
          to_mail: 'bettermarry1016@gmail.com',
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
    <div ref={containerRef} className='relative w-full'>
      <div className='flex flex-col-reverse xl:flex-row gap-10 items-stretch'>
        {/* Left: Contact Form Card */}
        <div className='gsap-reveal flex-[0.8] relative'>
          <div className='relative h-full bg-[#0c0d12] rounded-3xl p-8 sm:p-10 border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col justify-between'>
            {/* Header */}
            <div>
              <div className='mb-6'>
                <p className={styles.sectionSubText}>GET IN TOUCH</p>
                <h2 className={`${styles.sectionHeadText} mt-2 text-gradient-white`}>
                  Contact.
                </h2>
                <p className='text-neutral-400 text-sm font-light mt-2'>
                  Have an inquiry, collaborative project idea, or just want to discuss WebGL and shaders? Drop a message.
                </p>
              </div>

              {/* Status Alert */}
              {statusMessage && (
                <div
                  className={`mb-6 p-4 rounded-xl text-xs font-mono border ${
                    statusMessage.type === 'success'
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                  }`}
                >
                  {statusMessage.text}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                <div className='flex flex-col gap-2'>
                  <label className='text-xs font-mono tracking-wider text-neutral-400 uppercase'>
                    Your Name
                  </label>
                  <input
                    type='text'
                    name='name'
                    value={form.name}
                    onChange={handleChange}
                    placeholder='e.g. Alex Morgan'
                    className='bg-white/[0.03] border border-white/[0.08] focus:border-white/30 focus:bg-white/[0.06] rounded-xl px-4 py-3.5 text-white placeholder:text-neutral-600 outline-none text-sm transition-all'
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <label className='text-xs font-mono tracking-wider text-neutral-400 uppercase'>
                    Your Email
                  </label>
                  <input
                    type='email'
                    name='email'
                    value={form.email}
                    onChange={handleChange}
                    placeholder='e.g. alex@example.com'
                    className='bg-white/[0.03] border border-white/[0.08] focus:border-white/30 focus:bg-white/[0.06] rounded-xl px-4 py-3.5 text-white placeholder:text-neutral-600 outline-none text-sm transition-all'
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <label className='text-xs font-mono tracking-wider text-neutral-400 uppercase'>
                    Your Message
                  </label>
                  <textarea
                    rows={5}
                    name='message'
                    value={form.message}
                    onChange={handleChange}
                    placeholder='Tell me about your project or inquiry...'
                    className='bg-white/[0.03] border border-white/[0.08] focus:border-white/30 focus:bg-white/[0.06] rounded-xl px-4 py-3.5 text-white placeholder:text-neutral-600 outline-none text-sm transition-all resize-none'
                  />
                </div>

                <button
                  type='submit'
                  disabled={loading}
                  className='mt-3 px-8 py-3.5 rounded-xl bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-neutral-200 transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.15)] disabled:opacity-50 disabled:cursor-not-allowed self-start'
                >
                  {loading ? 'Transmitting...' : 'Transmit Message \u2192'}
                </button>
              </form>
            </div>

            {/* Direct Email link info */}
            <div className='mt-8 pt-5 border-t border-white/[0.04] flex items-center justify-between text-xs font-mono text-neutral-500'>
              <span>DIRECT CONTACT</span>
              <a
                href='mailto:bettermarry1016@gmail.com'
                className='text-neutral-400 hover:text-white transition-colors'
              >
                bettermarry1016@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Right: 3D Sun Canvas Section */}
        <div className='gsap-reveal flex-1 min-h-[380px] sm:min-h-[480px] xl:min-h-auto relative rounded-3xl overflow-hidden flex items-center justify-center'>
          {/* Subtle frame & Sun info */}
          <div className='absolute top-4 right-4 z-10 font-mono text-[10px] text-neutral-500 tracking-wider pointer-events-none'>
            3D STELLAR SHADER &bull; PERLIN NOISE BLOOM
          </div>
          <div className='w-full h-full min-h-[400px]'>
            <SunCanvas />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SectionWrapper(Contact, 'contact')