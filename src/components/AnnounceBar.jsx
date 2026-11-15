import Icon from './Icon.jsx'
import { useLive } from '../lib/useLive.js'
import { useLocal } from '../lib/store.js'
export default function AnnounceBar() {
  const { announcement } = useLive()
  const [seen, setSeen] = useLocal('annSeen', '')
  if (!announcement || seen === announcement) return null
  return (
    <div className="announce noprint">
      <span>{announcement}</span>
      <button onClick={() => setSeen(announcement)} aria-label="Dismiss"><Icon n="x" s={16} /></button>
    </div>
  )
}
