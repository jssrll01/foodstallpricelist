import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { categories, items, minPrice } from '../data/menu.js'
import { useLocal } from '../lib/store.js'
const sorts = { def: 'Menu order', low: 'Price: low to high', high: 'Price: high to low', az: 'Name: A to Z' }
export default function Menu() {
  const [sp, setSp] = useSearchParams()
  const [favs] = useLocal('favs', [])
  const cat = sp.get('cat') || 'all'
  const [q, setQ] = useState('')
  const [sort, setSort] = useState('def')
  const ref = useRef(null)
  const setCat = (c) => setSp(c === 'all' ? {} : { cat: c }, { replace: true })
  useEffect(() => {
    const k = (e) => {
      if (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) { e.preventDefault(); ref.current && ref.current.focus() }
    }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [])
  const list = useMemo(() => {
    const s = q.trim().toLowerCase()
    let r = items.filter((i) => (cat === 'all' ? true : cat === 'fav' ? favs.includes(i.id) : i.cat === cat) && (!s || i.name.toLowerCase().includes(s)))
    if (sort === 'low') r = [...r].sort((a, b) => minPrice(a) - minPrice(b))
    if (sort === 'high') r = [...r].sort((a, b) => minPrice(b) - minPrice(a))
    if (sort === 'az') r = [...r].sort((a, b) => a.name.localeCompare(b.name))
    return r
  }, [q, cat, sort, favs])
  return (
    <div className="container section">
      <div className="page-head"><h1>Our menu</h1><p className="mut">Tap an item to customize it. Prices are in Philippine pesos.</p></div>
      <div className="toolbar glass">
        <label className="search"><Icon n="search" s={18} /><input ref={ref} placeholder="Search the menu" value={q} onChange={(e) => setQ(e.target.value)} /></label>
        <select className="field sel" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort">
          {Object.entries(sorts).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
      </div>
      <div className="chips">
        {[{ id: 'all', name: 'All', emoji: '✨' }, ...categories, { id: 'fav', name: 'Favorites (' + favs.length + ')', emoji: '❤️' }].map((c) => (
          <button key={c.id} className={'chip-btn' + (cat === c.id ? ' on' : '')} onClick={() => setCat(c.id)}>{c.emoji} {c.name}</button>
        ))}
      </div>
      {list.length === 0 && (cat === 'fav' && !q
        ? <p className="empty">❤️ No favorites yet.<br /><span className="mut">Tap the heart on any item to save it here.</span></p>
        : <p className="empty">No match for “{q}”.<br /><button className="link" onClick={() => { setQ(''); setCat('all') }}>Reset filters</button></p>)}
      {categories.map((c) => {
        const group = list.filter((i) => i.cat === c.id)
        if (!group.length) return null
        return (
          <section key={c.id} className="group">
            <h2 className="h2">{c.emoji} {c.name}</h2>
            <div className="grid">{group.map((it) => <ProductCard key={it.id} item={it} />)}</div>
          </section>
        )
      })}
    </div>
  )
}
