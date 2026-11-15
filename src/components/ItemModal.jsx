import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Icon from './Icon.jsx'
import { useCart } from '../context/CartContext.jsx'
import { details, addons } from '../data/details.js'
import { peso } from '../lib/money.js'
export default function ItemModal({ item, vi0 = 0, out, onClose }) {
  const { add } = useCart()
  const [vi, setVi] = useState(vi0)
  const [ex, setEx] = useState([])
  const [n, setN] = useState(1)
  const d = details[item.id] || {}
  const opts = addons[item.cat] || []
  const v = item.variants[vi]
  const picked = opts.filter((o) => ex.includes(o.id))
  const unit = v.price + picked.reduce((a, o) => a + o.price, 0)
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && onClose()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', k)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', k) }
  }, [onClose])
  const go = () => { add(item, v, picked, n); onClose() }
  return createPortal(
    <div className="modal-wrap" onClick={onClose}>
      <div className="modal glass-m" role="dialog" aria-label={item.name} style={{ '--c': item.color }} onClick={(e) => e.stopPropagation()}>
        <button className="icon-btn close" onClick={onClose} aria-label="Close"><Icon n="x" /></button>
        <div className="modal-art">{item.cat === 'fries' ? '🍟' : '🥤'}</div>
        <div className="modal-body">
          <h2>{item.name}</h2>
          <p className="mut">{d.desc || 'Made fresh when you order.'}</p>
          {item.variants.length > 1 && (<>
            <div className="lbl">Size</div>
            <div className="pills">{item.variants.map((x, i) => <button key={x.label} className={'pill' + (i === vi ? ' on' : '')} onClick={() => setVi(i)}>{x.label} · {peso(x.price)}</button>)}</div>
          </>)}
          {opts.length > 0 && (<>
            <div className="lbl">Add-ons</div>
            <div className="opts">{opts.map((o) => (
              <label key={o.id} className={'opt' + (ex.includes(o.id) ? ' on' : '')}>
                <input type="checkbox" checked={ex.includes(o.id)} onChange={() => setEx(ex.includes(o.id) ? ex.filter((z) => z !== o.id) : [...ex, o.id])} />
                <span>{o.name}</span><b>+{peso(o.price)}</b>
              </label>
            ))}</div>
          </>)}
          <small className="mut">Allergies? Please tell us before ordering.</small>
          <div className="modal-foot">
            <div className="qty">
              <button onClick={() => setN(Math.max(1, n - 1))} aria-label="Less"><Icon n="minus" s={16} /></button>
              <span>{n}</span>
              <button onClick={() => setN(Math.min(20, n + 1))} aria-label="More"><Icon n="plus" s={16} /></button>
            </div>
            <button className="btn pri grow" disabled={out} onClick={go}>{out ? 'Sold out' : 'Add · ' + peso(unit * n)}</button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
