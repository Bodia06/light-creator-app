'use client'
import { useCanvas } from '@/context/CanvasContext'
import React from 'react'

export default function DrawingField () {
  const { canvasRef, containerRef } = useCanvas()
  return (
    <div
      ref={containerRef}
      className='relative flex justify-center items-center p-4 w-full h-full'
    >
      <canvas
        ref={canvasRef}
        className='border border-gray-400 rounded-[5px] bg-white w-full h-full'
      />
    </div>
  )
}
