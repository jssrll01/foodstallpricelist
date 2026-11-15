import { Link, NavLink } from 'react-router-dom'
import Icon from './Icon.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import { useCart } from '../context/CartContext.jsx'
import { site } from '../data/site.js'
const links = [['/', 'Home', 'home'], ['/menu', 'Menu', 'menu'], ['/gallery', 'Gallery', 'image'], ['/about', 'About', 'info'], ['/contact', 'Contact', 'chat']]
export default function Navbar() {
  const { count, setOpen } = useCart()
  return (
    <header className="topbar glass noprint">
      <div className="container topbar-in">
        <Link to="/" className="brand"><span className="brand-dot">🥤</span><span className="brand-name">{site.name}</span></Link>
        <nav className="tabs glass-m" aria-label="Main">
          {links.map(([to, label, ic]) => (
            <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => 'tab' + (isActive ? ' on' : '')}>
              <Icon n={ic} s={20} /><span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="actions">
          <ThemeToggle />
          <Link to="/orders" className="cartbtn" aria-label="My orders"><Icon n="receipt" /></Link>
          <button className="cartbtn" onClick={() => setOpen(true)} aria-label="Open order">
            <Icon n="bag" />
            {count > 0 && <b key={count} className="badge pop">{count}</b>}
          </button>
        </div>
      </div>
    </header>
  )
}
