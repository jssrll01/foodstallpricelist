import Icon from '../components/Icon.jsx'
import Reveal from '../components/Reveal.jsx'
import { site } from '../data/site.js'
const faq = [['Do you take pre-orders?', 'Yes. Build your order on the menu page and send it to us on Messenger.'], ['Can I change my shake flavor?', 'Of course. Message us before we start blending.'], ['How do I pay?', 'Pay at the stand when you pick up your order.']]
export default function Contact() {
  const info = [['pin', 'Find us', site.address], ['clock', 'Hours', site.hours], ['phone', 'Call', site.phone]]
  return (
    <div className="container section">
      <div className="page-head"><h1>Visit or message us</h1><p className="mut">We reply fast during opening hours.</p></div>
      <div className="grid3">
        {info.map(([ic, t, d], i) => <Reveal key={t} delay={i * 80}><div className="perk glass-m"><span className="ico"><Icon n={ic} /></span><b>{t}</b><p className="mut">{d}</p></div></Reveal>)}
      </div>
      <div className="row mt">
        <a className="btn pri lg" href={site.messenger} target="_blank" rel="noreferrer"><Icon n="chat" s={18} />Message us</a>
        <a className="btn lg" href={site.maps} target="_blank" rel="noreferrer"><Icon n="pin" s={18} />Directions</a>
        <a className="btn lg" href={'tel:' + site.phone.replace(/\s/g, '')}><Icon n="phone" s={18} />Call</a>
      </div>
      <h2 className="h2 mt">Questions</h2>
      <div className="faq">{faq.map(([q, a]) => <details key={q} className="glass-m"><summary>{q}</summary><p className="mut">{a}</p></details>)}</div>
    </div>
  )
}
