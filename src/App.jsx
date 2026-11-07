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

  // 使用浏览器原生滚动；WebGL 预热完成后再接管站内锚点。
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
