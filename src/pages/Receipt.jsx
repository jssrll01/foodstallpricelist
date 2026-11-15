import { Link, useParams } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import OrderSummary from '../components/OrderSummary.jsx'
import { useLocal } from '../lib/store.js'
import { useCart } from '../context/CartContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { orderText } from '../lib/orderText.js'
import { site } from '../data/site.js'
import { config } from '../data/config.js'
export default function Receipt() {
  const { id } = useParams()
  const [orders] = useLocal('orders', [])
  const toast = useToast()
  const { addMany, setOpen } = useCart()
  const o = orders.find((x) => x.id === id)
  if (!o) return (
    <div className="container section center">
      <h1>Order not found</h1><p className="mut">Orders are saved on the device that placed them.</p>
      <Link className="btn pri lg" to="/menu">Back to the menu</Link>
    </div>
  )
  const text = orderText(o)
  const copy = async () => { try { await navigator.clipboard.writeText(text); toast('Order copied') } catch { toast('Could not copy') } }
  const share = async () => { if (navigator.share) { try { await navigator.share({ text }) } catch {} } else copy() }
  const msgr = async () => { await copy(); window.open(site.messenger, '_blank', 'noopener') }
  return (
    <div className="container section">
      <div className="rcpt">
        <div className="okmark"><Icon n="check" s={30} /></div>
        <div className="center"><h1>Order {o.no} saved</h1><p className="mut">{new Date(o.date).toLocaleString('en-PH', { dateStyle: 'medium', timeStyle: 'short' })} · {o.type} · {o.when === 'ASAP' ? 'as soon as possible' : 'in ' + o.when}{o.name ? ' · ' + o.name : ''}</p></div>
        <div className="notice"><b>Not sent yet.</b> Tap a button below so we can start your order.</div>
        <OrderSummary o={o} />
        {o.note && <p className="mut">Note: {o.note}</p>}
        {o.reward && <div className="notice">🎉 Reward unlocked: {config.rewardText}. Show this receipt at the stand.</div>}
        <div className="row">
          <button className="btn pri lg" onClick={share}><Icon n="share" s={18} />Send / share</button>
          <button className="btn lg" onClick={msgr}><Icon n="chat" s={18} />Messenger</button>
          {config.smsNumber && <a className="btn lg" href={'sms:' + config.smsNumber + '?body=' + encodeURIComponent(text)}><Icon n="phone" s={18} />SMS</a>}
          <button className="btn lg" onClick={copy}><Icon n="copy" s={18} />Copy</button>
        </div>
        <div className="row">
          <button className="btn" onClick={() => { addMany(o.lines); setOpen(true) }}>Order again</button>
          <Link className="btn" to="/orders">All orders</Link>
          <Link className="btn" to="/menu">Menu</Link>
        </div>
      </div>
    </div>
  )
}
