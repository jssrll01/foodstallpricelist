// One shared scroll listener moves every parallax layer. No React re-renders.
const items = new Set()
const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
let queued = false
const run = () => {
  queued = false
  const y = window.scrollY
  items.forEach(({ el, speed }) => { el.style.transform = 'translate3d(0,' + (-y * speed).toFixed(1) + 'px,0)' })
}
const onScroll = () => { if (!queued) { queued = true; requestAnimationFrame(run) } }
export function addParallax(el, speed) {
  if (reduced || !el) return () => {}
  if (!items.size) window.addEventListener('scroll', onScroll, { passive: true })
  const it = { el, speed }
  items.add(it)
  run()
  return () => { items.delete(it); if (!items.size) window.removeEventListener('scroll', onScroll) }
}
