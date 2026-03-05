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
  smoothNormalTool,
  toonWater,
  pen1,
  genshinImpact,
  customEffect,
  grass,
  laser,
  gem
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
    target: 'Unity learning',
    name: 'target-1'
  },
  {
    target: 'fitness every day',
    name: 'target-2'
  },
  {
    target: "Opengl learning",
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
      "WebGL 3D fireworks demo using custom shaders to enhance graphics programming skills.",
    tags: [
      {
        name: "Vue",
        color: "blue-text-gradient",
      },
      {
        name: "Threejs",
        color: "green-text-gradient",
      }
    ],
    image: firework,
    source_code_link: "https://github.com/KallkaGo/FireWork",
  },
  {
    name: "Genius Invokation TCG",
    description:
      "Genshin Impact TCG dice rolling simulator with lock mechanics for strategic gameplay.",
    tags: [
      {
        name: "Vue/Typescript",
        color: "blue-text-gradient",
      },
      {
        name: "Threejs",
        color: "green-text-gradient",
      },
      {
        name: "Cannon-es",
        color: "pink-text-gradient",
      },
    ],
    image: dice,
    source_code_link: "https://github.com/KallkaGo/GeniusInvokationTCG",
  },
  {
    name: "ParticlesEffect",
    description:
      "Interactive point cloud particle system with model switching and dynamic color gradients.",
    tags: [
      {
        name: "React-Three-Fiber",
        color: "blue-text-gradient",
      },
      {
        name: "Threejs",
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
      "AdachiBOT plugin for anime identification through image search.",
    tags: [
      {
        name: "NodeJs",
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
      "Web 3D virtual world featuring six immersive scenes with social and gaming experiences.",
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
      "Interactive 3D art exhibition with automated navigation and roaming capabilities.",
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
    name: 'Su7',
    description:
      "GameMCU Su7 replica with realistic 3D rendering and interactive controls.",
    tags: [
      {
        name: "React-Three-Fiber",
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
      "Interactive WebGL 3D carousel component with smooth animations.",
    tags: [
      {
        name: "React-Three-Fiber",
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
      "Genshin Impact inspired cel shading technique with diffuse reflection.",
    tags: [
      {
        name: "React-Three-Fiber",
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
    name: 'Smooth Normal Tool',
    description:
      "Desktop tool for calculating and optimizing smooth normals of 3D models.",
    tags: [
      {
        name: "Electron",
        color: "pink-text-gradient",
      },
      {
        name: "JavaScript",
        color: "blue-text-gradient",
      },
    ],
    image: smoothNormalTool,
    source_code_link: "https://github.com/KallkaGo/SmoothNormalTool",
  },
  {
    name: 'Toon Water',
    description:
      "Stylized water shader with cartoon-like visual effects for 3D scenes.",
    tags: [
      {
        name: "React-Three-Fiber",
        color: "pink-text-gradient",
      },
      {
        name: "TypeScript",
        color: "blue-text-gradient",
      },
    ],
    image: toonWater,
    source_code_link: "https://github.com/KallkaGo/Stylized-Water",
  },
  {
    name: 'Genshin Impact XR',
    description:
      "WebXR interactive experience based on Genshin Impact gameplay mechanics.",
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
        name: "Threejs",
        color: "orange-text-gradient",
      }
    ],
    image: genshinImpact,
    source_code_link: "https://hoyo.link/1pVkFBAL",
    type: 'preview',
    active: false
  },
  {
    name: 'Custom Effect',
    description:
      "Custom post-processing effects for enhanced visual rendering in 3D scenes.",
    tags: [
      {
        name: "R3F",
        color: "pink-text-gradient",
      },
      {
        name: "TypeScript",
        color: "blue-text-gradient",
      },
      {
        name: "PostProcessing",
        color: "orange-text-gradient",
      }
    ],
    image: customEffect,
    source_code_link: "https://github.com/KallkaGo/CustomEffect",
  },
  {
    name: 'Grass',
    description:
      "Procedural grass rendering system based on GDC 2021 implementation techniques.",
    tags: [
      {
        name: "R3F",
        color: "pink-text-gradient",
      },
      {
        name: "TypeScript",
        color: "blue-text-gradient",
      },
      {
        name: "Procedural Grass",
        color: "orange-text-gradient",
      }
    ],
    image: grass,
    source_code_link: "https://github.com/KallkaGo/Grass",
  },
  {
    name: 'Laser',
    description:
      "WebGL laser material with dynamic glow and beam effects.",
    tags: [
      {
        name: "R3F",
        color: "pink-text-gradient",
      },
      {
        name: "TypeScript",
        color: "blue-text-gradient",
      },
    ],
    image: laser,
    source_code_link: "https://github.com/KallkaGo/Laser",
  },
  {
    name: 'Gem',
    description:
      "WebGL gem material with realistic refraction and light dispersion.",
    tags: [
      {
        name: "R3F",
        color: "pink-text-gradient",
      },
      {
        name: "TypeScript",
        color: "blue-text-gradient",
      },
       {
        name: "Webgl",
        color: "orange-text-gradient",
      }
    ],
    image: gem,
    type: 'preview',
    source_code_link: "https://gem-ochre.vercel.app",
  }
]

export { services, technologies, experiences, learningNote, projects, targets }
