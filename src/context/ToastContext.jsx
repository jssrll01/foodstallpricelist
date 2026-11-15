import { createContext, useCallback, useContext, useRef, useState } from 'react'
const Ctx = createContext(() => {})
export function ToastProvider({ children }) {
  const [list, setList] = useState([])
  const id = useRef(0)
  const toast = useCallback((msg) => {
    const k = ++id.current
    setList((l) => [...l.slice(-2), { k, msg }])
    setTimeout(() => setList((l) => l.filter((t) => t.k !== k)), 2200)
  }, [])
  return (
    <Ctx.Provider value={toast}>
      {children}
      <div className="toasts noprint" aria-live="polite">
        {list.map((t) => <div key={t.k} className="toast glass-m">{t.msg}</div>)}
      </div>
    </Ctx.Provider>
  )
}
export const useToast = () => useContext(Ctx)
