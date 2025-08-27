'use client'
import { useState } from 'react'
import { useCanvas } from '@/context/CanvasContext'

export default function SetLengthRail () {
  const [value, setValue] = useState(1000)
  const { showLength, setShowLength, addConnector, setPageNameTaking } =
    useCanvas()

  if (!showLength) return null

  const handleSelect = svgPath => {
    addConnector(svgPath, value)
    setShowLength(false)
    setPageNameTaking('set-length-rail')
  }

  return (
    <div className='fixed inset-[0px] bg-[#fff] z-[50] flex flex-col max-w-[350px] p-[20px] gap-[30px] overflow-scroll'>
      <div className='flex w-full justify-end'>
        <button
          onClick={() => setShowLength(false)}
          className='w-[24px] h-[24px] cursor-pointer relative bg-transparent border-0 after:content-[""] after:inline-block after:w-[15px] after:h-[1px] after:bg-[#000] after:rotate-45 after:absolute after:top-[50%] after:translate-y-[-50%] after:right-[50%] after:translate-x-[50%] before:content-[""] before:w-[15px] before:h-[1px] before:bg-[#000] before:inline-block before:rotate-[-45deg] before:absolute before:top-[50%] before:translate-y-[-50%] before:right-[50%] before:translate-x-[50%]'
        ></button>
      </div>
      <div className='flex w-full flex-col gap-[10px]'>
        <h2 className='text-[16px] font-[bold]'>Ustaw szynę</h2>
        <p className='text-[13px] font-[bold] text-[#b0acac]'>
          Wpisz długość szyny ,którą chcesz zastosować w milimetrach(mm).
        </p>
      </div>
      <div className='flex flex-col'>
        <input
          type='number'
          value={value}
          min={100}
          max={3000}
          step={100}
          onChange={e => setValue(Number(e.target.value))}
          className='w-full p-[10px] text-[16px] font-[semibold] border border-[#b0acac] rounded-[5px] mb-[30px] appearance-none'
        />
        <input
          type='range'
          min={100}
          max={3000}
          step={100}
          value={value}
          onChange={e => setValue(Number(e.target.value))}
          className='w-full cursor-pointer mb-[20px]'
        />
        <button
          onClick={() => handleSelect('/connectors/line.svg')}
          className='w-full px-[30px] py-[10px] bg-[#000] border border-[#000] rounded-[10px] text-[#fff] font-[bold] flex justify-center items-center cursor-pointer text-[15px]'
        >
          Zastosuj
        </button>
      </div>
    </div>
  )
}
