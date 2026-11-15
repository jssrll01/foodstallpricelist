import Icon from '../components/Icon.jsx'
import { categories, items } from '../data/menu.js'
import { site } from '../data/site.js'
import { peso } from '../lib/money.js'
export default function Print() {
  return (
    <div className="container section">
      <div className="page-head noprint"><h1>Printable menu</h1><button className="btn pri lg" onClick={() => window.print()}><Icon n="printer" s={18} />Print</button></div>
      <div className="sheet glass-m">
        <div className="center"><h1>{site.name}</h1><p className="mut">{site.tagline}</p></div>
        {categories.map((c) => (
          <section key={c.id} className="group">
            <h2 className="h2">{c.emoji} {c.name}</h2>
            {items.filter((i) => i.cat === c.id).flatMap((i) => i.variants.map((v) => ({ n: i.name + (v.label ? ' - ' + v.label : ''), p: v.price }))).map((r) => (
              <div className="pl-row" key={r.n}><span>{r.n}</span><i className="dots" /><b>{peso(r.p)}</b></div>
            ))}
          </section>
        ))}
        <p className="center mut small">{site.hours} · {site.phone}</p>
      </div>
    </div>
  )
}
