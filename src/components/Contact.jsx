import { useState } from 'react'
import { motion } from 'framer-motion'
import emailJs from '@emailjs/browser'
import { styles } from '../styles'
import { SunCanvas } from './canvas'
import SectionWrapper from '../hoc'
import { fadeIn, textVariant } from '../utils/motion.js'

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)

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
    const result = validateForm()
    if (result) {
      alert('Please fill in all fields')
      return
    }
    setLoading(true)
    emailJs.send(
      'service_hzorj2i',
      'template_q26i4rg',
      {
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
        message: ''
      })
    }, (err) => {
      setLoading(false)
      console.error(err)
      alert('Something went wrong.')
    })
  }

  const FormField = ({ label, name, type = 'text', placeholder, rows }) => (
    <motion.label
      variants={fadeIn('up', 'spring', 0.1, 0.5)}
      className='flex flex-col relative group'
    >
      <span className='text-white font-medium mb-3 text-sm tracking-wide'>
        {label}
      </span>
      {type === 'textarea' ? (
        <textarea
          rows={rows}
          name={name}
          value={form[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className='bg-[#151525] py-4 px-6
            placeholder:text-gray-500 text-white
            rounded-xl outline-none
            border border-gray-700/50
            focus:border-purple-500/50
            focus:ring-2 focus:ring-purple-500/20
            transition-all duration-300
            resize-none
            font-medium'
        />
      ) : (
        <input
          type={type}
          name={name}
          value={form[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className='bg-[#151525] py-4 px-6
            placeholder:text-gray-500 text-white
            rounded-xl outline-none
            border border-gray-700/50
            focus:border-purple-500/50
            focus:ring-2 focus:ring-purple-500/20
            transition-all duration-300
            font-medium'
        />
      )}
    </motion.label>
  )

  return (
    <div className='relative xl:mt-12'>
      {/* Background grid */}
      <div className='absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),
        linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] -z-10'>
      </div>

      <div className='xl:flex-row flex-col-reverse flex gap-10 overflow-hidden'>
        {/* Form Section */}
        <motion.div
          variants={fadeIn('right', 'spring', 0.2, 1)}
          className='flex-[0.75] relative'
        >
          {/* Subtle glow effect */}
          <div className='absolute -inset-0.5 bg-gradient-to-br from-purple-600/20 to-pink-600/20
            rounded-2xl blur-lg opacity-50'>
          </div>

          {/* Card */}
          <div className='relative bg-gradient-to-br from-[#1a1a2e]/80 to-[#151525]/80
            backdrop-blur-sm rounded-2xl p-8
            border border-gray-700/50
            shadow-2xl'>
            {/* Header */}
            <motion.div variants={textVariant()} className='mb-8'>
              <p className={`${styles.sectionSubText} text-purple-400`}>Get in touch</p>
              <h2 className={`${styles.sectionHeadText} bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400
                bg-clip-text text-transparent`}>
                Contact.
              </h2>
              <div className='h-1 w-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-4'>
              </div>
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit} className='mt-8 flex flex-col gap-6'>
              <FormField
                label='Your Name'
                name='name'
                placeholder="What's your name?"
              />
              <FormField
                label='Your Email'
                name='email'
                type='email'
                placeholder="What's your email?"
              />
              <FormField
                label='Your Message'
                name='message'
                type='textarea'
                rows={7}
                placeholder="What do you want to say?"
              />

              {/* Submit Button */}
              <motion.button
                variants={fadeIn('up', 'spring', 0.4, 0.5)}
                type='submit'
                disabled={loading}
                className='mt-4
                  bg-[#151525]
                  py-4 px-8 outline-none
                  w-fit text-white font-bold
                  border border-purple-500/50
                  rounded-xl
                  hover:bg-purple-500/20
                  hover:border-purple-400
                  hover:shadow-lg hover:shadow-purple-500/20
                  hover:scale-105
                  active:scale-95
                  transition-all duration-300
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  disabled:hover:scale-100
                  disabled:bg-[#151525]'
              >
                {loading ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Canvas Section */}
        <motion.div
          variants={fadeIn('left', 'spring', 0.2, 1)}
          className='xl:flex-1 xl:h-auto
            md:h-[550px]
            h-[350px]'
        >
          <SunCanvas />
        </motion.div>
      </div>
    </div>
  )
}

export default SectionWrapper(Contact, 'contact')