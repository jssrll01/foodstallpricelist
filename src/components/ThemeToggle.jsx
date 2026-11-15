import { useEffect } from 'react'
import Icon from './Icon.jsx'
import { useLocal } from '../lib/store.js'
export default function ThemeToggle() {
  const [t, setT] = useLocal('theme', 'light')
  useEffect(() => {
    document.documentElement.dataset.theme = t
    const m = document.querySelector('meta[name=theme-color]')
    if (m) m.setAttribute('content', t === 'dark' ? '#0f1115' : '#ffffff')
  }, [t])
  return <button className="cartbtn" onClick={() => setT(t === 'dark' ? 'light' : 'dark')} aria-label="Toggle dark mode"><Icon n={t === 'dark' ? 'sun' : 'moon'} /></button>
}
