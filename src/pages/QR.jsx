import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import Icon from '../components/Icon.jsx'
import { site } from '../data/site.js'
export default function QR() {
  const [link, setLink] = useState(window.location.origin + '/menu')
  const [src, setSrc] = useState('')
  useEffect(() => {
    let on = true
    QRCode.toDataURL(link || ' ', { width: 640, margin: 2 }).then((d) => on && setSrc(d)).catch(() => on && setSrc(''))
    return () => { on = false }
  }, [link])
  return (
    <div className="container section">
      <div className="page-head noprint"><h1>Menu QR code</h1><p className="mut">Print it and put it on your stand. Customers scan to order.</p></div>
      <div className="qrbox glass-m">
        <h2 className="print-only">{site.name}</h2>
        {src && <img src={src} alt="QR code for the menu" />}
        <p className="print-only">Scan to see the menu and order</p>
        <input className="field noprint" value={link} onChange={(e) => setLink(e.target.value)} aria-label="Link" />
        <div className="row noprint">
          <a className="btn pri" href={src} download="menu-qr.png"><Icon n="download" s={18} />Download</a>
          <button className="btn" onClick={() => window.print()}><Icon n="printer" s={18} />Print</button>
        </div>
        <small className="mut noprint">After you deploy, replace the link with your real website address.</small>
      </div>
    </div>
  )
}
