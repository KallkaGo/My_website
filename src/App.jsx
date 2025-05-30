import { BrowserRouter } from "react-router-dom"
import {HomeBgCanvas} from './components/canvas/HomeBg'
import { About, Contact, Hero, Navbar, Tech, Works, StarsCanvas, Target, Effect } from './components'
import LearningNote from "./components/LearningNote"
import { getSystem } from './utils/getSystem'
import { useEffect } from "react"
import { useInteractStore } from "./utils/Store"



const App = () => {

  const flag = getSystem()

  console.log('flag')

  useEffect(() => {
    useInteractStore.setState({ system: flag })
  }, [])

  return (
    <BrowserRouter>
      <div className=" w-full h-screen bg-home-pattern saturate-150  bg-cover pc:bg-full bg-no-repeat bg-center  bg-fixed  flex flex-col justify-center items-center" >
        <HomeBgCanvas />
        <div className="relative mb-[20px] text-[40px] pc:text-[80px]  font-extrabol " >
          <h1 className="glitch" data-text="KALLKA" >KALLKA</h1>
        </div>
        <div className=" info w-1/2  backdrop-blur-sm">
          <div className=" bg-black opacity-50 rounded-[10px] w-full h-full p-[20px] text-[16px] pc:text-[20px]  text-center">
            <p>The true beginning of independence and autonomy starts when one detaches from the brilliance of those they admire.</p>
          </div>
        </div>
      </div>
      <div className="relative z-0 bg-primary">
        <div className=" bg-cover bg-no-repaet bg-center" >
          <Navbar />
          <Hero />
        </div>
        <About />
        {
          flag === 'pc' && <>
            <Tech />
            <Effect />
          </>
        }
        <LearningNote />
        <Works />
        <Target />
        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div>
      </div>
    </BrowserRouter>

  )
}

export default App
