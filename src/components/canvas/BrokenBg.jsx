import { sRGBEncoding } from 'three'
import { Canvas, useThree } from '@react-three/fiber'
import { particleTex } from '../../assets/index.js'
import { useEffect } from 'react'
import { Bokeh1Background } from '../../utils/brokenBg.js'
import { useTexture } from '@react-three/drei'
import { Suspense } from 'react'


const BrokenBg = () => {
  const gl = useThree(state => state.gl)
  const diffuseTex = useTexture(particleTex)
  diffuseTex.encoding = sRGBEncoding




  useEffect(() => {
    const bokeh1Background = Bokeh1Background(gl.domElement)
    bokeh1Background.bindMap(diffuseTex)
    bokeh1Background.setColors([0xc18417,0x510de5,0xa8381f])
    // bokeh1Background.setColors([0xffffff * Math.random(), 0xffffff * Math.random(), 0xffffff * Math.random()])

    return () => {
      bokeh1Background.dispose()
    }
  }, [])

  return null
}

const BrokenBgCanvas = () => {
  return (
    <div className='absolute inset-0 z-[-1] ' >
      <Canvas
        frameloop={'demand'}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <BrokenBg />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default BrokenBgCanvas