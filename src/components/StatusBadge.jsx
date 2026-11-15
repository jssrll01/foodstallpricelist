import { useEffect, useState } from 'react'
import { openStatus } from '../lib/status.js'
export default function StatusBadge() {
  const [s, setS] = useState(openStatus())
  useEffect(() => { const t = setInterval(() => setS(openStatus()), 60000); return () => clearInterval(t) }, [])
  return <span className={'status ' + (s.open ? 'open' : 'closed')}><i />{s.text}</span>
}
