import Reveal from './Reveal.jsx'
import { site } from '../data/site.js'
export default function Footer() {
  return (
    <Reveal className="panel foot">
      <b>{site.name}</b>
      <p className="mut">{site.hours}</p>
      <p className="mut">{site.address}</p>
      <p className="mut small">All prices are in Philippine pesos.</p>
    </Reveal>
  )
}
