import { ParticlesCanvas } from './canvas'
import SectionWrapper from '../hoc'


const MouseEffect = () => {
  

  return (

    <>
      <div className='w-full h-[605px] '>
        <ParticlesCanvas />
      </div>
    </>

  )
}

export default SectionWrapper(MouseEffect, '')