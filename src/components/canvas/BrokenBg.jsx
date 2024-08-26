import { SRGBColorSpace, sRGBEncoding, TextureLoader } from 'three'
import { Canvas, useThree } from '@react-three/fiber'
import { particleTex } from '../../assets/index.js'
import { useEffect } from 'react'
import { Bokeh1Background } from '../../utils/brokenBg.js'
import { useTexture } from '@react-three/drei'
import { Suspense } from 'react'
import { useMemo, useRef } from 'react'


const BrokenBg = () => {
  const loader = useMemo(() => new TextureLoader(), [])
  const diffuseTex = loader.load(particleTex)
  const canvasRef = useRef(null)
  diffuseTex.filpY = false
  diffuseTex.colorSpace = SRGBColorSpace

  useEffect(() => {
    const bokeh1Background = Bokeh1Background(canvasRef.current)
    bokeh1Background.bindMap(diffuseTex)
    bokeh1Background.setColors([0xc18417, 0x510de5, 0xa8381f])
    // bokeh1Background.setColors([0xffffff * Math.random(), 0xffffff * Math.random(), 0xffffff * Math.random()])

    return () => {
      bokeh1Background.dispose()
      diffuseTex.dispose()
    }
  }, [])

  return (
    <canvas ref={canvasRef}></canvas>
  )
}

const BrokenBgCanvas = () => {
  return (
    <div className='absolute inset-0 z-[-1] ' >
      <BrokenBg />
    </div>
  )
}

export default BrokenBgCanvas