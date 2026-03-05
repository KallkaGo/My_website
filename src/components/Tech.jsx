import SectionWrapper from '../hoc'
import { technologies } from '../constants'
import { motion } from 'framer-motion'

const Tech = () => {
  return (
    <div className='relative w-full h-[800px] md:h-[700px] overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900'>
      {/* 背景网格 */}
      <div className='absolute inset-0 opacity-10'>
        <div className='w-full h-full' style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* 技术图标水印 */}
      <div className='absolute inset-0 flex flex-wrap justify-center items-center gap-12 p-8'>
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className='relative group'
          >
            <motion.div
              className='w-20 h-20 md:w-24 md:h-24 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity duration-300'
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 3 + index * 0.3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 0.2,
              }}
            >
              <img
                src={tech.icon}
                alt={tech.name}
                className={`w-full h-full object-contain ${tech.name === 'Three JS' ? 'brightness-0 invert' : ''}`}
              />
            </motion.div>
            {/* 技术名称标签 - hover时显示 */}
            <div className='absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap'>
              <span className='text-xs text-gray-400 bg-black/80 px-2 py-1 rounded'>
                {tech.name}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 中心标题 */}
      <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='text-center hidden md:block'
        >
          <h2 className='text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600 opacity-50'>
            Tech Stack
          </h2>
        </motion.div>
      </div>
    </div>
  )
}

export default SectionWrapper(Tech, '')
