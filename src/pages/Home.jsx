import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import Reveal from '../components/Reveal.jsx'
import ProductCard from '../components/ProductCard.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import SpecialBanner from '../components/SpecialBanner.jsx'
import Testimonials from '../components/Testimonials.jsx'
import { categories, items, minPrice } from '../data/menu.js'
import { config } from '../data/config.js'
import { peso } from '../lib/money.js'
import { site } from '../data/site.js'
const perks = [['Made fresh', 'Blended and fried only when you order.'], ['Fast and easy', 'Pick, tap, send. Ready in minutes.'], ['Pocket friendly', 'Fries from ₱20, shakes from ₱40.']]
export default function Home() {
  const popular = items.filter((i) => i.tag).slice(0, 4)
  return (
    <>
      <section className="hero">
        <div className="blob b1" /><div className="blob b2" />
        <div className="container hero-in">
          <div className="hero-text">
            <StatusBadge />
            <h1>{site.tagline}</h1>
            <p className="lead">{site.blurb}</p>
            <div className="row">
              <Link to="/menu" className="btn pri lg">Order now<Icon n="arrow" s={18} /></Link>
              <Link to="/about" className="btn lg">Our story</Link>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="float f1 glass-m"><span>🥤</span><div><b>Shakes</b><small>from {peso(40)}</small></div></div>
            <div className="float f2 glass-m"><span>🍟</span><div><b>Fries</b><small>from {peso(20)}</small></div></div>
            <div className="orb">🥤</div>
          </div>
        </div>
      </section>
      <section className="container">
        <Reveal>
          <div className="combo glass-m">
            <span className="cat-emoji">🥤🍟</span>
            <div><b>Combo deal</b><p className="mut">Any shake + any fries saves {peso(config.comboOff)}. Applied automatically.</p></div>
            <Link to="/menu" className="btn pri">Build combo</Link>
          </div>
        </Reveal>
      </section>
      <SpecialBanner />
      <section className="section container">
        <Reveal><h2 className="h2">Browse by category</h2></Reveal>
        <div className="grid2">
          {categories.map((c, i) => (
            <Reveal key={c.id} delay={i * 80}>
              <Link to={'/menu?cat=' + c.id} className="catcard glass-m lift">
                <span className="cat-emoji">{c.emoji}</span>
                <div><h3>{c.name}</h3><p className="mut">{c.blurb}</p><small>{items.filter((x) => x.cat === c.id).reduce((a, x) => a + x.variants.length, 0)} options · from {peso(Math.min(...items.filter((x) => x.cat === c.id).map(minPrice)))}</small></div>
                <Icon n="arrow" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="section soft">
        <div className="container">
          <Reveal><h2 className="h2">Customer favorites</h2></Reveal>
          <div className="grid">{popular.map((it, i) => <Reveal key={it.id} delay={i * 70}><ProductCard item={it} /></Reveal>)}</div>
        </div>
      </section>
      <section className="section container">
        <div className="grid3">{perks.map(([t, d], i) => <Reveal key={t} delay={i * 80}><div className="perk glass-m"><b>{t}</b><p className="mut">{d}</p></div></Reveal>)}</div>
      </section>
      <Testimonials />
      <section className="section container">
        <Reveal><div className="cta"><h2>Hungry already?</h2><p>Build your order in seconds and send it straight to us.</p><Link to="/menu" className="btn lg inv">See the full menu</Link></div></Reveal>
      </section>
    </>
  )
}
