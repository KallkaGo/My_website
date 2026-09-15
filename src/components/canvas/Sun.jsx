import { Suspense, useMemo, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import textureVertex from './shader/texture/vertex.glsl'
import textureFragment from './shader/texture/fragment.glsl'
import vertexSun from './shader/sun/vertex.glsl'
import fragmentSun from './shader/sun/fragment.glsl'
import vertexAround from './shader/around/vertex.glsl'
import fragmentAround from './shader/around/fragment.glsl'
import * as THREE from 'three'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { markModuleReady } from '../../utils/Store'

const Sun = () => {
  const sunMatRef = useRef(null)

  useEffect(() => markModuleReady('sun'), [])
  const aroundRef = useRef(null)

  const { cubeRenderTarget, cubeCamera, noiseScene, noiseMaterial } = useMemo(() => {
    const target = new THREE.WebGLCubeRenderTarget(256, {
      colorSpace: THREE.SRGBColorSpace,
      generateMipmaps: true,
      minFilter: THREE.LinearMipmapLinearFilter,
      magFilter: THREE.LinearFilter,
    })
    const cam = new THREE.CubeCamera(0.1, 10, target)
    const scn = new THREE.Scene()
    const geo = new THREE.SphereGeometry(1, 32, 32)
    const mat = new THREE.ShaderMaterial({
      vertexShader: textureVertex,
      fragmentShader: textureFragment,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
      },
    })
    const mesh = new THREE.Mesh(geo, mat)
    scn.add(mesh)
    return {
      cubeRenderTarget: target,
      cubeCamera: cam,
      noiseScene: scn,
      noiseMaterial: mat,
    }
  }, [])

  useEffect(() => {
    return () => {
      cubeRenderTarget.dispose()
      noiseMaterial.dispose()
    }
  }, [cubeRenderTarget, noiseMaterial])

  const sunUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPerlin: { value: cubeRenderTarget.texture },
    }),
    [cubeRenderTarget]
  )

  useFrame((state, delta) => {
    const d = delta % 1
    cubeCamera.update(state.gl, noiseScene)
    noiseMaterial.uniforms.uTime.value += d
    if (sunMatRef.current) {
      sunMatRef.current.uniforms.uTime.value += d
      sunMatRef.current.uniforms.uPerlin.value = cubeRenderTarget.texture
    }
    if (aroundRef.current) {
      aroundRef.current.lookAt(state.camera.position)
    }
  })

  return (
    <>
      <mesh scale={1.5}>
        <sphereGeometry args={[1, 32, 32]} />
        <shaderMaterial
          ref={sunMatRef}
          vertexShader={vertexSun}
          fragmentShader={fragmentSun}
          uniforms={sunUniforms}
        />
      </mesh>
      <mesh ref={aroundRef} scale={1.5}>
        <sphereGeometry args={[1.05, 32, 32]} />
        <shaderMaterial
          side={THREE.BackSide}
          vertexShader={vertexAround}
          fragmentShader={fragmentAround}
        />
      </mesh>

      <EffectComposer disableNormalPass>
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

const SunCanvas = () => {
  const canvasRef = useRef(null)
  const [frameloop, setFrameloop] = useState('never')

  useEffect(() => {
    const el = canvasRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      setFrameloop(entry.isIntersecting ? 'always' : 'never')
    }, {})

    observer.observe(el)
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
        position: [-4, 3, 7],
      }}
      style={{
        pointerEvents: 'none',
      }}
      gl={{ toneMapping: THREE.NoToneMapping }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <Sun />
      </Suspense>
    </Canvas>
  )
}

export default SunCanvas