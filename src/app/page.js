'use client'

import { PATHNAME_VALUES } from '@/constans/pathNames'
import { saveAllData } from '@/firebase/config'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home () {
  const router = useRouter()

  useEffect(() => {
    saveAllData()
  }, [])

  const handlerStart = () => {
    router.push(`${PATHNAME_VALUES.rail}`)
  }
  return (
    <div className='w-full h-[calc(100vh-90px)] relative overflow-hidden'>
      <div className='w-full h-full'>
        <img
          className='w-full h-full object-cover object-center'
          src='https://loonari.eu/configurator/images/tlo.png'
          alt='Background Photo'
        />
      </div>
      <div className='flex justify-content items-center absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]'>
        <button
          className='p-[10px_20px] text-[20px] font-[bold] cursor-pointer rounded-[15px] border-[1px] border-solid border-[#fff] bg-[#fff] hover:bg-[#b1b1b1] hover:border-[#b1b1b1]'
          onClick={handlerStart}
        >
          Rozpocznij
        </button>
      </div>
    </div>
  )
}
