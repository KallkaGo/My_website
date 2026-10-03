import { SRGBColorSpace, TextureLoader } from 'three'
import { particleTex } from '../../assets/index.js'
import { useEffect } from 'react'
import { Bokeh1Background } from '../../utils/brokenBg.js'
import { markModuleReady } from '../../utils/Store'

import { useRef } from 'react'


const BrokenBg = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const diffuseTex = new TextureLoader().load(particleTex)
    diffuseTex.flipY = false
    diffuseTex.colorSpace = SRGBColorSpace
    const bokeh = Bokeh1Background(canvas)
    bokeh.bindMap(diffuseTex)
    bokeh.setColors([0xc18417, 0x510de5, 0xa8381f])
    // bokeh.setColors([0xffffff * Math.random(), 0xffffff * Math.random(), 0xffffff * Math.random()])

    // 初始化完成即上报，全屏 loading 会等它和其他 WebGL 模块就绪后再放行入场动画
    markModuleReady('bokeh')

    return () => {
      bokeh.dispose()
      diffuseTex.dispose()
    }
  },[])

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
