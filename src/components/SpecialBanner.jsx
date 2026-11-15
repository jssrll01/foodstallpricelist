import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useLive } from '../lib/useLive.js'
import { items, minPrice } from '../data/menu.js'
import { details } from '../data/details.js'
import { peso } from '../lib/money.js'
export default function SpecialBanner() {
  const { special, soldOut } = useLive()
  const { add } = useCart()
  const it = items.find((i) => i.id === special)
  if (!it || soldOut.includes(it.id)) return null
  return (
    <section className="container section" style={{ paddingBottom: 0 }}>
      <Reveal>
        <div className="special glass-m" style={{ '--c': it.color }}>
          <div className="dot big">{it.cat === 'fries' ? '🍟' : '🥤'}</div>
          <div className="sp-text"><span className="chip">Today's special</span><h3>{it.name}</h3><p className="mut">{(details[it.id] || {}).desc}</p></div>
          <div className="sp-act"><strong>{peso(minPrice(it))}</strong><button className="add" onClick={() => add(it, it.variants[0])}><Icon n="plus" s={18} />Add</button></div>
        </div>
      </Reveal>
    </section>
  )
}
