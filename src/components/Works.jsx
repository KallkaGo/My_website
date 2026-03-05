import { Tilt } from 'react-tilt'
import { motion } from 'framer-motion'
import { styles } from '../styles'
import { github, preview } from '../assets'
import SectionWrapper from '../hoc'
import { projects } from '../constants'
import { fadeIn, textVariant } from '../utils/motion'
import { useInteractStore } from '../utils/Store.js'

const ProjectCard = ({ index, name, description, tags, image, source_code_link, type = 'github', active = true }) => {
  const system = useInteractStore((state) => state.system)

  const cardContent = (
    <motion.div
      variants={fadeIn('up', 'spring', index * 0.1, 0.5)}
      className='relative group cursor-pointer h-full'
    >
      {/* Subtle glow effect */}
      <div className='absolute -inset-0.5 bg-gradient-to-br from-purple-600/20 to-pink-600/20
        rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition duration-500'>
      </div>

      {/* Card */}
      <div className='relative bg-[#151525] rounded-2xl p-6 border border-gray-700/50
        hover:border-purple-500/30 transition-all duration-300
        shadow-xl overflow-hidden h-[450px] flex flex-col'>

        {/* Hover background */}
        <div className='absolute inset-0 bg-gradient-to-br from-purple-900/10 to-pink-900/10
          opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl'>
        </div>

        {/* Content */}
        <div className='relative z-10 flex flex-col h-full gap-4'>
          {/* Project Image */}
          <div className='relative w-full h-[200px] overflow-hidden rounded-xl'>
            <img
              src={image}
              alt={name}
              className='w-full h-full object-cover
                group-hover:scale-110 transition-transform duration-500'
            />

            {/* Inactive badge */}
            {!active && (
              <div className='absolute top-3 left-3 bg-red-500/90 backdrop-blur-sm
                px-4 py-1 rounded-full font-bold text-white text-sm
                transform -rotate-12 shadow-lg'>
                END
              </div>
            )}

            {/* Link button - only show if active */}
            {active && (
              <div className='absolute inset-0 flex justify-end items-start m-3'>
                <div
                  onClick={() => window.open(source_code_link, '_blank')}
                  className='w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm
                    flex justify-center items-center cursor-pointer
                    border border-gray-600/50 hover:border-purple-500/50
                    opacity-0 group-hover:opacity-100
                    transform translate-y-2 group-hover:translate-y-0
                    transition-all duration-300
                    hover:bg-purple-600/30'
                >
                  <img
                    src={type === 'github' ? github : preview}
                    alt='link'
                    className='w-1/2 h-1/2 object-contain'
                  />
                </div>
              </div>
            )}
          </div>

          {/* Project Info */}
          <div className='flex-1 flex flex-col'>
            <h3 className='text-white font-bold text-xl line-clamp-1 leading-snug
              group-hover:text-transparent group-hover:bg-clip-text
              group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400
              transition-all duration-300'>
              {name}
            </h3>
            <p className='text-gray-300 text-sm line-clamp-3 mt-2
              group-hover:text-gray-200 transition-colors duration-300'>
              {description}
            </p>
          </div>

          {/* Tags */}
          <div className='flex flex-wrap gap-2 mt-auto pt-3 border-t border-gray-700/50'>
            {tags.map((tag) => (
              <p
                key={tag.name}
                className={`text-xs px-2 py-1 rounded-full
                  ${tag.color} bg-gray-800/50
                  group-hover:bg-gray-700/50 transition-colors duration-300`}
              >
                #{tag.name}
              </p>
            ))}
          </div>

          {/* Decorative dots */}
          <div className='flex gap-1 justify-end'>
            <div className='w-1.5 h-1.5 rounded-full bg-purple-500/40'></div>
            <div className='w-1.5 h-1.5 rounded-full bg-pink-500/40'></div>
            <div className='w-1.5 h-1.5 rounded-full bg-blue-500/40'></div>
          </div>
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className='w-full sm:w-[340px]'>
      {system === 'pc' ? (
        <Tilt options={{ max: 10, scale: 1.02, speed: 500 }}>
          {cardContent}
        </Tilt>
      ) : (
        cardContent
      )}
    </div>
  )
}

const Works = () => {
  return (
    <div className='relative'>
      {/* Background grid pattern */}
      <div className='absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),
        linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] -z-10'>
      </div>

      {/* Header */}
      <motion.div variants={textVariant()} className='mb-8'>
        <p className={`${styles.sectionSubText} text-purple-400`}>My work</p>
        <h2 className={`${styles.sectionHeadText} bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400
          bg-clip-text text-transparent`}>
          Projects.
        </h2>
        <div className='h-1 w-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-4'></div>
      </motion.div>

      {/* Description */}
      <motion.p
        variants={fadeIn('', '', 0.1, 1)}
        className='mt-4 text-gray-300 text-[17px] max-w-3xl leading-[30px]
          bg-gradient-to-br from-[#1a1a2e]/60 to-[#151525]/60
          backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50'
      >
        Showcasing my skills through real-world projects with links to code repositories and live demos.
        Each project reflects my ability to work with different technologies and deliver effective solutions.
      </motion.p>

      {/* Project Cards */}
      <div className='mt-20 flex flex-wrap gap-8 justify-center'>
        {[...projects].reverse().map((project, index) => (
          <ProjectCard key={project.name} index={index} {...project} />
        ))}
      </div>
    </div>
  )
}

export default SectionWrapper(Works, 'work')
