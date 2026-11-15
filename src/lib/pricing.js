import { config, promos } from '../data/config.js'
import { peso } from './money.js'
export const promoLabel = (p) => (p.type === 'pct' ? p.value + '% off' : peso(p.value) + ' off')
export function calc(lines, code) {
  const sum = (f) => lines.filter(f).reduce((a, l) => a + l.qty, 0)
  const sub = lines.reduce((a, l) => a + l.qty * l.price, 0)
  const shakes = sum((l) => l.cat === 'shake')
  const fries = sum((l) => l.cat === 'fries')
  const pairs = Math.min(shakes, fries)
  const combo = Math.min(sub, pairs * config.comboOff)
  const base = sub - combo
  const p = code ? promos[code] : null
  const promoOk = !!p && base >= (p.min || 0)
  const promo = promoOk ? (p.type === 'pct' ? Math.round(base * p.value) / 100 : Math.min(p.value, base)) : 0
  return { sub, shakes, fries, pairs, combo, promo, promoOk, total: Math.max(0, base - promo) }
}
