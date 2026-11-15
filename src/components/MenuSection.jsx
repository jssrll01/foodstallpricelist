import Reveal from './Reveal.jsx'
import MenuItem from './MenuItem.jsx'
export default function MenuSection({ cat }) {
  return (
    <Reveal id={cat.id} className="panel section-panel">
      <div className="sec-head"><h2>{cat.name}</h2><p className="mut">{cat.note}</p></div>
      <ul className="list">{cat.items.map((it) => <MenuItem key={it.name} item={it} />)}</ul>
    </Reveal>
  )
}
