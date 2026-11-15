import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <div className="container section center">
      <div className="orb sm">🍟</div>
      <h1>Page not found</h1>
      <p className="mut">That page ran out of stock.</p>
      <Link to="/menu" className="btn pri lg">Back to the menu</Link>
    </div>
  )
}
