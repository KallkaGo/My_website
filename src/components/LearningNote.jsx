import { Tilt } from 'react-tilt'
import { motion } from 'framer-motion'
import { styles } from '../styles'
import SectionWrapper from '../hoc'
import { fadeIn, textVariant } from '../utils/motion'
import { learningNote } from '../constants'
import { useInteractStore } from '../utils/Store.js'

const LearningNoteCard = ({ index, title, description, image, articlelink }) => {
  const system = useInteractStore((state) => state.system)

  const cardContent = (
    <motion.div
      variants={fadeIn('', 'spring', index * 0.1, 0.5)}
      onClick={() => window.open(articlelink)}
      className='relative group cursor-pointer h-full'
    >
      {/* Subtle glow effect */}
      <div className='absolute -inset-0.5 bg-gradient-to-br from-purple-600/20 to-pink-600/20
        rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition duration-500'>
      </div>

      {/* Card */}
      <div className='relative bg-[#151525] rounded-2xl p-6 border border-gray-700/50
        hover:border-purple-500/30 transition-all duration-300
        shadow-xl overflow-hidden h-[280px] flex flex-col'>

        {/* Hover background */}
        <div className='absolute inset-0 bg-gradient-to-br from-purple-900/10 to-pink-900/10
          opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl'>
        </div>

        {/* Content */}
        <div className='relative z-10 flex flex-col justify-between h-full gap-4'>

          {/* Top: Text + Image */}
          <div className='flex flex-col sm:flex-row justify-between items-start gap-4'>
            {/* Text Content */}
            <div className='flex-1 min-w-0'>
              <h3 className='text-white font-bold text-lg line-clamp-2 leading-snug
                group-hover:text-transparent group-hover:bg-clip-text
                group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400
                transition-all duration-300'>
                {title}
              </h3>
              <p className='text-gray-300 text-sm line-clamp-2 mt-2
                group-hover:text-gray-200 transition-colors duration-300'>
                {description}
              </p>
            </div>

            {/* Image */}
            {image && (
              <div className='relative flex-shrink-0'>
                <div className='absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600
                  rounded-xl blur-md opacity-40 group-hover:opacity-60 transition-opacity duration-300'>
                </div>
                <img
                  src={image}
                  alt={title}
                  className='relative w-[140px] h-[90px]
                    object-cover rounded-xl border border-gray-600 group-hover:border-purple-500/50
                    transition-all duration-300 group-hover:scale-105'
                />
              </div>
            )}
          </div>

          {/* Bottom: Read indicator */}
          <div className='flex items-center justify-between mt-auto pt-3 border-t border-gray-700/50'>
            <div className='flex items-center gap-2 opacity-0 group-hover:opacity-100
              transform translate-y-2 group-hover:translate-y-0 transition-all duration-300'>
              <span className='text-purple-400 text-sm font-medium'>
                Read More →
              </span>
            </div>
            {/* Decorative dots */}
            <div className='flex gap-1'>
              <div className='w-1.5 h-1.5 rounded-full bg-purple-500/40'></div>
              <div className='w-1.5 h-1.5 rounded-full bg-pink-500/40'></div>
              <div className='w-1.5 h-1.5 rounded-full bg-blue-500/40'></div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )

  return system === 'pc' ? (
    <Tilt options={{ max: 10, scale: 1.02, speed: 500 }}>
      {cardContent}
    </Tilt>
  ) : (
    cardContent
  )
}

const LearningNote = () => {
  return (
    <div className='relative'>
      {/* Background grid pattern */}
      <div className='absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),
        linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] -z-10'>
      </div>

      <div className='relative z-10'>
        {/* Header Section */}
        <div className={`${styles.padding} mb-8`}>
          <motion.div variants={textVariant()}>
            <p className={`${styles.sectionSubText} text-purple-400`}>My Learning Note</p>
            <h2 className={`${styles.sectionHeadText} bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400
              bg-clip-text text-transparent`}>
              Writings.
            </h2>
            <div className='h-1 w-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-4'>
            </div>
          </motion.div>
        </div>

        {/* Cards Grid */}
        <div className={`${styles.paddingX} pb-14`}>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto'>
            {learningNote.length > 0 && learningNote.map((notes, index) => (
              <LearningNoteCard key={notes.title} index={index} {...notes} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SectionWrapper(LearningNote, 'learningNote')
