import { useState } from 'react'
import Icon from '../components/Icon.jsx'
import { items } from '../data/menu.js'
import { config } from '../data/config.js'
import { useLocal, writeLocal } from '../lib/store.js'
import { useLive } from '../lib/useLive.js'
import { useToast } from '../context/ToastContext.jsx'
import { peso } from '../lib/money.js'
export default function Admin() {
  const [ok, setOk] = useState(false)
  const [pin, setPin] = useState('')
  const [bad, setBad] = useState(false)
  const [, setOv] = useLocal('live', {})
  const [orders, setOrders] = useLocal('orders', [])
  const live = useLive()
  const toast = useToast()
  const [ann, setAnn] = useState(live.announcement)
  const go = () => (pin === config.adminPin ? setOk(true) : setBad(true))
  if (!ok) return (
    <div className="container section center">
      <span className="ico"><Icon n="lock" /></span>
      <h1>Stall admin</h1>
      <input className="field" style={{ maxWidth: 260 }} type="password" inputMode="numeric" placeholder="Enter PIN" value={pin} onChange={(e) => { setPin(e.target.value); setBad(false) }} onKeyDown={(e) => e.key === 'Enter' && go()} />
      {bad && <small style={{ color: '#e5484d' }}>Wrong PIN</small>}
      <button className="btn pri lg" onClick={go}>Unlock</button>
    </div>
  )
  const today = new Date().toDateString()
  const todays = orders.filter((o) => new Date(o.date).toDateString() === today)
  const total = todays.reduce((a, o) => a + o.total, 0)
  const tally = {}
  todays.forEach((o) => o.lines.forEach((l) => { tally[l.name] = (tally[l.name] || 0) + l.qty }))
  const top = Object.entries(tally).sort((a, b) => b[1] - a[1]).slice(0, 3)
  const toggle = (id) => setOv((o) => { const cur = o.soldOut ?? live.soldOut; return { ...o, soldOut: cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id] } })
  return (
    <div className="container section">
      <div className="page-head"><h1>Stall admin</h1><p className="mut">Settings here apply to this device only.</p></div>
      <div className="adm">
        <div className="apanel glass-m">
          <h3>Today</h3>
          <div className="stats">
            <div className="stat"><small className="mut">Orders</small><b>{todays.length}</b></div>
            <div className="stat"><small className="mut">Sales</small><b>{peso(total)}</b></div>
            <div className="stat"><small className="mut">Average</small><b>{peso(todays.length ? total / todays.length : 0)}</b></div>
          </div>
          <small className="mut">{top.length ? 'Top today: ' + top.map(([n, q]) => n + ' (' + q + ')').join(', ') : 'No orders yet today.'}</small>
        </div>
        <div className="apanel glass-m">
          <h3>Sold out</h3>
          {items.map((i) => (
            <div className="arow" key={i.id}><span>{i.name}</span>
              <button className={'switch' + (live.soldOut.includes(i.id) ? ' on' : '')} role="switch" aria-checked={live.soldOut.includes(i.id)} onClick={() => toggle(i.id)} aria-label={'Sold out ' + i.name} />
            </div>
          ))}
        </div>
        <div className="apanel glass-m">
          <h3>Today's special</h3>
          <select className="field" value={live.special} onChange={(e) => setOv((o) => ({ ...o, special: e.target.value }))}>
            <option value="">None</option>
            {items.map((i) => <option key={i.id} value={i.id}>{i.name}</option>)}
          </select>
        </div>
        <div className="apanel glass-m">
          <h3>Announcement bar</h3>
          <input className="field" value={ann} onChange={(e) => setAnn(e.target.value)} placeholder="Leave empty to hide" />
          <button className="btn pri" onClick={() => { setOv((o) => ({ ...o, announcement: ann })); writeLocal('annSeen', ''); toast('Saved') }}>Save</button>
        </div>
        <div className="row">
          <button className="btn" onClick={() => { writeLocal('live', {}); setAnn(live.announcement); toast('Reset to defaults') }}>Reset settings</button>
          <button className="btn" onClick={() => { if (window.confirm('Delete all saved orders on this device?')) setOrders([]) }}>Clear orders</button>
          <button className="btn" onClick={() => setOk(false)}>Lock</button>
        </div>
      </div>
    </div>
  )
}
