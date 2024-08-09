import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import emailJs from '@emailjs/browser'

import { styles } from '../styles'
import { SunCanvas } from './canvas'
import SectionWrapper from '../hoc'
import { slideIn } from '../utils/motion'

const Contact = () => {
  const fromRef = useRef()
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)

  const [frameLoop, setframeLoop] = useState('never')

  const handleChange = (e) => {
    const { name, value } = e.target

    setForm({ ...form, [name]: value })
  }

  const validateEform = () => {
    const nameInput = form.name.trim()
    const emailInput = form.email.trim()
    const messageInput = form.message.trim()
    return (!nameInput || !emailInput || !messageInput)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(!form.name, !form.email, !form.message)
    const result = validateEform()
    if (result) {
      alert('Please fill in all fields')
      return
    }
    setLoading(true)
    emailJs.send('service_hzorj2i', 'template_q26i4rg', {
      from_name: form.name,
      to_name: 'Kallka',
      from_email: form.email,
      to_mail: 'bettermarry1016@gmail.com',
      message: form.message
    },
      'shVZm0O5U1s-sguCF'
    ).then(() => {
      setLoading(false)
      alert('Thank you. I will get back to you as soon as possible')
      setForm({
        name: '',
        email: '',
        message: ' '
      })
    }, (err) => {
      setLoading(false)
      console.error(err)

      alert('Something went wrong.')
    })
  }
  return (
    <div className='xl:mt-12 xl:flex-row flex-col-reverse flex gap-10
   overflow-hidden
   '>
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8
    rounded-2xl
    '
      >
        <p className={styles.sectionSubText} >Get in touch</p>
        <h3 className={styles.heroHeadText} >Contact.</h3>
        <form ref={fromRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
        >
          <label className='flex flex-col '>
            <span className='text-white 
            font-medium mb-4' >Your Name</span>
            <input type="text" name='name' value={form.name}
              onChange={handleChange}
              placeholder="What's your name"
              className='bg-tertiary py-4 px-6
            placeholder:text-secondary text-white 
            rounded-lg outlined-none border-none 
            font-medium
            '
            />
          </label>
          <label className='flex flex-col '>
            <span className='text-white 
            font-medium mb-4' >Your Email</span>
            <input type="text" name='email' value={form.email}
              onChange={handleChange}
              placeholder="What's your email"
              className='bg-tertiary py-4 px-6
            placeholder:text-secondary text-white 
            rounded-lg outlined-none border-none 
            font-medium
            '
            />
          </label>
          <label className='flex flex-col '>
            <span className='text-white 
            font-medium mb-4' >Your Message</span>
            <textarea rows={7}
              type="text"
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder="What do you want to say"
              className='bg-tertiary py-4 px-6
            placeholder:text-secondary text-white 
            rounded-lg outlined-none border-none 
            font-medium
            '
            />
          </label>
          <button
            type='submit'
            className='bg-tertiary py-3 px-8 
          outline-none
          w-fit
          text-white
          font-blod
          shadow-md
          shadow-primary 
          rounded-xl
          '
          >
            {loading ? 'Sending...' : 'Send'}
          </button>

        </form>
      </motion.div>
      <motion.div
        variants={slideIn('right', 'tween', 0.2, 1)}
        className='xl:flex-1 xl:h-auto
      md:h-[550px]
      h-[350px]
      '
        onAnimationEnd={() => setframeLoop('always')}
      >
        <SunCanvas frameLoop={frameLoop} />
      </motion.div>
    </div>
  )
}

export default SectionWrapper(Contact, 'contact')