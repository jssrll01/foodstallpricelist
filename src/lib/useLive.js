import { live } from '../data/live.js'
import { useLocal } from './store.js'
export function useLive() {
  const [o] = useLocal('live', {})
  return {
    announcement: o.announcement ?? live.announcement,
    special: o.special ?? live.special,
    soldOut: o.soldOut ?? live.soldOut,
  }
}
