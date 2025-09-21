import { Suspense, useMemo, useRef, memo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, RenderCubeTexture } from '@react-three/drei'
import textureVertex from './shader/texture/vertex.glsl'
import textureFragment from './shader/texture/fragment.glsl'
import vertexSun from './shader/sun/vertex.glsl'
import fragmentSun from './shader/sun/fragment.glsl'
import vertexAround from './shader/around/vertex.glsl'
import fragmentAround from './shader/around/fragment.glsl'
import * as THREE from 'three'
import { Bloom, EffectComposer } from '@react-three/postprocessing'

const Sun = () => {

  const sunMatRef = useRef(null)

  const aroundRef = useRef(null)

  const matRef = useRef(null)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPerlin: { value: null },
    }),
    []
  )

  useFrame((state, delta) => {
    delta %= 1
    matRef.current.uniforms.uTime.value += delta
    uniforms.uTime.value += delta
    aroundRef.current && aroundRef.current.lookAt(state.camera.position)
  })

  return (
    <>
      <mesh scale={1.5}>
        <sphereGeometry args={[1, 32, 32]} />
        <shaderMaterial
          ref={sunMatRef}
          vertexShader={vertexSun}
          fragmentShader={fragmentSun}
          uniforms={uniforms}
        >
          <RenderCubeTexture
            attach={"uniforms-uPerlin-value"}
            resolution={256}
            type={THREE.UnsignedByteType}
          >
            <cubeCamera position={[0, 0, 5]} ></cubeCamera>
            <mesh scale={2}>
              <sphereGeometry args={[1, 32, 32]} />
              <shaderMaterial
                ref={matRef}
                side={THREE.DoubleSide}
                vertexShader={textureVertex}
                fragmentShader={textureFragment}
                uniforms={{
                  uTime: { value: 0 },
                }}
              />
            </mesh>
          </RenderCubeTexture>
        </shaderMaterial>
      </mesh>
      <mesh ref={aroundRef} scale={1.5}>
        <sphereGeometry args={[1.05, 32, 32]} />
        <shaderMaterial
          side={THREE.BackSide}
          vertexShader={vertexAround}
          fragmentShader={fragmentAround}
        />
      </mesh>

      <mesh visible={false} >
        <boxGeometry></boxGeometry>
        <meshBasicMaterial></meshBasicMaterial>
      </mesh>

      <EffectComposer
        disableNormalPass
      >
        <Bloom
          intensity={1}
          luminanceThreshold={0.6}
          mipmapBlur
          radius={0.5}
        />
      </EffectComposer>
    </>
  )
}




const SunCanvas = ({ frameLoop }) => {
  const canvasRef = useRef()
  const [frameloop, setFrameloop] = useState('never')

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
      camera={{
        fov: 45,
        near: 0.1,
        far: 100,
        position: [-4, 3, 7]
      }}
      gl={{ toneMapping: THREE.NoToneMapping }}
      dpr={[1, 1.5]}
    >
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.5}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.1}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
      <Suspense fallback={null}>
        <Sun />
      </Suspense>
    </Canvas>
  )
}

export default SunCanvas