import { useMemo } from "react"
import { Float32BufferAttribute, BufferGeometry, ShaderMaterial, Uniform, Vector2, NoToneMapping } from "three"
import vertexShader from './shader/homeBg/vertex.glsl'
import fragmentShader from './shader/homeBg/fragment.glsl'
import { OrthographicCamera } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { Suspense } from "react"



const HomeBg = () => {
  const geometry = useMemo(() => {
    const bufferGeo = new BufferGeometry()
    bufferGeo.setAttribute(
      "position",
      new Float32BufferAttribute([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)
    )
    bufferGeo.setAttribute(
      "uv",
      new Float32BufferAttribute([0, 2, 0, 0, 2, 0], 2)
    )

    return bufferGeo
  }, [])

  const uniforms = useMemo(() => {
    return {
      uResolution: new Uniform(new Vector2(innerWidth, innerHeight)),
      uTime: new Uniform(0)
    }
  }, [])

  const material = useMemo(() => {
    return new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms
    })
  }, [])

  useFrame((state, delta) => {
    delta %= 1
    material.uniforms.uTime.value += delta
    material.uniforms.uResolution.value.set(innerWidth, innerHeight)
  })

  return (
    <>
      <OrthographicCamera makeDefault left={-1} right={1} top={1} bottom={-1} near={0} far={1} />
      <mesh geometry={geometry} material={material} />
    </>
  )
}


export const HomeBgCanvas = () => {
  return (
    <div className="absolute w-full h-full">
      <Canvas
        dpr={[1, 1]}
        gl={{ toneMapping: NoToneMapping }}
      >
        <Suspense>
          <HomeBg />
        </Suspense>
      </Canvas>
    </div>
  )
}
