import Reveal from './Reveal.jsx'
import { reviews } from '../data/reviews.js'
export default function Testimonials() {
  if (!reviews.length) return null
  return (
    <section className="section container">
      <Reveal><h2 className="h2">What customers say</h2></Reveal>
      <div className="grid3">
        {reviews.map((r, i) => (
          <Reveal key={i} delay={i * 80}>
            <div className="rev glass-m"><div className="stars">{'★'.repeat(r.stars || 5)}</div><p>“{r.text}”</p><b>{r.name}</b></div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
