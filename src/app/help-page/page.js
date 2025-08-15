'use client'
import AiOutlineFullscreen from '@/images/AiOutlineFullscreen'
import AiOutlineFullscreenExit from '@/images/AiOutlineFullscreenExit'
import AiOutlineRotateLeft from '@/images/AiOutlineRotateLeft'
import AiOutlineRotateRight from '@/images/AiOutlineRotateRight'
import BiRuler from '@/images/BiRuler'
import FiRotateCcw from '@/images/FiRotateCcw'
import FiRotateCw from '@/images/FiRotateCw'
import MdFilterCenterFocus from '@/images/MdFilterCenterFocus'
import React from 'react'

export default function HelpNavigation ({ onClose }) {
  return (
    <div className='fixed inset-[0px] bg-[#fff] z-[50] flex flex-col max-w-[350px] p-[20px]'>
      <div className='flex w-full justify-end'>
        <button
          onClick={onClose}
          className='w-[24px] h-[24px] cursor-pointer relative bg-transparent border-0 after:content-[""] after:inline-block after:w-[15px] after:h-[1px] after:bg-[#000] after:rotate-45 after:absolute after:top-[50%] after:translate-y-[-50%] after:right-[50%] after:translate-x-[50%] before:content-[""] before:w-[15px] before:h-[1px] before:bg-[#000] before:inline-block before:rotate-[-45deg] before:absolute before:top-[50%] before:translate-y-[-50%] before:right-[50%] before:translate-x-[50%]'
        ></button>
      </div>
      <div className='flex w-full flex-col gap-[10px] mb-[10px]'>
        <h2 className='text-[16px] font-[bold]'>Pomoc i poradnik</h2>
        <p className='text-[13px] font-[bold] text-[#b0acac]'>Warto wiedzić</p>
      </div>
      <ul className='flex flex-col gap-[10px] p-[20px]'>
        <li className='text-[17px] text-justify font-normal'>
          Każdą konfigurację można zapisać na przyszłość i/lub udostępnić
        </li>
        <li className='text-[17px] text-justify font-normal'>
          Szyny są dostarczane w odcinkach 1 m, 2 m lub 3 m, które trzeba
          przyciąć samodzielnie. W celu optymizacji skontaktuj się z
          dystrybutоrem.
        </li>
        <li className='text-[17px] text-justify font-normal'>
          Podczas konfiguracji szyny należy pamiętać, że pokazany jest widok
          powierzchni sufitu (od góry).
        </li>
        <li className='text-[17px] text-justify font-normal'>
          Skontaktuj się z nami pod numerem 516-753-660 lub przez e-mail
          hello@loonari.eu, jeśli potrzebujesz pomocy.
        </li>
      </ul>
      <div className='flex flex-col w-full h-full'>
        <h2 className='text-[16px] font-[bold]'>Klucz</h2>
        <div className='grid grid-cols-2 gap-[15px] w-full'>
          <div className='flex items-center gap-[10px]'>
            <button className='flex justify-center items-center text-[20px] p-[10px_20px] cursor-pointer rounded-[5px] border-[1px] border-[#000] bg-[#fff]'>
              <AiOutlineRotateLeft />
            </button>
            <h3 className='text-[#908f8f] font-[light]'>Cofnij</h3>
          </div>
          <div className='flex items-center gap-[10px]'>
            <button className='flex justify-center items-center text-[20px] p-[10px_20px] cursor-pointer rounded-[5px] border-[1px] border-[#000] bg-[#fff]'>
              <AiOutlineRotateRight />
            </button>
            <h3 className='text-[#908f8f] font-[light]'>Wykonaj ponownie</h3>
          </div>
          <div className='flex items-center gap-[10px]'>
            <button className='flex justify-center items-center text-[20px] p-[10px_20px] cursor-pointer rounded-[5px] border-[1px] border-[#000] bg-[#fff]'>
              <AiOutlineFullscreen />
            </button>
            <h3 className='text-[#908f8f] font-[light]'>Powiększ</h3>
          </div>
          <div className='flex items-center gap-[10px]'>
            <button className='flex justify-center items-center text-[20px] p-[10px_20px] cursor-pointer rounded-[5px] border-[1px] border-[#000] bg-[#fff]'>
              <AiOutlineFullscreenExit />
            </button>
            <h3 className='text-[#908f8f] font-[light]'>Pomniejsz</h3>
          </div>
          <div className='flex items-center gap-[10px]'>
            <button className='flex justify-center items-center text-[20px] p-[10px_20px] cursor-pointer rounded-[5px] border-[1px] border-[#000] bg-[#fff]'>
              <FiRotateCcw />
            </button>
            <h3 className='text-[#908f8f] font-[light]'>Obróć w lewo</h3>
          </div>
          <div className='flex items-center gap-[10px]'>
            <button className='flex justify-center items-center text-[20px] p-[10px_20px] cursor-pointer rounded-[5px] border-[1px] border-[#000] bg-[#fff]'>
              <FiRotateCw />
            </button>
            <h3 className='text-[#908f8f] font-[light]'>Obróć w prawo</h3>
          </div>
          <div className='flex items-center gap-[10px]'>
            <button className='flex justify-center items-center text-[20px] p-[10px_20px] cursor-pointer rounded-[5px] border-[1px] border-[#000] bg-[#fff]'>
              <BiRuler />
            </button>
            <h3 className='text-[#908f8f] font-[light]'>Wymiary</h3>
          </div>
          <div className='flex items-center gap-[10px]'>
            <button className='flex justify-center items-center text-[20px] p-[10px_20px] cursor-pointer rounded-[5px] border-[1px] border-[#000] bg-[#fff]'>
              <MdFilterCenterFocus />
            </button>
            <h3 className='text-[#908f8f] font-[light]'>Widok centralny</h3>
          </div>
        </div>
      </div>
    </div>
  )
}
