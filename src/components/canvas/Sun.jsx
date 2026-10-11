// @refresh reset
// 热更新时重建 GPU 资源，避免沿用已被清理的立方纹理而丢失表面动画。
import { Suspense, useMemo, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import textureVertex from './shader/texture/vertex.glsl'
import textureFragment from './shader/texture/fragment.glsl'
import vertexSun from './shader/sun/vertex.glsl'
import fragmentSun from './shader/sun/fragment.glsl'
import vertexAround from './shader/around/vertex.glsl'
import fragmentAround from './shader/around/fragment.glsl'
import coronaVertex from './shader/corona/vertex.glsl'
import coronaFragment from './shader/corona/fragment.glsl'
import { createSolarRibbons } from './solarRibbons'
import * as THREE from 'three'
import { markModuleReady } from '../../utils/Store'

const Sun = ({ onWarmup }) => {
  const groupRef = useRef(null)
  const warmedUpRef = useRef(false)
  const warmupFrameRef = useRef(null)
  const noiseReadyRef = useRef(false)
  const aroundRef = useRef(null)
  const animationStartRef = useRef(null)
  const timeUniform = useMemo(() => ({ value: 0 }), [])
  const ribbons = useMemo(() => ({
    loops: createSolarRibbons('loops', 2047, 16),
    rays: createSolarRibbons('rays', 4095, 8),
  }), [])
  const loopUniforms = useMemo(() => ({
    uTime: timeUniform,
    uKind: { value: 0 },
    uWidth: { value: .005 },
    uOpacity: { value: .2 },
    uAlpha: { value: .65 },
  }), [timeUniform])
  const rayUniforms = useMemo(() => ({
    uTime: timeUniform,
    uKind: { value: 1 },
    uWidth: { value: .03 },
    uOpacity: { value: .03 },
    uAlpha: { value: .3 },
  }), [timeUniform])

  const { cubeRenderTarget, cubeCamera, noiseScene, noiseMaterial, noiseGeometry } = useMemo(() => {
    const target = new THREE.WebGLCubeRenderTarget(window.matchMedia('(max-width: 767px)').matches ? 512 : 1024, {
      type: THREE.UnsignedByteType,
      colorSpace: THREE.NoColorSpace,
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
      ribbons.loops.dispose()
      ribbons.rays.dispose()
    }
  }, [cubeRenderTarget, noiseMaterial, noiseGeometry, ribbons])

  const sunUniforms = useMemo(
    () => ({
      uTime: timeUniform,
      uPerlin: { value: cubeRenderTarget.texture },
    }),
    [cubeRenderTarget, timeUniform]
  )

  useFrame((state) => {
    // 与参考一样按真实秒数推进，低帧率时也保持表面和日冕的动画速度。
    const now = performance.now()
    if (animationStartRef.current === null) animationStartRef.current = now
    timeUniform.value = (now - animationStartRef.current) * .001
    if (!noiseReadyRef.current) {
      // 生成一次后交还渲染目标；主场景每帧直接绘制，避免透明后处理的空白帧。
      cubeCamera.update(state.gl, noiseScene)
      noiseReadyRef.current = true
    }
    // 按 Canvas 的较短边容纳完整日冕，并为透视投影和旋转留出边距。
    const halfFov = THREE.MathUtils.degToRad(state.camera.fov) / 2
    const limitingHalfFov = Math.atan(Math.tan(halfFov) * Math.min(1, state.size.width / state.size.height))
    const fittingRadius = state.camera.position.length() * Math.sin(limitingHalfFov) * .98
    groupRef.current.scale.setScalar(fittingRadius / (2.1 * 1.45))
    if (aroundRef.current) {
      aroundRef.current.position.copy(state.camera.position).normalize().multiplyScalar(.3)
      aroundRef.current.lookAt(state.camera.position)
    }

    if (!warmedUpRef.current) {
      warmedUpRef.current = true
      // 下一次 rAF 才报告就绪，确保首帧太阳已绘制。
      warmupFrameRef.current = requestAnimationFrame(() => {
        warmupFrameRef.current = null
        markModuleReady('sun')
        if (onWarmup) onWarmup()
      })
    }
  })

  return (
    <>
      <group ref={groupRef}>
        <mesh scale={2.1}>
          <sphereGeometry args={[1, 64, 64]} />
          <shaderMaterial
            vertexShader={vertexSun}
            fragmentShader={fragmentSun}
            uniforms={sunUniforms}
          />
        </mesh>
        <mesh geometry={ribbons.loops} scale={2.1} frustumCulled={false} renderOrder={2}>
          <shaderMaterial
            vertexShader={coronaVertex}
            fragmentShader={coronaFragment}
            uniforms={loopUniforms}
            transparent
            premultipliedAlpha
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
        <mesh geometry={ribbons.rays} scale={2.1} frustumCulled={false} renderOrder={3}>
          <shaderMaterial
            vertexShader={coronaVertex}
            fragmentShader={coronaFragment}
            uniforms={rayUniforms}
            transparent
            premultipliedAlpha
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
        <mesh ref={aroundRef} scale={2.1} position={[0, 0, .3]}>
          <planeGeometry args={[2.6, 2.6]} />
          <shaderMaterial
            transparent
            premultipliedAlpha
            depthWrite={false}
            vertexShader={vertexAround}
            fragmentShader={fragmentAround}
          />
        </mesh>
      </group>

    </>
  )
}

const SunCanvas = () => {
  const canvasRef = useRef(null)
  const isIntersectingRef = useRef(false)
  const warmedUpRef = useRef(false)
  const reducedMotionRef = useRef(false)
  // 预热期间保持 'always'，即使初次观察结果为不在视口内也先绘制首帧。
  const [frameloop, setFrameloop] = useState('always')

  const handleWarmup = () => {
    warmedUpRef.current = true
    // 首帧指令提交后，若不在视口内则挂起渲染循环。
    if (!isIntersectingRef.current || document.hidden) {
      setFrameloop('never')
    } else if (reducedMotionRef.current) {
      setFrameloop('demand')
    }
  }

  useEffect(() => {
    const el = canvasRef.current
    if (!el) return
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => {
      reducedMotionRef.current = query.matches
      if (warmedUpRef.current) {
        setFrameloop(isIntersectingRef.current && !document.hidden ? (query.matches ? 'demand' : 'always') : 'never')
      }
    }
    const observer = new IntersectionObserver(([entry]) => {
      isIntersectingRef.current = entry.isIntersecting
      update()
    }, {})

    update()
    observer.observe(el)
    query.addEventListener('change', update)
    document.addEventListener('visibilitychange', update)
    return () => {
      observer.disconnect()
      query.removeEventListener('change', update)
      document.removeEventListener('visibilitychange', update)
    }
  }, [])

  return (
    <Canvas
      ref={canvasRef}
      frameloop={frameloop}
      resize={{ scroll: false, offsetSize: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 100,
        position: [0, 0, 7],
      }}
      style={{
        pointerEvents: 'auto',
      }}
      gl={{ toneMapping: THREE.NoToneMapping }}
      dpr={[1, 1.25]}
    >
      <Suspense fallback={null}>
        <Sun onWarmup={handleWarmup} />
      </Suspense>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        enableDamping
        dampingFactor={.06}
        autoRotate={frameloop === 'always'}
        autoRotateSpeed={.08}
        rotateSpeed={.12}
      />
    </Canvas>
  )
}

export default SunCanvas
