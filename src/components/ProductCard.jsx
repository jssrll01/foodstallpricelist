import { useState } from 'react'
import Icon from './Icon.jsx'
import ItemModal from './ItemModal.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { useLocal } from '../lib/store.js'
import { useLive } from '../lib/useLive.js'
import { peso } from '../lib/money.js'
export default function ProductCard({ item }) {
  const { add } = useCart()
  const toast = useToast()
  const [favs, setFavs] = useLocal('favs', [])
  const { soldOut, special } = useLive()
  const [vi, setVi] = useState(0)
  const [done, setDone] = useState(false)
  const [open, setOpen] = useState(false)
  const v = item.variants[vi]
  const fav = favs.includes(item.id)
  const out = soldOut.includes(item.id)
  const tag = out ? 'Sold out' : special === item.id ? "Today's special" : item.tag
  const go = () => { if (out) return; add(item, v); setDone(true); setTimeout(() => setDone(false), 900) }
  const heart = () => { setFavs(fav ? favs.filter((x) => x !== item.id) : [...favs, item.id]); toast(fav ? 'Removed from favorites' : 'Saved to favorites') }
  return (
    <article className={'card glass-m lift' + (out ? ' out' : '')} style={{ '--c': item.color }}>
      <button className={'heart' + (fav ? ' on' : '')} onClick={heart} aria-label="Favorite" aria-pressed={fav}><Icon n="heart" s={18} /></button>
      <button className="art" onClick={() => setOpen(true)} aria-label={'Customize ' + item.name}>
        <span>{item.cat === 'fries' ? '🍟' : '🥤'}</span>
        {tag && <em className="tag">{tag}</em>}
      </button>
      <div className="card-body">
        <h3><button className="namebtn" onClick={() => setOpen(true)}>{item.name}</button></h3>
        {item.variants.length > 1 && (
          <div className="pills" role="radiogroup">
            {item.variants.map((x, i) => <button key={x.label} role="radio" aria-checked={i === vi} className={'pill' + (i === vi ? ' on' : '')} onClick={() => setVi(i)}>{x.label}</button>)}
          </div>
        )}
        <div className="card-foot">
          <strong key={v.price} className="price pop">{peso(v.price)}</strong>
          <button className={'add' + (done ? ' ok' : '')} disabled={out} onClick={go} aria-label={'Add ' + item.name}>
            <Icon n={done ? 'check' : 'plus'} s={18} />{out ? 'Sold out' : done ? 'Added' : 'Add'}
          </button>
        </div>
      </div>
      {open && <ItemModal item={item} vi0={vi} out={out} onClose={() => setOpen(false)} />}
    </article>
  )
}
