import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),glsl({
    warnDuplicatedImports: false
  })],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const path = id.replace(/\\/g, '/')
          if (!path.includes('/node_modules/')) return
          if (path.includes('/node_modules/three/')) return 'three'
          if (path.includes('/node_modules/postprocessing/') || path.includes('/node_modules/@react-three/postprocessing/')) return 'postprocessing'
          if (path.includes('/node_modules/react/') || path.includes('/node_modules/react-dom/') || path.includes('/node_modules/scheduler/')) return 'react'
          if (path.includes('/node_modules/@react-three/')) return 'react-three'
          if (path.includes('/node_modules/gsap/')) return 'animation'
        },
      },
    },
  },
})
