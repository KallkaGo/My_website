import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float, Decal, Preload, useTexture } from '@react-three/drei'
import { useEffect,useState,useRef } from 'react'
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

   const [frameloop, setFrameloop] = useState('never')

   const canvasRef = useRef(null)

    useEffect(() => {
      const observer = new IntersectionObserver(([{ isIntersecting }]) => {
        setFrameloop(isIntersecting ? 'always' : 'never')
      }, {})
  
      observer.observe(canvasRef.current)
      return () => observer.disconnect()
    }, [])

  return (
    <Canvas
      ref={canvasRef}
      frameloop={frameloop}
      dpr={[1, 2]}
    >
      <OrbitControls enableZoom={false} enablePan={false} />

      <Suspense fallback={<CanvasLoader/>}>
        <Ball imgUrl={icon} />
      </Suspense>
      <Preload all />
    </Canvas>
  )
}

export default BallCanvas