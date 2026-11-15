import { site } from '../data/site.js'
import { config } from '../data/config.js'
import { peso } from './money.js'
export function orderText(o) {
  const L = [site.name + ' - Order ' + o.no]
  if (o.name) L.push('Name: ' + o.name)
  L.push(o.type + ' - ' + (o.when === 'ASAP' ? 'as soon as possible' : 'in ' + o.when), '')
  o.lines.forEach((l) => {
    L.push(l.qty + ' x ' + l.name + (l.label ? ' (' + l.label + ')' : '') + ' - ' + peso(l.qty * l.price))
    if (l.extras && l.extras.length) L.push('   + ' + l.extras.join(', '))
  })
  L.push('')
  if (o.combo > 0) L.push('Combo discount: -' + peso(o.combo))
  if (o.promo > 0) L.push('Promo ' + o.code + ': -' + peso(o.promo))
  L.push('Total: ' + peso(o.total))
  if (o.reward) L.push('Reward unlocked: ' + config.rewardText)
  if (o.note) L.push('Note: ' + o.note)
  return L.join('\n')
}
