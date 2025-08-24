'use client'
import { useState } from 'react'
import AiOutlineFullscreen from '@/images/AiOutlineFullscreen'
import AiOutlineFullscreenExit from '@/images/AiOutlineFullscreenExit'
import FiRotateCcw from '@/images/FiRotateCcw'
import FiRotateCw from '@/images/FiRotateCw'
import BiRuler from '@/images/BiRuler'
import MdFilterCenterFocus from '@/images/MdFilterCenterFocus'
import AiOutlineRotateLeft from '@/images/AiOutlineRotateLeft'
import AiOutlineRotateRight from '@/images/AiOutlineRotateRight'
import { useCanvas } from '@/context/CanvasContext'

export default function ButtonNavDraw () {
  const [degree, setDegree] = useState(0)
  const { zoomIn, zoomOut } = useCanvas()
  return (
    <div className='flex flex-col gap-[20px] fixed top-[65%] right-[10px] transform -translate-y-[65%] z-50 p-[10px] bg-[#fff] border border-[#d7d7d7] rounded-[10px] shadow-lg'>
      <button className='flex items-center justify-center w-[50px] h-[30px] bg-transparent border border-[#d7d7d7] rounded-[5px] text-[15px] cursor-pointer hover:bg-[#e4e3e3]'>
        <FiRotateCcw />
      </button>
      <button className='flex items-center justify-center w-[50px] h-[30px] bg-transparent border border-[#d7d7d7] rounded-[5px] text-[15px] cursor-pointer hover:bg-[#e4e3e3]'>
        <FiRotateCw />
      </button>
      <button className='flex items-center justify-center w-[50px] h-[30px] bg-transparent border border-[#d7d7d7] rounded-[5px] text-[15px] cursor-pointer hover:bg-[#e4e3e3]'>
        <BiRuler />
      </button>
      <button
        onClick={zoomIn}
        className='flex items-center justify-center w-[50px] h-[30px] bg-transparent border border-[#d7d7d7] rounded-[5px] text-[15px] cursor-pointer hover:bg-[#e4e3e3]'
      >
        <AiOutlineFullscreen />
      </button>
      <button
        onClick={zoomOut}
        className='flex items-center justify-center w-[50px] h-[30px] bg-transparent border border-[#d7d7d7] rounded-[5px] text-[15px] cursor-pointer hover:bg-[#e4e3e3]'
      >
        <AiOutlineFullscreenExit />
      </button>
      <button className='flex items-center justify-center w-[50px] h-[30px] bg-transparent border border-[#d7d7d7] rounded-[5px] text-[15px] cursor-pointer hover:bg-[#e4e3e3]'>
        <MdFilterCenterFocus />
      </button>
      <button className='flex items-center justify-center w-[50px] h-[30px] bg-transparent border border-[#d7d7d7] rounded-[5px] text-[15px] cursor-pointer hover:bg-[#e4e3e3]'>
        <AiOutlineRotateLeft />
      </button>
      <button className='flex items-center justify-center w-[50px] h-[30px] bg-transparent border border-[#d7d7d7] rounded-[5px] text-[15px] cursor-pointer hover:bg-[#e4e3e3]'>
        <AiOutlineRotateRight />
      </button>
      <button className='flex items-center justify-center w-[50px] h-[30px] bg-transparent border border-[#d7d7d7] rounded-[5px] text-[15px]'>
        {`${degree}°`}
      </button>
    </div>
  )
}
