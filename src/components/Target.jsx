import { Tilt } from 'react-tilt'
import { motion } from 'framer-motion'
import { styles } from '../styles'
import { targets } from '../constants'
import { fadeIn, textVariant } from '../utils/motion.js'
import SectionWrapper from '../hoc'
import { useInteractStore } from '../utils/Store.js'

// Custom Icons for each target
const targetIcons = {
  'Unity learning': (
    <svg viewBox='0 0 100 100' className='w-16 h-16'>
      <defs>
        <linearGradient id='unityGrad' x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' stopColor='#f97316' stopOpacity='1' />
          <stop offset='100%' stopColor='#dc2626' stopOpacity='1' />
        </linearGradient>
      </defs>
      {/* Unity 3D Cube */}
      <polygon points='50,15 85,32 85,68 50,85 15,68 15,32' fill='none' stroke='url(#unityGrad)' strokeWidth='3' />
      <polygon points='50,15 50,50 85,32' fill='url(#unityGrad)' opacity='0.4' />
      <polygon points='50,50 85,68 50,85 15,68' fill='url(#unityGrad)' opacity='0.2' />
      <line x1='50' y1='15' x2='50' y2='85' stroke='url(#unityGrad)' strokeWidth='1' opacity='0.5' />
      <line x1='15' y1='32' x2='85' y2='32' stroke='url(#unityGrad)' strokeWidth='1' opacity='0.5' />
      <line x1='15' y1='68' x2='85' y2='68' stroke='url(#unityGrad)' strokeWidth='1' opacity='0.5' />
      <circle cx='50' cy='50' r='45' fill='none' stroke='url(#unityGrad)' strokeWidth='1' opacity='0.2' />
    </svg>
  ),
  'fitness every day': (
    <svg viewBox='0 0 100 100' className='w-16 h-16'>
      <defs>
        <linearGradient id='fitnessGrad' x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' stopColor='#22c55e' stopOpacity='1' />
          <stop offset='100%' stopColor='#16a34a' stopOpacity='1' />
        </linearGradient>
      </defs>
      {/* Dumbbell */}
      <rect x='25' y='42' width='50' height='6' rx='3' fill='url(#fitnessGrad)' />
      <rect x='18' y='35' width='12' height='20' rx='3' fill='url(#fitnessGrad)' opacity='0.8' />
      <rect x='70' y='35' width='12' height='20' rx='3' fill='url(#fitnessGrad)' opacity='0.8' />
      {/* Heart rate line */}
      <polyline points='20,60 35,60 42,50 48,70 55,60 80,60' fill='none' stroke='url(#fitnessGrad)' strokeWidth='2' opacity='0.6' />
      <circle cx='50' cy='50' r='45' fill='none' stroke='url(#fitnessGrad)' strokeWidth='1' opacity='0.2' />
    </svg>
  ),
  'Opengl learning': (
    <svg viewBox='0 0 100 100' className='w-16 h-16'>
      <defs>
        <linearGradient id='openglGrad' x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' stopColor='#3b82f6' stopOpacity='1' />
          <stop offset='100%' stopColor='#8b5cf6' stopOpacity='1' />
        </linearGradient>
      </defs>
      {/* Triangle mesh */}
      <polygon points='50,20 80,70 20,70' fill='none' stroke='url(#openglGrad)' strokeWidth='2.5' />
      <polygon points='50,20 50,70 20,70' fill='url(#openglGrad)' opacity='0.2' />
      <polygon points='80,30 95,50 80,70' fill='none' stroke='url(#openglGrad)' strokeWidth='1.5' opacity='0.6' />
      <polygon points='20,30 5,50 20,70' fill='none' stroke='url(#openglGrad)' strokeWidth='1.5' opacity='0.6' />
      {/* Vertices dots */}
      <circle cx='50' cy='20' r='3' fill='url(#openglGrad)' />
      <circle cx='80' cy='70' r='3' fill='url(#openglGrad)' />
      <circle cx='20' cy='70' r='3' fill='url(#openglGrad)' />
      <circle cx='50' cy='50' r='45' fill='none' stroke='url(#openglGrad)' strokeWidth='1' opacity='0.2' />
    </svg>
  ),
}

const TargetCard = ({ index, target, name }) => {
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
      <div className='relative bg-[#151525] rounded-2xl p-8 border border-gray-700/50
        hover:border-purple-500/30 transition-all duration-300
        shadow-xl overflow-hidden h-[280px] flex flex-col items-center justify-center'>
        {/* Hover background */}
        <div className='absolute inset-0 bg-gradient-to-br from-purple-900/10 to-pink-900/10
          opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
        </div>

        {/* Content */}
        <div className='relative z-10 flex flex-col items-center justify-center gap-6'>
          {/* Icon */}
          <div className='relative'>
            <div className='absolute inset-0 bg-purple-500/20 blur-xl rounded-full
              opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
            </div>
            <div className='relative group-hover:scale-110 transition-transform duration-300'>
              {targetIcons[target] || (
                <svg viewBox='0 0 100 100' className='w-16 h-16'>
                  <defs>
                    <linearGradient id={`targetGrad${index}`} x1='0%' y1='0%' x2='100%' y2='100%'>
                      <stop offset='0%' stopColor='#a855f7' stopOpacity='1' />
                      <stop offset='100%' stopColor='#3b82f6' stopOpacity='1' />
                    </linearGradient>
                  </defs>
                  <circle cx='50' cy='50' r='35' fill='none' stroke={`url(#targetGrad${index})`} strokeWidth='2' opacity='0.7' />
                  <circle cx='50' cy='50' r='25' fill='none' stroke={`url(#targetGrad${index})`} strokeWidth='2' opacity='0.5' />
                  <circle cx='50' cy='50' r='15' fill='none' stroke={`url(#targetGrad${index})`} strokeWidth='2' opacity='0.3' />
                  <circle cx='50' cy='50' r='5' fill={`url(#targetGrad${index})`} />
                </svg>
              )}
            </div>
          </div>

          <h3 className='text-white text-xl font-bold text-center
            group-hover:text-transparent group-hover:bg-clip-text
            group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400
            transition-all duration-300'>
            {target}
          </h3>
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className='w-[250px]'>
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

const Target = () => {
  return (
    <div className='relative'>
      {/* Background grid */}
      <div className='absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),
        linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] -z-10'>
      </div>

      {/* Header */}
      <motion.div variants={textVariant()} className='mb-8'>
        <p className={`${styles.sectionSubText} text-purple-400`}>My plan for this year</p>
        <h2 className={`${styles.sectionHeadText} bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400
          bg-clip-text text-transparent`}>
          Target.
        </h2>
        <div className='h-1 w-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-4'>
            </div>
      </motion.div>

      {/* Target Cards */}
      <div className='mt-20 flex flex-wrap gap-8 justify-center'>
        {targets.length > 0 && targets.map((target, index) => (
          <TargetCard key={target.name} index={index} {...target} />
        ))}
      </div>
    </div>
  )
}

export default SectionWrapper(Target, 'target')