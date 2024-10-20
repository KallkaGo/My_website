import { BallCanvas } from './canvas'
import SectionWrapper from '../hoc'
import { technologies } from '../constants'
import { getSystem } from '../utils/getSystem'

const Tech = () => {
  const flag = getSystem() === 'pc'

  return (

    <>
      <div className='flex flex-row flex-wrap justify-center gap-10'>
        {technologies.map((technologie, index) => {
          return (

            <div className='w-29 h-28 ' key={index}>
              <BallCanvas icon={technologie.icon} />
            </div>

          )
        })}
      </div>
    </>

  )
}

export default SectionWrapper(Tech, '')