import { BrowserRouter } from "react-router-dom"

import { About, Contact, Hero, Navbar, Tech, Works, StarsCanvas, Target, Feedbacks, Effect } from './components'
import LearningNote from "./components/LearningNote"
import { getSystem } from './utils/getSystem'


const App = () => {
  const flag = getSystem() === 'pc'

  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div className=" bg-cover bg-no-repaet bg-center" >
          <Navbar />
          <Hero />
        </div>
        <About />
        {
          flag && <>
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
