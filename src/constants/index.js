import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  git,
  figma,
  tracemoe,
  primogem,
  firework,
  dice,
  particles,
  threejs,
  meoCloud,
  aigc,
  su7,
  carousel,
  celShading,
  pen1,
  genshinImpact
} from "../assets"

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
]

const services = [
  {
    title: "Vue Developer",
    icon: web,
  },
  {
    title: "React Developer",
    icon: mobile,
  },
  {
    title: "3D Lovers",
    icon: backend,
  },
  {
    title: "Games and sports enthusiasts",
    icon: creator,
  },
]

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  }
]

const experiences = [
  {
    title: "Front end Web Developer",
    company_name: "Unknown",
    icon: primogem,
    iconBg: "#E6DEDD",
    date: "Oct 2021 - Present",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
]

const targets = [
  {
    target: 'I want to read and learn GLSL Shader Language book to improve myself',
    name: 'target-1'
  },
  {
    target: 'fitness every day',
    name: 'target-2'
  },
  {
    target: "Develop projects with partners",
    name: 'target-3'
  }
]

const learningNote = [
  {
    title: "Cel Shading in Threejs Part2",
    description: "highlight and face shadows",
    image: pen1,
    articlelink: "https://juejin.cn/post/7384629198130151463"
  },
  {
    title: "Cel Shading in Threejs Part1",
    description: "model processing and add diffuse reflection",
    image: pen1,
    articlelink: "https://juejin.cn/post/7384274075231256614"
  },

]

const projects = [
  {
    name: "FireWork",
    description:
      "Webgl-3D-FireWork,through shader learn , in order to improve one's shader skill demo,may be have some bug, if you find ,please submit issue for me. Thanks! ",
    tags: [
      {
        name: "vue",
        color: "blue-text-gradient",
      },
      {
        name: "threejs",
        color: "green-text-gradient",
      },
      {
        name: "GLSL",
        color: "pink-text-gradient",
      },
    ],
    image: firework,
    source_code_link: "https://github.com/KallkaGo/FireWork",
  },
  {
    name: "Genius Invokation TCG",
    description:
      "Reproduction events of Genshin Impact 'Genius Invokation TCG',you have two chance to throw dice, you can lock result you want, next time will throw dice without locked result.  ",
    tags: [
      {
        name: "vue3/typescript",
        color: "blue-text-gradient",
      },
      {
        name: "threejs",
        color: "green-text-gradient",
      },
      {
        name: "cannon-es",
        color: "pink-text-gradient",
      },
    ],
    image: dice,
    source_code_link: "https://github.com/KallkaGo/GeniusInvokationTCG",
  },
  {
    name: "ParticlesEffect",
    description:
      "Practice with point cloud particle effects, switch between point cloud models by mouse wheel, also do the gradient of particle colour, switch between model gradients.",
    tags: [
      {
        name: "R3F/React-three/drei",
        color: "blue-text-gradient",
      },
      {
        name: "threejs",
        color: "green-text-gradient",
      },
      {
        name: "Typescript",
        color: "pink-text-gradient",
      },
    ],
    image: particles,
    source_code_link: "https://github.com/KallkaGo/ParticlesEffect",
  },
  {
    name: "ACG-SEARCH",
    description:
      "AdachiBOT Plugin which search animation name by  picture  ",
    tags: [
      {
        name: "TraceMoe",
        color: "green-text-gradient",
      },
      {
        name: "Typescript",
        color: "pink-text-gradient",
      },
    ],
    image: tracemoe,
    source_code_link: "https://github.com/KallkaGo/acg_search",
  },
  {
    name: 'MEO.CLOUD',
    description:
      "Web 3D virtual world, six scenes, includ challenges , chat, relax ",
    tags: [
      {
        name: "Threejs",
        color: "pink-text-gradient",
      },
      {
        name: "GSAP",
        color: "green-text-gradient",
      },
      {
        name: "JQuery",
        color: "orange-text-gradient",
      },
      {
        name: "TypeScript",
        color: "blue-text-gradient",
      },
    ],
    image: meoCloud,
    source_code_link: "https://meo.meo.plus",
    type: 'preview'
  },
  {
    name: 'NanXiang-AIGC',
    description:
      "3D art exhibition, roaming + clicking the button to automatically go ",
    tags: [
      {
        name: "Threejs",
        color: "pink-text-gradient",
      },
      {
        name: "TypeScript",
        color: "blue-text-gradient",
      },
    ],
    image: aigc,
    source_code_link: "https://meo.meo.plus/aigc",
    type: 'preview'
  },
  {
    name: 'su7',
    description:
      "GameMCU Su7 Replica",
    tags: [
      {
        name: "react-three-fiber",
        color: "pink-text-gradient",
      },
      {
        name: "TypeScript",
        color: "blue-text-gradient",
      },
    ],
    image: su7,
    source_code_link: "https://github.com/KallkaGo/su7-demo",
  },
  {
    name: '3D-Carousel',
    description:
      "Webgl 3d Carousel",
    tags: [
      {
        name: "react-three-fiber",
        color: "pink-text-gradient",
      },
      {
        name: "TypeScript",
        color: "blue-text-gradient",
      },
    ],
    image: carousel,
    source_code_link: "https://github.com/KallkaGo/3D-Carousel",
  },
  {
    name: 'Cel Shading',
    description:
      "Genshin Impact Cel Shading",
    tags: [
      {
        name: "react-three-fiber",
        color: "pink-text-gradient",
      },
      {
        name: "TypeScript",
        color: "blue-text-gradient",
      },
    ],
    image: celShading,
    source_code_link: "https://github.com/KallkaGo/ToonShading",
  },
  {
    name: 'Genshin Impact XR',
    description:
      "Genshin Impact XR Interactive h5",
    tags: [
      {
        name: "WebXR",
        color: "pink-text-gradient",
      },
      {
        name: "TypeScript",
        color: "blue-text-gradient",
      },
      {
        name: "threejs",
        color: "orange-text-gradient",
      }
    ],
    image: genshinImpact,
    source_code_link: "https://hoyo.link/1pVkFBAL",
    type: 'preview'
  }
]

export { services, technologies, experiences, learningNote, projects, targets }
