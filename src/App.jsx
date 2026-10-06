import {
  About,
  Contact,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
  Target,
  Effect,
  LearningNote,
  AppLoader,
  Footer,
} from './components'
import { useInteractStore } from './utils/Store'
import { useSmoothScroll } from './utils/useSmoothScroll'

const App = () => {
  const appReady = useInteractStore((s) => s.appReady)

  // WebGL 预热完成后启用 Lenis，避免初始化占用滚动帧。
  useSmoothScroll(appReady)

  return (
    <>
      <AppLoader />
      <div className='relative z-0 bg-[#08080a] text-[#f5f5f7] min-h-screen overflow-x-hidden selection:bg-purple-500/30 selection:text-white'>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Tech />
          <Effect />
          <Works />
          <LearningNote />
          <Target />
          <div className='relative z-0'>
            <Contact />
            <StarsCanvas />
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
