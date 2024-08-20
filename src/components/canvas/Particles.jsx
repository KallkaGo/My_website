import * as THREE from 'three'
import { Suspense } from 'react'
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import vertexShader from './shader/particles/vertex.glsl'
import fragmentShader from './shader/particles/fragmnet.glsl'
import { useMemo } from 'react'
import { useTexture } from '@react-three/drei'
import picUrl from '../../assets/particles/picture-5.png'
import diffuseUrl from '../../assets/particles/picture-6.png'
import glowUrl from '../../assets/particles/glow.png'
import { useRef } from 'react'
import { useEffect } from 'react'


const Particles = () => {
  const pictureTex = useTexture(picUrl)
  pictureTex.colorSpace = THREE.SRGBColorSpace
  const diffuseTex = useTexture(diffuseUrl)
  diffuseTex.colorSpace = THREE.SRGBColorSpace

  const pointsRef = useRef(null)

  const displacementRef = useRef({})

  const hoverStateRef = useRef(false)

  const gl = useThree(state => state.gl)
  const { width, height } = gl.domElement


  const uniforms = useMemo(() => ({
    uResolution: new THREE.Uniform(new THREE.Vector2(width * gl.getPixelRatio(), height * gl.getPixelRatio())),
    uPictureTexture: new THREE.Uniform(pictureTex),
    uDiffuseTexture: new THREE.Uniform(diffuseTex),
    uDisplacementTexture: new THREE.Uniform(),
    uIntensity: new THREE.Uniform(0)
  }), [])

  useEffect(() => {
    const points = pointsRef.current
    const geometry = points.geometry
    geometry.setIndex(null)
    geometry.deleteAttribute('normal')
    const intensitiesArray = new Float32Array(geometry.attributes.position.count)
    const anglesArray = new Float32Array(geometry.attributes.position.count)

    for (let i = 0; i < geometry.attributes.position.count; i++) {
      intensitiesArray[i] = Math.random()
      anglesArray[i] = Math.random() * Math.PI * 2
    }

    geometry.setAttribute('aIntensity', new THREE.BufferAttribute(intensitiesArray, 1))
    geometry.setAttribute('aAngle', new THREE.BufferAttribute(anglesArray, 1))

    /* init  displacement*/
    const displacement = displacementRef.current
    displacement.canvas = document.createElement('canvas')
    displacement.canvas.width = 320
    displacement.canvas.height = 180
    displacement.canvas.style.position = 'fixed'
    displacement.canvas.style.top = 0
    displacement.canvas.style.left = 0
    displacement.canvas.style.zIndex = 10
    // document.body.append(displacement.canvas)

    displacement.context = displacement.canvas.getContext('2d')
    displacement.context.fillRect(0, 0, displacement.canvas.width, displacement.canvas.height)
    displacement.glowImage = new Image()
    displacement.glowImage.src = glowUrl
    displacement.glowImage.onload = () => {
      displacement.context.drawImage(displacement.glowImage, 20, 20, 32, 32)
    }

    /* Raycaster */
    displacement.raycaster = new THREE.Raycaster()
    // Coordinates
    displacement.screenCursor = new THREE.Vector2(9999, 9999)
    displacement.canvasCursor = new THREE.Vector2(9999, 9999)
    displacement.canvasCursorPrevious = new THREE.Vector2(9999, 9999)
    displacement.texture = new THREE.CanvasTexture(displacement.canvas)

    uniforms.uDisplacementTexture.value = displacement.texture

    const handlePointerMove = (event) => {
      displacement.screenCursor.x = (event.clientX / width) * 2 - 1
      displacement.screenCursor.y = - (event.clientY / height) * 2 + 1
    }

    window.addEventListener('pointermove', handlePointerMove)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      displacement.canvas.width = displacement.canvas.height = 0
      displacement.context.fillRect(0, 0, 0, 0)
    }

  }, [])


  useFrame((state, delta) => {

    delta %= 1

    const displacement = displacementRef.current

    const hoveState = hoverStateRef.current

    if (hoveState) {
      uniforms.uIntensity.value = THREE.MathUtils.lerp(uniforms.uIntensity.value, 1, delta * 2)
    } else {
      uniforms.uIntensity.value = THREE.MathUtils.lerp(uniforms.uIntensity.value, 0, delta * 2)
    }


    // Fade out
    displacement.context.globalCompositeOperation = 'source-over'
    displacement.context.globalAlpha = 0.02
    displacement.context.fillRect(0, 0, displacement.canvas.width, displacement.canvas.height)


    // Speed alpha
    const cursorDistance = displacement.canvasCursorPrevious.distanceTo(displacement.canvasCursor)
    displacement.canvasCursorPrevious.copy(displacement.canvasCursor)
    const alpha = Math.min(cursorDistance * 0.1, 1)

    // Draw glow
    const glowSize = displacement.canvas.width * 0.1 * .8
    displacement.context.globalCompositeOperation = 'lighter'
    displacement.context.globalAlpha = alpha
    displacement.context.drawImage(
      displacement.glowImage,
      displacement.canvasCursor.x - glowSize * .5,
      displacement.canvasCursor.y - glowSize * .5,
      glowSize,
      glowSize
    )

    displacement.texture.needsUpdate = true
  })

  const handleMove = (e) => {

    const displacement = displacementRef.current
    const uv = e.uv
    displacement.canvasCursor.x = uv.x * displacement.canvas.width
    displacement.canvasCursor.y = (1. - uv.y) * displacement.canvas.height
  }

  return (
    <>
      <points ref={pointsRef}>
        <planeGeometry args={[16, 9, 256, 256]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
        ></shaderMaterial>
      </points>
      <mesh visible={false} onPointerMove={handleMove} position={[0, 0, .01]} onPointerEnter={() => hoverStateRef.current = true} onPointerLeave={() => hoverStateRef.current = false} >
        <planeGeometry args={[16, 9]} />
        <meshBasicMaterial />
      </mesh>
    </>
  )
}



const ParticlesCanvas = () => {
  return (
    <Canvas
      camera={{
        fov: 35,
        near: 0.1,
        far: 100,
        position: [0, 0, 20]
      }}
      gl={{ preserveDrawingBuffer: true, toneMapping: THREE.NoToneMapping }}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        <Particles />
      </Suspense>
    </Canvas>
  )
}

export default ParticlesCanvas