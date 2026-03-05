import React, { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float, Decal, Preload, useTexture } from '@react-three/drei'
import CanvasLoader from '../Loader'

const Ball = ({ position, imgUrl, index }) => {
  const [decal] = useTexture([imgUrl])

  return (
    <Float
      speed={2 + (index % 3) * 0.5}
      rotationIntensity={0.8 + (index % 2) * 0.4}
      floatIntensity={1.5 + (index % 3) * 0.3}
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[0, 0, 0.05]} intensity={1} />
      <mesh scale={2.2} position={position}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color='#fff8ef'
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          map={decal}
          rotation={[Math.PI * 2, 0, 0]}
        />
      </mesh>
    </Float>
  )
}

const TechCanvas = ({ icons }) => {
  const containerRef = useRef(null)
  const [frameloop, setFrameloop] = useState('never')
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      ([{ isIntersecting }]) => {
        setFrameloop(isIntersecting ? 'always' : 'never')
      },
      { threshold: 0.1 }
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!containerRef.current) return

    const updateDimensions = () => {
      const width = containerRef.current.offsetWidth
      const height = Math.ceil(icons.length / 4) * 160
      setDimensions({ width, height })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [icons.length])

  const positions = icons.map((_, index) => {
    const col = index % 4
    const row = Math.floor(index / 4)
    return [col * 160 - 240, -(row * 160) + 120, 0]
  })

  return (
    <div
      ref={containerRef}
      className="w-full"
      style={{ height: `${dimensions.height}px` }}
    >
      <Canvas
        frameloop={frameloop}
        dpr={[1, 1.5]}
        orthographic
        camera={{
          position: [0, 0, 500],
          zoom: 1,
          near: 0.1,
          far: 2000,
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <OrbitControls enableZoom={false} enablePan={false} />

        <Suspense fallback={<CanvasLoader />}>
          {icons.map((icon, index) => (
            <Ball
              key={index}
              position={positions[index]}
              imgUrl={icon}
              index={index}
            />
          ))}
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  )
}

export default TechCanvas
