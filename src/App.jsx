import {
  About,
  Contact,
  Hero,
  Navbar,
  Tech,
  Works,
  Target,
  Effect,
  LearningNote,
  AppLoader,
  Footer,
} from './components'
import { useInteractStore } from './utils/Store'
import { useSmoothScroll } from './utils/useSmoothScroll'
import BokehEntry from './components/BokehEntry'

const App = () => {
  const appReady = useInteractStore((s) => s.appReady)

  // WebGL 预热完成后启用 Lenis，避免初始化占用滚动帧。
  useSmoothScroll(appReady)

  return (
    <>
      <AppLoader />
      <div className='notebook-app'>
        <Navbar />
        <main id='main' className='notebook-camera' tabIndex={-1}>
          <BokehEntry />
          <div className='notebook-pages'>
            <Hero />
            <Works />
            <LearningNote />
            <Effect />
            <About />
            <Tech />
            <Target />
            <Contact />
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
