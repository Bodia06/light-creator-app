function ArrowUpDown (props) {
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
      <line x1='12' y1='2' x2='12' y2='22' />
      <line x1='2' y1='12' x2='22' y2='12' />
      <polyline points='12,2 10,4 14,4 12,2' />
      <polyline points='12,22 10,20 14,20 12,22' />
    </svg>
  )
}

export default ArrowUpDown
