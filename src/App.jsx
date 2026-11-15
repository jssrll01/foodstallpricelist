import Backdrop from './components/Backdrop.jsx'
import Header from './components/Header.jsx'
import CategoryNav from './components/CategoryNav.jsx'
import MenuSection from './components/MenuSection.jsx'
import Footer from './components/Footer.jsx'
import { menu } from './data/menu.js'
export default function App() {
  return (
    <>
      <Backdrop />
      <div className="wrap top"><Header /></div>
      <CategoryNav />
      <main className="wrap stack">
        {menu.map((c) => <MenuSection key={c.id} cat={c} />)}
        <Footer />
      </main>
    </>
  )
}
