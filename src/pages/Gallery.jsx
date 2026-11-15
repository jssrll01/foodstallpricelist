import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { items } from '../data/menu.js'
import { photos } from '../data/gallery.js'
export default function Gallery() {
  const [sel, setSel] = useState(null)
  const tiles = photos.length
    ? photos.map((p) => ({ key: p.src, src: p.src, alt: p.alt || '' }))
    : items.map((i) => ({ key: i.id, emoji: i.cat === 'fries' ? '🍟' : '🥤', color: i.color, alt: i.name }))
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && setSel(null)
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [])
  const t = sel != null ? tiles[sel] : null
  return (
    <div className="container section">
      <div className="page-head"><h1>Gallery</h1><p className="mut">A taste of what we serve.</p></div>
      <div className="gal">
        {tiles.map((x, i) => (
          <button key={x.key} className="gtile" style={{ '--c': x.color }} onClick={() => setSel(i)} aria-label={x.alt}>
            {x.src ? <img src={x.src} alt={x.alt} loading="lazy" /> : <span>{x.emoji}</span>}
          </button>
        ))}
      </div>
      {t && createPortal(
        <div className="modal-wrap" onClick={() => setSel(null)}>
          <div className="lb" style={{ '--c': t.color }} onClick={(e) => e.stopPropagation()}>
            {t.src ? <img src={t.src} alt={t.alt} /> : <span>{t.emoji}</span>}
            <b>{t.alt}</b>
          </div>
        </div>, document.body)}
    </div>
  )
}
