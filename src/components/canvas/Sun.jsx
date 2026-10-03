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

const Sun = ({ onWarmup }) => {
  const sunMatRef = useRef(null)
  const warmedUpRef = useRef(false)
  const warmupFrameRef = useRef(null)
  const noiseElapsedRef = useRef(1 / 20)
  const aroundRef = useRef(null)

  const { cubeRenderTarget, cubeCamera, noiseScene, noiseMaterial, noiseGeometry } = useMemo(() => {
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
      noiseGeometry: geo,
    }
  }, [])

  useEffect(() => {
    return () => {
      if (warmupFrameRef.current !== null) cancelAnimationFrame(warmupFrameRef.current)
      cubeRenderTarget.dispose()
      noiseMaterial.dispose()
      noiseGeometry.dispose()
    }
  }, [cubeRenderTarget, noiseMaterial, noiseGeometry])

  const sunUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPerlin: { value: cubeRenderTarget.texture },
    }),
    [cubeRenderTarget]
  )

  useFrame((state, delta) => {
    const d = delta % 1
    noiseMaterial.uniforms.uTime.value += d
    // 噪声变化较慢；只限立方纹理更新频率，太阳旋转和 Bloom 仍逐帧绘制。
    noiseElapsedRef.current += d
    if (noiseElapsedRef.current >= 1 / 20) {
      cubeCamera.update(state.gl, noiseScene)
      noiseElapsedRef.current %= 1 / 20
    }
    if (sunMatRef.current) {
      sunMatRef.current.uniforms.uTime.value += d
      sunMatRef.current.uniforms.uPerlin.value = cubeRenderTarget.texture
    }
    if (aroundRef.current) {
      aroundRef.current.lookAt(state.camera.position)
    }

    if (!warmedUpRef.current) {
      warmedUpRef.current = true
      // 下一次 rAF 才报告就绪，确保本帧的太阳和 Bloom 绘制指令已提交。
      warmupFrameRef.current = requestAnimationFrame(() => {
        warmupFrameRef.current = null
        markModuleReady('sun')
        if (onWarmup) onWarmup()
      })
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

      <EffectComposer disableNormalPass multisampling={0} frameBufferType={THREE.HalfFloatType} >
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
  const isIntersectingRef = useRef(false)
  const warmedUpRef = useRef(false)
  // 预热期间保持 'always'，即使初次观察结果为不在视口内也先绘制首帧。
  const [frameloop, setFrameloop] = useState('always')

  const handleWarmup = () => {
    warmedUpRef.current = true
    // 首帧指令提交后，若不在视口内则挂起渲染循环。
    if (!isIntersectingRef.current) {
      setFrameloop('never')
    }
  }

  useEffect(() => {
    const el = canvasRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      isIntersectingRef.current = entry.isIntersecting
      if (warmedUpRef.current) {
        setFrameloop(entry.isIntersecting ? 'always' : 'never')
      }
    }, {})

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Canvas
      ref={canvasRef}
      frameloop={frameloop}
      resize={{ scroll: false }}
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
        <Sun onWarmup={handleWarmup} />
      </Suspense>
    </Canvas>
  )
}

export default SunCanvas
