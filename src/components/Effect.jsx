import { ParticlesCanvas } from './canvas'
import SectionWrapper from '../hoc'
import { styles } from '../styles'
import { useGsapReveal } from '../utils/useGsapReveal'

const MouseEffect = () => {
  const containerRef = useGsapReveal({ y: 30, stagger: 0.1 })

  return (
    <div ref={containerRef} className='relative w-full'>
      {/* Header */}
      <div className='gsap-reveal mb-8'>
        <p className={styles.sectionSubText}>INTERACTIVE LAB</p>
        <h2 className={`${styles.sectionHeadText} mt-2 text-gradient-white`}>
          Shader Force Field.
        </h2>
        <p className='text-neutral-400 text-sm sm:text-base font-light max-w-xl mt-3'>
          Custom GPU vertex displacement shader with real-time vector field perturbation driven by cursor velocity.
        </p>
      </div>

      {/* Lab Viewport Frame */}
      <div className='gsap-reveal relative w-full h-[480px] sm:h-[580px] md:h-[620px] rounded-3xl overflow-hidden bg-[#060608] border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.8)] group'>
        {/* Subtle HUD Accents */}
        <div className='absolute top-5 left-5 z-10 flex items-center gap-2 pointer-events-none'>
          <span className='w-2 h-2 rounded-full bg-cyan-400 animate-pulse' />
          <span className='font-mono text-[11px] tracking-widest text-neutral-400 uppercase'>
            GPU PARTICLES
          </span>
        </div>

        <div className='absolute top-5 right-5 z-10 hidden sm:flex items-center gap-3 font-mono text-[11px] text-neutral-500 tracking-wider pointer-events-none'>
          <span>RES: 256×256</span>
          <span className='text-neutral-700'>|</span>
          <span>COUNT: 65,536 PTS</span>
        </div>

        {/* Bottom Interaction Hint */}
        <div className='absolute bottom-5 left-1/2 -translate-x-1/2 z-10 pointer-events-none'>
          <div className='px-4 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-[11px] font-mono tracking-wider text-neutral-300 flex items-center gap-2'>
            <span className='text-purple-400'>&bull;</span>
            <span>HOVER &amp; SWIPE CURSOR TO INTERACT</span>
          </div>
        </div>

        {/* WebGL Canvas */}
        <div className='w-full h-full cursor-crosshair'>
          <ParticlesCanvas />
        </div>
      </div>
    </div>
  )
}

export default SectionWrapper(MouseEffect, 'lab')