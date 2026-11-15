import { peso } from '../lib/money.js'
export default function OrderSummary({ o }) {
  return (
    <div className="sumbox glass-m">
      {o.lines.map((l) => (
        <div key={l.key}>
          <div className="srow"><span>{l.qty} × {l.name}{l.label ? ' (' + l.label + ')' : ''}</span><b>{peso(l.qty * l.price)}</b></div>
          {l.extras && l.extras.length > 0 && <div className="sx">+ {l.extras.join(', ')}</div>}
        </div>
      ))}
      {o.combo > 0 && <div className="srow save"><span>Combo deal</span><span>-{peso(o.combo)}</span></div>}
      {o.promo > 0 && <div className="srow save"><span>Promo {o.code}</span><span>-{peso(o.promo)}</span></div>}
      <div className="srow tot"><span>Total</span><span>{peso(o.total)}</span></div>
    </div>
  )
}
