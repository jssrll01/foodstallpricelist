const f = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', minimumFractionDigits: 0, maximumFractionDigits: 2 })
export const peso = (n) => f.format(Number(n) || 0)
