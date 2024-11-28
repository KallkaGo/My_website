import { motion } from 'framer-motion'
import { styles } from '../styles'
import SectionWrapper from '../hoc'
import { fadeIn, textVariant } from '../utils/motion'
import { learningNote } from '../constants'

const LearningNoteCard = ({ index, title, description, image, articlelink }) => {
  return (
    <>
      <motion.div
        variants={fadeIn('', 'spring', index * 0.5, 0.75)}
        className='bg-black-200 p-[1px] rounded-3xl xs:w-full 
      w-full cursor-pointer green-pink-gradient
      '
        onClick={() => window.open(articlelink)}
      >
        <div className='bg-tertiary rounded-3xl p-[20px] flex justify-between  items-center h-[148px]' >
          <p className='text-white font-bold xs:text-[36px] text-[16px] xs:line-clamp-2 text-ellipsis xs:basis-[80%] flex-1 xs:break-words break-all '>
            {title}-{description}
          </p>
          <img src={image}
            className='w-[110px] h-[74px] rounded-[5px] object-fill ml-[20px] xs:block hidden'
          />
        </div>


      </motion.div>
    </>
  )
}


const LearningNote = () => {
  return (
    <div className='mt-12 bg-black-100 rounded-[20px] '>
      <div className={`${styles.padding} 
    bg-tertiary rounded-2xl 
    `}>
        <motion.div
          variants={textVariant()}
        >
          <p className={styles.sectionSubText}>My Learning Note</p>
          <h2 className={styles.sectionHeadText} >Writings.</h2>
        </motion.div>
      </div>
      <div
        className={`${styles.paddingX} mt-10 pb-14 flex flex-wrap flex-col  justify-center items-center gap-7 `}
      >
        {learningNote.length > 0 && learningNote.map((notes, index) => {
          return (
            <LearningNoteCard key={notes.title} index={index} {...notes} />
          )
        })}
      </div>
    </div>
  )
}

export default SectionWrapper(LearningNote, 'learningNote')