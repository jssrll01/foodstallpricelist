import { useEffect, useState } from 'react'
export default function InstallButton() {
  const [ev, setEv] = useState(null)
  useEffect(() => {
    const h = (e) => { e.preventDefault(); setEv(e) }
    window.addEventListener('beforeinstallprompt', h)
    return () => window.removeEventListener('beforeinstallprompt', h)
  }, [])
  if (!ev) return null
  return <button className="btn sm" onClick={async () => { ev.prompt(); try { await ev.userChoice } catch {} setEv(null) }}>Install app</button>
}
