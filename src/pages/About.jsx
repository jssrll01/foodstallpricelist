import Reveal from '../components/Reveal.jsx'
import { site } from '../data/site.js'
const steps = [['01', 'Choose', 'Pick a flavor or a fries size.'], ['02', 'Prepare', 'We blend or fry it fresh, never ahead of time.'], ['03', 'Enjoy', 'Served cold or hot, right when you want it.']]
const values = [['Quality first', 'Good ingredients and honest portions.'], ['Always fresh', 'Nothing sits waiting. Made to order.'], ['Small and personal', 'A real stand run by real people.']]
export default function About() {
  return (
    <div className="container section">
      <div className="page-head"><h1>About {site.name}</h1><p className="lead">{site.blurb}</p></div>
      <div className="grid3">{values.map(([t, d], i) => <Reveal key={t} delay={i * 80}><div className="perk glass-m"><b>{t}</b><p className="mut">{d}</p></div></Reveal>)}</div>
      <Reveal><h2 className="h2 mt">How it works</h2></Reveal>
      <div className="grid3">{steps.map(([n, t, d], i) => <Reveal key={n} delay={i * 80}><div className="step glass-m"><span className="num">{n}</span><b>{t}</b><p className="mut">{d}</p></div></Reveal>)}</div>
    </div>
  )
}
