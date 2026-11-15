import { useEffect, useState } from 'react'
import { menu } from '../data/menu.js'
export default function CategoryNav() {
  const [active, setActive] = useState(menu[0].id)
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-35% 0px -55% 0px' }
    )
    menu.forEach((c) => { const el = document.getElementById(c.id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  return (
    <nav className="catnav" aria-label="Menu categories">
      <div className="wrap navrow">
        {menu.map((c) => (
          <button key={c.id} className={'nbtn' + (active === c.id ? ' on' : '')} onClick={() => go(c.id)}>{c.name}</button>
        ))}
      </div>
    </nav>
  )
}
