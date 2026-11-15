import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from './Icon.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { useLocal, readLocal, writeLocal } from '../lib/store.js'
import { calc, promoLabel } from '../lib/pricing.js'
import { peso } from '../lib/money.js'
import { config, promos } from '../data/config.js'
const TYPES = ['Pickup', 'Dine-in']
const WHEN = ['ASAP', '15 min', '30 min', '45 min', '1 hour']
const blank = { name: '', type: 'Pickup', when: 'ASAP', note: '', code: '' }
export default function CartDrawer() {
  const { open, setOpen, lines, dispatch, count } = useCart()
  const toast = useToast()
  const nav = useNavigate()
  const [ck, setCk] = useLocal('checkout', blank)
  const [codeIn, setCodeIn] = useState('')
  const [err, setErr] = useState('')
  const set = (p) => setCk((c) => ({ ...c, ...p }))
  const t = calc(lines, ck.code)
  const p = ck.code ? promos[ck.code] : null
  const left = config.rewardAt - t.total
  const mins = Math.min(45, config.prep.base + config.prep.per * count)
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const k = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [open, setOpen])
  const apply = () => {
    const c = codeIn.trim().toUpperCase()
    if (!promos[c]) return setErr('That code is not valid.')
    set({ code: c }); setCodeIn(''); setErr(''); toast('Promo ' + c + ' added')
  }
  const place = () => {
    if (!lines.length) return
    const seq = readLocal('orderSeq', 0) + 1
    writeLocal('orderSeq', seq)
    const o = {
      id: Math.random().toString(36).slice(2, 10) + Date.now().toString(36),
      no: '#' + String(seq).padStart(3, '0'), date: new Date().toISOString(),
      name: ck.name.trim(), type: ck.type, when: ck.when, note: ck.note.trim(),
      code: t.promoOk ? ck.code : '', lines, sub: t.sub, combo: t.combo, promo: t.promo, total: t.total,
      reward: config.rewardAt > 0 && t.total >= config.rewardAt,
    }
    writeLocal('orders', [o, ...readLocal('orders', [])].slice(0, 60))
    dispatch({ type: 'clear' }); setOpen(false); set({ note: '', code: '' })
    nav('/receipt/' + o.id)
  }
  return (
    <div className={'drawer-wrap noprint' + (open ? ' open' : '')} aria-hidden={!open}>
      <div className="scrim" onClick={() => setOpen(false)} />
      <aside className="drawer glass" role="dialog" aria-label="Your order">
        <div className="drawer-head"><h2>Your order <small className="mut">({count})</small></h2><button className="icon-btn" onClick={() => setOpen(false)} aria-label="Close"><Icon n="x" /></button></div>
        <div className="drawer-body">
          <div className="drawer-list">
            {lines.length === 0 && <p className="empty">🥤 Nothing here yet.<br /><span className="mut">Add something tasty from the menu.</span></p>}
            {lines.map((l) => (
              <div className="line" key={l.key} style={{ '--c': l.color }}>
                <div className="dot">{l.emoji}</div>
                <div className="line-info"><b>{l.name}</b><small className="mut">{l.label || 'Regular'} · {peso(l.price)}</small>{l.extras && l.extras.length > 0 && <small className="mut">+ {l.extras.join(', ')}</small>}</div>
                <div className="qty">
                  <button onClick={() => dispatch({ type: 'dec', key: l.key })} aria-label="Less"><Icon n="minus" s={16} /></button>
                  <span>{l.qty}</span>
                  <button onClick={() => dispatch({ type: 'inc', key: l.key })} aria-label="More"><Icon n="plus" s={16} /></button>
                </div>
              </div>
            ))}
          </div>
          {lines.length > 0 && (
            <div className="ck">
              {t.pairs < Math.max(t.shakes, t.fries) && <div className="notice">Add {t.shakes > t.fries ? 'fries' : 'a shake'} to save {peso(config.comboOff)} more with the combo deal.</div>}
              {config.rewardAt > 0 && (
                <div className="reward">
                  <div className="bar"><i style={{ width: Math.min(100, (t.total / config.rewardAt) * 100) + '%' }} /></div>
                  <small className="mut">{left > 0 ? 'Add ' + peso(left) + ' more to unlock ' + config.rewardText : '🎉 You unlocked ' + config.rewardText + '! It comes with your order.'}</small>
                </div>
              )}
              <input className="field" placeholder="Your name (optional)" value={ck.name} onChange={(e) => set({ name: e.target.value })} />
              <div className="pills">{TYPES.map((x) => <button key={x} className={'pill' + (ck.type === x ? ' on' : '')} onClick={() => set({ type: x })}>{x}</button>)}</div>
              <div className="lbl">When</div>
              <div className="pills wrap">{WHEN.map((x) => <button key={x} className={'pill' + (ck.when === x ? ' on' : '')} onClick={() => set({ when: x })}>{x}</button>)}</div>
              <textarea className="field" rows="2" placeholder="Notes (less ice, no sugar...)" value={ck.note} onChange={(e) => set({ note: e.target.value })} />
              {p ? (
                <div className="promo-on"><span className="chip">{ck.code} · {promoLabel(p)}</span><button className="link" onClick={() => set({ code: '' })}>Remove</button></div>
              ) : (
                <div className="promo"><input className="field" placeholder="Promo code" value={codeIn} onChange={(e) => { setCodeIn(e.target.value); setErr('') }} onKeyDown={(e) => e.key === 'Enter' && apply()} /><button className="btn" onClick={apply}>Apply</button></div>
              )}
              {p && !t.promoOk && <small className="mut">Spend {peso(p.min)} to use this code.</small>}
              {err && <small style={{ color: '#e5484d' }}>{err}</small>}
              <button className="link" onClick={() => dispatch({ type: 'clear' })}>Clear order</button>
            </div>
          )}
        </div>
        {lines.length > 0 && (
          <div className="drawer-foot">
            <div className="trow"><span>Subtotal</span><span>{peso(t.sub)}</span></div>
            {t.combo > 0 && <div className="trow save"><span>Combo deal x{t.pairs}</span><span>-{peso(t.combo)}</span></div>}
            {t.promo > 0 && <div className="trow save"><span>Promo {ck.code}</span><span>-{peso(t.promo)}</span></div>}
            <div className="total"><span>Total</span><b>{peso(t.total)}</b></div>
            <small className="mut">Ready in about {mins} min after we confirm.</small>
            <button className="btn pri lg" onClick={place}>Place order</button>
          </div>
        )}
      </aside>
    </div>
  )
}
