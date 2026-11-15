import { peso } from '../lib/money.js'
export default function MenuItem({ item }) {
  return (
    <li className="row">
      <span className="rname">{item.name}</span>
      <b className="rprice">{peso(item.price)}</b>
    </li>
  )
}
