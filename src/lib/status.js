import { config } from '../data/config.js'
const fmt = (h) => { h = h % 24; return (h % 12 || 12) + ':00 ' + (h >= 12 ? 'PM' : 'AM') }
export function openStatus(now = new Date()) {
  const h = now.getHours() + now.getMinutes() / 60
  const { openHour: o, closeHour: c } = config
  const open = o < c ? h >= o && h < c : h >= o || h < c
  return { open, text: open ? 'Open now · until ' + fmt(c) : 'Closed · opens ' + fmt(o) }
}
