import * as THREE from 'three'
import { useRef, Suspense, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

import { Points, PointMaterial, Preload } from '@react-three/drei'

import * as random from 'maath/random/dist/maath-random.esm'

import vertexShader from './shader/stars/vertex.glsl'
import fragmentShader from './shader/stars/fragment.glsl'



const Stars = (props) => {
  const ref = useRef()

  const materialRef = useRef()

  const count = 5000

  const sphere = random.inSphere(new Float32Array(count * 3), { radius: 1.2 })

  const color = new Float32Array(count * 3)

  // const colorArr = ['#6d4862', '#fd826c', '#22ccc1']

  const colorArr = ['#ef081c', '#ebdeee', '#038cb2']


  const colorObjects = colorArr.map(item => new THREE.Color(item))

  const getColorAt = (position, resultColor = new THREE.Color()) => {
    const clampedPos = Math.max(0, Math.min(1, position)) * (colorObjects.length - 1)
    const baseIndex = Math.floor(clampedPos)
    const baseColor = colorObjects[baseIndex]
    if (baseIndex >= colorObjects.length - 1) return baseColor.clone()

    const mixAmount = clampedPos - baseIndex
    const nextColor = colorObjects[baseIndex + 1]

    resultColor.r = baseColor.r + mixAmount * (nextColor.r - baseColor.r)
    resultColor.g = baseColor.g + mixAmount * (nextColor.g - baseColor.g)
    resultColor.b = baseColor.b + mixAmount * (nextColor.b - baseColor.b)
    return resultColor
  }


  for (let i = 0; i < count; i++) {
    const i3 = i * 3

    const randomColor = getColorAt(Math.random())

    //r
    color[i3] = randomColor.r
    //g
    color[i3 + 1] = randomColor.g
    //b
    color[i3 + 2] = randomColor.b

  }


  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10
    ref.current.rotation.y -= delta / 15
    materialRef.current.uniforms.uTime.value += delta
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]} >
      <Points ref={ref}
        positions={sphere}
        stride={3}
        colors={color}
        frustumCulled
        {...props}
      >
        <shaderMaterial
          ref={materialRef}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={{
            uTime: { value: 0 }
          }}
        ></shaderMaterial>
      </Points>
    </group>
  )
}


const StarsCanvas = () => {
  return (
    <div className='w-full h-auto absolute inset-0
    z-[-1]
    '>
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 1]}
      >
        <Suspense fallback={null} >
          <Stars />
        </Suspense>
        <Preload />
      </Canvas>

    </div>
  )
}

export default StarsCanvas