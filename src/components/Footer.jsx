import { Link } from 'react-router-dom'
import StatusBadge from './StatusBadge.jsx'
import InstallButton from './InstallButton.jsx'
import { site } from '../data/site.js'
export default function Footer() {
  return (
    <footer className="footer noprint">
      <div className="container foot-in">
        <div><b>{site.name}</b><p className="mut">{site.tagline}</p><StatusBadge /></div>
        <div className="foot-links"><Link to="/menu">Menu</Link><Link to="/gallery">Gallery</Link><Link to="/about">About</Link><Link to="/contact">Contact</Link><Link to="/orders">My orders</Link></div>
        <div className="foot-links small mut"><Link to="/qr">Menu QR</Link><Link to="/print">Print menu</Link><Link to="/admin">Admin</Link></div>
        <div className="row"><InstallButton /></div>
        <p className="mut small">© {new Date().getFullYear()} {site.name}. All prices in PHP.</p>
      </div>
    </footer>
  )
}
