import { useSyncExternalStore } from 'react'
const subs = new Set()
const cache = {}
export const readLocal = (k, d) => {
  if (!(k in cache)) {
    try { const v = localStorage.getItem('stall_' + k); cache[k] = v == null ? d : JSON.parse(v) } catch { cache[k] = d }
  }
  return cache[k]
}
export const writeLocal = (k, v) => {
  cache[k] = v
  try { localStorage.setItem('stall_' + k, JSON.stringify(v)) } catch {}
  subs.forEach((f) => f())
}
const sub = (f) => { subs.add(f); return () => subs.delete(f) }
export function useLocal(k, d) {
  const v = useSyncExternalStore(sub, () => readLocal(k, d))
  return [v, (n) => writeLocal(k, typeof n === 'function' ? n(readLocal(k, d)) : n)]
}
