import { Tilt } from "react-tilt"
import { motion } from 'framer-motion'
import { styles } from "../styles"
import { github } from "../assets"
import { preview } from '../assets'
import SectionWrapper from "../hoc"
import { projects } from "../constants"
import { fadeIn, textVariant } from "../utils/motion"
import { useInteractStore } from "../utils/Store"


const CardInfo = (props) => {

  const { name, description, tags, image, source_code_link, type = 'github', active = true } = props

  return (
    <div className="min-h-[400px]" >
        <div className="relative w-full h-[230px] overflow-hidden ">
      <img src={image} alt={name}
        className="w-full h-full object-cover rounded-2xl flex-1"
      />
      <div className={`absolute flex justify-center items-center h-[40px] w-[140px] top-[25px]  left-[25px]  bg-red-500  -rotate-45 -translate-x-1/2  -translate-y-1/2 font-bold ${active ? 'hidden' : 'visible'}`}>
        <div className="flex justify-center items-center  ">
          END
        </div>
      </div>

      <div
        className="absolute inset-0 flex justify-end m-3 card-img_hover "
      >
        <div onClick={() => window.open(source_code_link, "_blank")}
          className="black-gradient w-10 h-10 rounded-full flex justify-center items-center
              cursor-pointer
              "
        >
          <img src={type === 'github' ? github : preview} alt="github"
            className="w-3/4 h-3/4 object-contain"
          />
        </div>
      </div>
    </div>
    <div
      className="mt-5"
    >
      <h3 className="text-white font-bold text-[24px]" >{name}</h3>
      <p className="mt-2 text-secondary text-[14px] ">{description}</p>
    </div>
    <div className="mt-4 flex flex-wrap gap-2">
      {tags.map((tag) => {
        return (
          <p key={tag.name}
            className={`text-[14px]  ${tag.color}`}
          >
            #{tag.name}
          </p>
        )
      })}
    </div>
    </div>
  )
}


const ProjectCard = ({ project, index }) => {

  const system = useInteractStore((state) => state.system)

  return (
    <>
      <motion.div
        variants={fadeIn('up', 'spring', index * 0.5, 0.75)}
        className="sm:w-[360px] w-full"
      >

        {system === 'pc' ? <Tilt
          options={{
            max: 20,
            scale: 1,
            speed: 450
          }}
          className="bg-tertiary p-5 rounded-2xl "
        >
          <CardInfo {...project} />
        </Tilt> :

          <div className="bg-tertiary p-5 rounded-2xl " >
            <CardInfo {...project} />
          </div>
        }

      </motion.div>

    </>
  )
}



const Works = () => {
  return (
    <>
      <motion.div
        variants={textVariant()}
      >
        <p className={styles.sectionSubText}>My work</p>
        <p className={styles.sectionHeadText}>Projects.</p>
      </motion.div>
      <div className="w-full flex">
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-x-3xl 
        leading-[30px]
        "
        >
          Following projects showcases my skills and experience through real-world examples of my work or my interest.
          Each project is briefly described with links to code repositories and live demos in it.
          It reflects my ability to  work with different technologies, and manage projects effectively.
        </motion.p>
      </div>
      <div className="mt-20 flex flex-wrap gap-7  justify-center items-center">
        {projects.map((project, index) =>
          <ProjectCard key={index} project={project} index={index} />
        )}
      </div>
    </>
  )
}

export default SectionWrapper(Works, 'work')