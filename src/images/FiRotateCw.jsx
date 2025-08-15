import * as React from 'react'

function FiRotateCw (props) {
  return (
    <svg
      stroke='currentColor'
      fill='none'
      strokeWidth={2}
      viewBox='0 0 24 24'
      strokeLinecap='round'
      strokeLinejoin='round'
      height='1em'
      width='1em'
      {...props}
    >
      <polyline points='23 4 23 10 17 10' />
      <path d='M20.49 15a9 9 0 1 1-2.12-9.36L23 10' />
    </svg>
  )
}

export default FiRotateCw
