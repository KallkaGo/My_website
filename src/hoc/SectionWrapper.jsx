import { motion } from 'framer-motion'
import { styles } from '../styles'
import { staggerContainer } from '../utils/motion'
import { getSystem } from '../utils/getSystem'
import { useState } from 'react'

const SectionWrapper = (Component, idName) =>
  function HighOrderComponent () {

    const [isPC] = useState(() => getSystem() === 'pc')

    return (
      <motion.section
        variants={staggerContainer()}
        initial='hidden'
        whileInView={'show'}
        viewport={{ once: true, amount: isPC ? 0.1 : 'some' }}
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
      >
        <span className='hash-span' id={idName}>
          &nbsp;
        </span>
        <Component />
      </motion.section>
    )
  }



export default SectionWrapper