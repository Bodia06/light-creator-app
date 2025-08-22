function ArrowUpRight (props) {
  return (
    <svg
      width='100'
      height='30'
      viewBox='0 0 24 24'
      fill='none'
      stroke='white'
      strokeWidth='2'
      {...props}
    >
      <line x1='2' y1='12' x2='18' y2='12' />
      <line x1='12' y1='2' x2='12' y2='12' />
      <polyline points='12,2 10,4 14,4 12,2' />
      <polyline points='18,12 16,10 16,14 18,12' />
    </svg>
  )
}

export default ArrowUpRight
