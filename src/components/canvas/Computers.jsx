import { Suspense, useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Preload, useGLTF } from "@react-three/drei"

import CanvasLoader from '../Loader'


const Computers = ({ isMobile }) => {

  const computer = useGLTF('./desktop_pc/desktop_pc.gltf')

  return <primitive object={computer.scene}
    position={isMobile ? [-1, -5, -1.5] : [0, -5, -1.5]}
    rotation={[-0.01, -0.2, -0.1]}
    scale={isMobile ? 0.6 : 1}
  />

}


const ComputersCanvas = () => {
  const [isMobile, setMobile] = useState(false)
  useEffect(() => {
    /* 创建媒体查询函数 */
    const mediaQuery = window.matchMedia('(max-width:500px)')
    setMobile(mediaQuery.matches)
    const handleMediaqueryChange = (event) => {
      setMobile(event.matches)
    }
    /* 监听宽度的改变 */
    mediaQuery.addEventListener('change', handleMediaqueryChange)

    return () => {
      mediaQuery.removeEventListener('change', handleMediaqueryChange)
    }
  }, [])
  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 45, near: 0.1, far: 1000 }}
      gl={{ preserveDrawingBuffer: true }}
      dpr={[1, 1]}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <hemisphereLight intensity={3} groundColor='black' />
        <pointLight intensity={1} />
        <spotLight position={[-20, 50, 10]}
          angle={0.12}
          penumbra={1}
          intensity={1}
          castShadow
          shadow-mapSize={1024}
        />
        <Computers isMobile={isMobile} />
        <Preload all />
      </Suspense>
    </Canvas>
  )
}

export default ComputersCanvas