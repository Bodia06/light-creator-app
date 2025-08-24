'use client'
import { PATHNAME_VALUES } from '@/constans/pathNames'
import { usePathname, useRouter } from 'next/navigation'

export default function Footer () {
  const pathname = usePathname()
  const router = useRouter()

  const handleBackToConfig = () => {
    if (pathname !== `${PATHNAME_VALUES.konfiguration}`) {
      router.push(`${PATHNAME_VALUES.konfiguration}`)
    } else {
      router.push(`${PATHNAME_VALUES.rail}`)
    }
  }

  const handleNextPage = () => {
    if (pathname == `${PATHNAME_VALUES.konfiguration}`) {
      router.push(`${PATHNAME_VALUES.binding}`)
    } else {
      router.push(`${PATHNAME_VALUES.result}`)
    }
  }

  return (
    <div className='flex justify-between items-center p-[20px] border-t-[1px] border-[solid] border-[#d7d7d7] h-[90px] fixed bottom-[0px] left-[0px] right-[0px] z-[10] bg-[#fff]'>
      <p className='text-[17px] text-[#6c6c6c]'>
        Potrzebujesz pomocy? Skontaktuj się z nami tel.{' '}
        <a className='no-underline text-[#6c6c6c]' href='tel:727930530'>
          727-930-530
        </a>{' '}
        lub przez pocztę{' '}
        <a
          className='no-underline text-[#6c6c6c]'
          href='mailto:hello@loonari.eu'
        >
          hello@loonari.eu
        </a>
      </p>
      <div className='flex gap-[20px] px-[20px]'>
        <button
          onClick={handleBackToConfig}
          className='flex p-[5px_10px] font-[bold] bg-[#fff] border-[1px] border-[#d7d7d7] text-[#000] text-[15px] rounded-[10px] cursor-pointer hover:bg-[#cfc9c9]'
        >
          {pathname === '/konfiguration'
            ? 'Rozpocznij ponownie'
            : 'Powrót do konfiguracji'}
        </button>
        <button
          onClick={handleNextPage}
          className='flex p-[5px_10px] font-[bold] bg-[#000] border-[1px] border-[#000] text-[#fff] text-[15px] rounded-[10px] cursor-pointer hover:opacity-[0.8]'
        >
          Dalej
        </button>
      </div>
    </div>
  )
}
