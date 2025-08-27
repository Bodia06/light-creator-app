'use client'
import React, { useState } from 'react'
import HelpNavigation from '../dinamic-page/help-page/page'
import Footer from '@/components/Footer'
import DrawingField from '@/components/konfigurationEl/DrawingField'
import ButtonNavDraw from '@/components/konfigurationEl/ButtonNavDraw'
import SetConnector from '@/components/konfigurationEl/SetConnector'
import { CanvasProvider } from '@/context/CanvasContext'
import SetLengthRail from '@/components/konfigurationEl/SetLengthRail'

export default function Konfiguration () {
  const [isActiveHelpPage, setIsActiveHelpPage] = useState(false)

  const handleHelpPageClick = () => {
    setIsActiveHelpPage(!isActiveHelpPage)
  }

  return (
    <div className='flex flex-col justify-center w-full h-full'>
      <div className='flex px-[30px] py-[20px]'>
        <button
          onClick={handleHelpPageClick}
          className='flex justify-center items-center px-[15px] py-[10px] bg-[#fff] border-[2px] border-[#d7d7d7] rounded-[10px] text-[15px] font-bold cursor-pointer hover:bg-[#cfc9c9]'
        >
          Pomoc i poradnik
        </button>
      </div>

      {isActiveHelpPage && <HelpNavigation onClose={handleHelpPageClick} />}

      <CanvasProvider>
        <div className='w-full h-[calc(100vh-270px)] px-[30px] py-[20px]'>
          <DrawingField />
        </div>
        <ButtonNavDraw />
        <SetConnector />
        <SetLengthRail />
      </CanvasProvider>
      <Footer />
    </div>
  )
}
