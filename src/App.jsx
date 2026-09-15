import { BrowserRouter } from 'react-router-dom'
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
import { getSystem } from './utils/getSystem'
import { useEffect } from 'react'
import { useInteractStore } from './utils/Store'
import { useSmoothScroll } from './utils/useSmoothScroll'

const App = () => {
  const flag = getSystem()
  const appReady = useInteractStore((s) => s.appReady)

  // Lenis 等 loading 结束后再启动，避免与入场动画争抢主线程
  useSmoothScroll(appReady)

  useEffect(() => {
    useInteractStore.setState({ system: flag })
  }, [flag])

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  )
}

export default App
