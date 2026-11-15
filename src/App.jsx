import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import AnnounceBar from './components/AnnounceBar.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import ScrollTop from './components/ScrollTop.jsx'
import BackTop from './components/BackTop.jsx'
import Home from './pages/Home.jsx'
import Menu from './pages/Menu.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'
import { site } from './data/site.js'
const Gallery = lazy(() => import('./pages/Gallery.jsx'))
const Orders = lazy(() => import('./pages/Orders.jsx'))
const Receipt = lazy(() => import('./pages/Receipt.jsx'))
const QR = lazy(() => import('./pages/QR.jsx'))
const Print = lazy(() => import('./pages/Print.jsx'))
const Admin = lazy(() => import('./pages/Admin.jsx'))
const titles = { '/menu': 'Menu', '/about': 'About', '/contact': 'Contact', '/gallery': 'Gallery', '/orders': 'My orders', '/qr': 'Menu QR code', '/print': 'Printable menu', '/admin': 'Admin' }
export default function App() {
  const { pathname } = useLocation()
  useEffect(() => {
    const t = pathname.startsWith('/receipt') ? 'Order receipt' : titles[pathname]
    document.title = t ? t + ' · ' + site.name : site.name + ' · ' + site.tagline
  }, [pathname])
  return (
    <>
      <ScrollTop />
      <AnnounceBar />
      <Navbar />
      <main key={pathname} className="page">
        <Suspense fallback={<div className="container section"><div className="skel" /></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/receipt/:id" element={<Receipt />} />
            <Route path="/qr" element={<QR />} />
            <Route path="/print" element={<Print />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <CartDrawer />
      <BackTop />
    </>
  )
}
