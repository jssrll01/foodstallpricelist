import Parallax from './Parallax.jsx'
import { site } from '../data/site.js'
export default function Header() {
  return (
    <header className="panel hero">
      <Parallax speed={0.12}>
        <span className="eyebrow">Menu</span>
        <h1>{site.name}</h1>
        <p className="lead">{site.tagline}</p>
      </Parallax>
      <p className="hours">{site.hours}</p>
    </header>
  )
}
