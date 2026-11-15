import Parallax from './Parallax.jsx'
// Soft neumorphic shapes that drift at different speeds behind the menu.
const shapes = [
  { cls: 'ring', speed: 0.06, style: { width: 340, height: 340, top: '4%', right: '-120px' } },
  { cls: 'disc', speed: 0.16, style: { width: 120, height: 120, top: '30%', left: '-40px' } },
  { cls: 'ring', speed: 0.1, style: { width: 220, height: 220, top: '58%', right: '-70px' } },
  { cls: 'disc', speed: 0.22, style: { width: 80, height: 80, top: '78%', left: '8%' } },
]
export default function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      {shapes.map((s, i) => (
        <Parallax key={i} speed={s.speed} className="shape-wrap" style={s.style}><div className={'shape ' + s.cls} /></Parallax>
      ))}
    </div>
  )
}
