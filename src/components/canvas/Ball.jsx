import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float, Decal, Preload, useTexture } from '@react-three/drei'

import CanvasLoader from '../Loader'

const Ball = (props) => {

  const [decal] = useTexture([props.imgUrl])

  return (
    <Float speed={3} rotationIntensity={1}
      floatIntensity={2}
    >
      <ambientLight intensity={2} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color='#fff8ef'
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        ></meshStandardMaterial>
        <Decal 
        position={[0,0,1]} 
        map={decal}
        rotation={[Math.PI*2,0,0]}
        />
      </mesh>

    </Float>
  )
}

const BallCanvas = ({ icon }) => {
  return (
    <Canvas
      gl={{ preserveDrawingBuffer: true }}
      dpr={[1, 2]}
    >
      <OrbitControls enableZoom={false} />

      <Suspense fallback={<CanvasLoader/>}>
        <Ball imgUrl={icon} />
      </Suspense>
      <Preload all />
    </Canvas>
  )
}

export default BallCanvas