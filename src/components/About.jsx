import React from 'react'
import { Tilt } from 'react-tilt'
import { motion } from 'framer-motion'
import { styles } from '../styles'
import { services } from '../constants'
import { fadeIn, textVariant } from '../utils/motion.js'
import SectionWrapper from '../hoc'
import { useInteractStore } from '../utils/Store.js'



const Content = ({ index, title, icon }) => {
  return (
    <div >
      <motion.div
        variants={fadeIn('right', 'spring', 0.5 * index, 1)}
        className='w-full green-pink-gradient p-[1px] rounded-[20px]  shadow-card '
      >
        <div
          options={{
            max: 45,
            scale: 1,
            speed: 450
          }}
          className='bg-tertiary rounded-[20px] 
      py-5 px-12 min-h-[280px] flex
      justify-evenly items-center flex-col
      '
        >
          <img src={icon} alt={title}
            className='w-16 h-16 object-contain'
          />
          <h3 className='text-white text-[20px] font-bold text-center' >{title}</h3>
        </div>
      </motion.div>
    </div>

  )
}


const ServiceCard = (props) => {

  const system = useInteractStore((state) => state.system)

  return (
    <>
      {system === 'pc' ? <Tilt className='xs:w-[250px] w-full' options={{ max: 20 }}  >
        <Content {...props} />
      </Tilt> : <Content {...props} />}
    </>
  )
}


const About = () => {
  return (
    <>
      <motion.div variants={textVariant()} >
        <p className={styles.sectionSubText}>Introduction</p>
        <p className={styles.sectionHeadText}>Overview.</p>
      </motion.div>
      <motion.p variants={fadeIn('', '', 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        I'm a skilled software developer with experience in TypeScript and
        JavaScript, and expertise in frameworks like React, Vue.js, and
        Three.js. I'm a quick learner and collaborate closely with clients to
        create efficient, scalable, and user-friendly solutions that solve
        real-world problems.Also I am a fan of games from MMORPG to FPS, I wish I could be your friend!

      </motion.p>
      <div className='mt-20 flex flex-wrap gap-10 justify-center  '>
        {services.map((service, index) => {
          return (<ServiceCard key={service.title} index={index} {...service} />)
        })}
      </div>
    </>
  )
}

export default SectionWrapper(About, 'about')