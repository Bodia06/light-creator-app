'use client'
import { useCanvas } from '@/context/CanvasContext'
import AiOutlineArrowRight from '@/images/AiOutlineArrowRight'
import ArrowRightDown from '@/images/ArrowRightDown'
import ArrowUpDown from '@/images/ArrowUpDown'
import ArrowUpRight from '@/images/ArrowUpRight'
import BsArrow90DegDown from '@/images/BsArrow90DegDown'
import BsArrow90DegUp from '@/images/BsArrow90DegUp'
import { useEffect, useState } from 'react'

export default function SetConnector () {
  const [selectedRail, setSelectedRail] = useState(null)
  const {
    showConnector,
    setShowConnector,
    addConnector,
    setSelectedConnector,
    setPageNameTaking
  } = useCanvas()

  useEffect(() => {
    const data = localStorage.getItem('selectedRail')
    if (data) {
      setSelectedRail(JSON.parse(data))
    }
  }, [])

  if (!showConnector) return null

  const handleSelect = (svgPath, direction = '') => {
    addConnector(svgPath, null, direction)
    setSelectedConnector(svgPath)
    setShowConnector(false)
    setPageNameTaking('set-connector')
  }

  return (
    <div className='fixed inset-[0px] bg-[#fff] z-[50] flex flex-col max-w-[350px] p-[20px] gap-[30px] overflow-scroll'>
      <div className='flex w-full justify-end'>
        <button
          onClick={() => setShowConnector(false)}
          className='w-[24px] h-[24px] cursor-pointer relative bg-transparent border-0 after:content-[""] after:inline-block after:w-[15px] after:h-[1px] after:bg-[#000] after:rotate-45 after:absolute after:top-[50%] after:translate-y-[-50%] after:right-[50%] after:translate-x-[50%] before:content-[""] before:w-[15px] before:h-[1px] before:bg-[#000] before:inline-block before:rotate-[-45deg] before:absolute before:top-[50%] before:translate-y-[-50%] before:right-[50%] before:translate-x-[50%]'
        ></button>
      </div>
      <div className='flex w-full flex-col gap-[10px]'>
        <h2 className='text-[16px] font-[bold]'>Ustaw złącznik</h2>
        <p className='text-[13px] font-[bold] text-[#b0acac]'>
          Wybierz kierunek w którym chcesz iść dalej.
        </p>
      </div>
      <div className='flex w-full flex-col gap-[30px] h-full'>
        {selectedRail ? (
          (selectedRail.assemblyId === 'natynkowy' &&
            selectedRail.typeCode === 'typeA') ||
          (selectedRail.assemblyId === 'zwieszany' &&
            selectedRail.typeCode === 'typeA') ? (
            <button
              onClick={() => handleSelect('', '')}
              className='w-full h-[100px] bg-[#000] border border-[#000] rounded-[5px] flex justify-center items-center cursor-pointer'
            >
              <AiOutlineArrowRight width='100px' height='25px' />
            </button>
          ) : (
            <>
              <button
                onClick={() => handleSelect('/connectors/up.svg', 'up')}
                className='w-full h-[100px] bg-[#000] border border-[#000] rounded-[5px] flex justify-center items-center cursor-pointer'
              >
                <BsArrow90DegUp width='100px' height='30px' />
              </button>
              <button
                onClick={() => handleSelect('', '')}
                className='w-full h-[100px] bg-[#000] border border-[#000] rounded-[5px] flex justify-center items-center cursor-pointer'
              >
                <AiOutlineArrowRight width='100px' height='25px' />
              </button>
              <button
                onClick={() => handleSelect('/connectors/down.svg', 'down')}
                className='w-full h-[100px] bg-[#000] border border-[#000] rounded-[5px] flex justify-center items-center cursor-pointer'
              >
                <BsArrow90DegDown width='100px' height='25px' />
              </button>
              <button
                onClick={() =>
                  handleSelect('/connectors/upRight.svg', 'upRight')
                }
                className='w-full h-[100px] bg-[#000] border border-[#000] rounded-[5px] flex justify-center items-center cursor-pointer'
              >
                <ArrowUpRight width='100px' height='25px' />
              </button>
              <button
                onClick={() => handleSelect('/connectors/upDown.svg', 'upDown')}
                className='w-full h-[100px] bg-[#000] border border-[#000] rounded-[5px] flex justify-center items-center cursor-pointer'
              >
                <ArrowUpDown width='100px' height='25px' />
              </button>
              <button
                onClick={() =>
                  handleSelect('/connectors/rightDown.svg', 'rightDown')
                }
                className='w-full h-[100px] bg-[#000] border border-[#000] rounded-[5px] flex justify-center items-center cursor-pointer'
              >
                <ArrowRightDown width='100px' height='25px' />
              </button>
            </>
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  )
}
