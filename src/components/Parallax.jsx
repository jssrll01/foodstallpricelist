import { useEffect, useRef } from 'react'
import { addParallax } from '../lib/parallax.js'
export default function Parallax({ speed = 0.1, className = '', style, children }) {
  const ref = useRef(null)
  useEffect(() => addParallax(ref.current, speed), [speed])
  return <div ref={ref} className={'plx ' + className} style={style}>{children}</div>
}
