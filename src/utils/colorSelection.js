const colors = [
  {
    label: 'Biru',
    hex: '#6285f6',
  },
  {
    label: 'Merah',
    hex: '#ff4c51',
  },
  {
    label: 'Kuning',
    hex: '#ffb400',
  },
  {
    label: 'Hijau',
    hex: '#56ca00',
  },
  {
    label: 'Abu Abu',
    hex: '#8a8d93',
  },
  {
    label: 'Biru Muda',
    hex: '#2EB9FF',
  },
  {
    label: 'Ungu',
    hex: '#AF62F8',
  },
  {
    label: 'Merah Muda',
    hex: '#FB85C1',
  },
  {
    label: 'Oranye',
    hex: '#F69035',
  },
  {
    label: 'Cokelat',
    hex: '#8C5638',
  },
]

const randomizeColor = () => colors[Math.floor(Math.random() * colors.length)]

export {
  colors,
  randomizeColor,
}
