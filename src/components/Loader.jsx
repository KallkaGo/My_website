import { Html, useProgress } from "@react-three/drei"
import { useEffect, useState } from "react"



const Loader = () => {

  const totalLoad = 67

  const { loaded } = useProgress()

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setProgress(loaded / totalLoad)
  }, [loaded])


  return (
    <Html center >
      <span className="canvas-load whitespace-nowrap text-[16px] ">Loading : </span>
      <p style={{
        fontSize: 14,
        color: '#f1f1f1',
        fontWeight: 800,
        display: "inline-block"
      }}>{`${(progress * 100).toFixed(2)}%`}</p>
    </Html>
  )
}

export default Loader