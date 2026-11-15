export const categories = [
  { id: 'shake', name: 'Shakes', emoji: '🥤', blurb: 'Thick, cold and blended fresh.' },
  { id: 'fries', name: 'Fries', emoji: '🍟', blurb: 'Hot, golden and perfectly salted.' },
]
const one = (price) => [{ label: '', price }]
export const items = [
  { id: 'red-velvet', cat: 'shake', name: 'Red Velvet', color: '#e5484d', tag: 'Best seller', variants: one(50) },
  { id: 'ube-macapuno', cat: 'shake', name: 'Ube Macapuno', color: '#8e4ec6', tag: 'Local favorite', variants: one(40) },
  { id: 'matcha', cat: 'shake', name: 'Matcha', color: '#6aa84f', variants: one(50) },
  { id: 'cookies-creme', cat: 'shake', name: 'Cookies & Creme', color: '#7a6a62', tag: 'Popular', variants: one(45) },
  { id: 'cappuccino', cat: 'shake', name: 'Cappuccino', color: '#a47551', variants: one(45) },
  { id: 'chocomousse', cat: 'shake', name: 'Chocomousse', color: '#5c3a2e', variants: one(45) },
  { id: 'choco-kisses', cat: 'shake', name: 'Choco Kisses', color: '#7b4a3a', variants: one(45) },
  { id: 'avocado', cat: 'shake', name: 'Avocado', color: '#7bb661', variants: one(40) },
  { id: 'fries', cat: 'fries', name: 'Crispy Fries', color: '#f5b82e', tag: 'Pick your size', variants: [
    { label: 'Regular', price: 20 }, { label: 'Medium', price: 40 }, { label: 'Large', price: 50 },
  ] },
]
export const minPrice = (it) => Math.min(...it.variants.map((v) => v.price))
