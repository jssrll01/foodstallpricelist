import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ToastProvider } from './context/ToastContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import './styles/base.css'
import './styles/layout.css'
import './styles/components.css'
import './styles/pages.css'
import './styles/features.css'
import './styles/dark.css'
import './styles/print.css'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter><ToastProvider><CartProvider><App /></CartProvider></ToastProvider></BrowserRouter>
  </StrictMode>
)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}))
}
