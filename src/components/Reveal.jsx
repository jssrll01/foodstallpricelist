import { useEffect, useRef, useState } from 'react'
export default function Reveal({ children, delay = 0, className = '', id }) {
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return setOn(true)
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect() } }, { threshold: 0.08 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <div id={id} ref={ref} className={'reveal ' + (on ? 'in ' : '') + className} style={{ transitionDelay: delay + 'ms' }}>{children}</div>
}
