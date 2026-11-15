import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react'
import { useToast } from './ToastContext.jsx'
const Ctx = createContext(null)
const KEY = 'stall_cart_v2'
const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || [] } catch { return [] } }
const put = (s, item, n = 1) =>
  s.some((x) => x.key === item.key) ? s.map((x) => (x.key === item.key ? { ...x, qty: x.qty + n } : x)) : [...s, { ...item, qty: n }]
function reducer(s, a) {
  switch (a.type) {
    case 'add': return put(s, a.item, a.n)
    case 'merge': return a.lines.reduce((acc, l) => put(acc, l, l.qty), s)
    case 'inc': return s.map((x) => (x.key === a.key ? { ...x, qty: x.qty + 1 } : x))
    case 'dec': return s.flatMap((x) => (x.key === a.key ? (x.qty > 1 ? [{ ...x, qty: x.qty - 1 }] : []) : [x]))
    case 'clear': return []
    default: return s
  }
}
export function CartProvider({ children }) {
  const toast = useToast()
  const [lines, dispatch] = useReducer(reducer, [], load)
  const [open, setOpen] = useState(false)
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(lines)) } catch {} }, [lines])
  const value = useMemo(() => ({
    lines, open, setOpen, dispatch,
    count: lines.reduce((a, l) => a + l.qty, 0),
    add: (item, v, extras = [], qty = 1) => {
      const ids = extras.map((e) => e.id).sort().join('+')
      dispatch({
        type: 'add', n: qty,
        item: {
          key: item.id + '|' + v.label + '|' + ids, id: item.id, cat: item.cat, name: item.name, label: v.label,
          extras: extras.map((e) => e.name), price: v.price + extras.reduce((a, e) => a + e.price, 0),
          color: item.color, emoji: item.cat === 'fries' ? '🍟' : '🥤',
        },
      })
      toast('Added ' + item.name)
      try { navigator.vibrate && navigator.vibrate(15) } catch {}
    },
    addMany: (ls) => { dispatch({ type: 'merge', lines: ls }); toast('Items added to your order') },
  }), [lines, open, toast])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
export const useCart = () => useContext(Ctx)
