import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { useLocal } from '../lib/store.js'
import { useCart } from '../context/CartContext.jsx'
import { peso } from '../lib/money.js'
export default function Orders() {
  const [orders, setOrders] = useLocal('orders', [])
  const { addMany, setOpen } = useCart()
  const clear = () => { if (window.confirm('Delete all saved orders on this device?')) setOrders([]) }
  return (
    <div className="container section">
      <div className="page-head"><h1>My orders</h1><p className="mut">Saved on this device.</p></div>
      {orders.length === 0 && <p className="empty">🧾 No orders yet.<br /><Link className="link" to="/menu">Browse the menu</Link></p>}
      <div className="rcpt">
        {orders.map((o) => (
          <div key={o.id} className="ocard glass-m lift">
            <div className="ohead"><b>{o.no}</b><span className="mut small">{new Date(o.date).toLocaleString('en-PH', { dateStyle: 'medium', timeStyle: 'short' })}</span></div>
            <p className="mut">{o.lines.map((l) => l.qty + ' × ' + l.name).join(', ')}</p>
            <div className="ohead"><strong>{peso(o.total)}</strong>
              <span className="row"><Link className="btn sm" to={'/receipt/' + o.id}>Receipt</Link><button className="btn pri sm" onClick={() => { addMany(o.lines); setOpen(true) }}>Reorder</button></span>
            </div>
          </div>
        ))}
        {orders.length > 0 && <button className="link" onClick={clear}><Icon n="trash" s={14} /> Clear history</button>}
      </div>
    </div>
  )
}
