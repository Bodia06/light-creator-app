'use client'
import { usePathname } from 'next/navigation'
import Link from '../../node_modules/next/dist/esm/client/link'
import { PATHNAME_VALUES } from '@/constans/pathNames'

export default function ButtonNav () {
  const pathname = usePathname()
  return (
    <header className='flex items-center  w-full h-[90px] overflow-hidden'>
      <div className='flex bg-[#b1b1b1]'>
        <img
          className=' w-[350px] h-[90px]'
          src='https://loonari.eu/configurator/images/lohotyp.svg'
          alt='Loonari Logo'
        />
      </div>
      <nav className='w-[100%] h-[100%] flex'>
        <ul className=' h-[100%] flex items-center gap-[70px] relative after:content-[""] after:border-[2px] after:border-solid after:w-[92%] after:absolute after:z-[-2]'>
          <li
            className={`${
              pathname === PATHNAME_VALUES.home
                ? 'bg-[#f1cb25]'
                : 'bg-[#b1b1b1]'
            } flex justify-center items-center relative h-[100%] w-[120px] font-[bold] after:content-[""] after:block after:w-[120px] after:h-[120px] after:rotate-45 after:absolute after:bg-[#f1cb25] after:left-[30px] after:z-[-1]`}
          >
            <Link
              className='no-underline text-[#000] text-[20px] cursor-pointer pointer-events-none '
              href={`${PATHNAME_VALUES.home}`}
            >
              Start
            </Link>
          </li>
          <li
            className={` flex flex-col h-full justify-end items-center gap-[10px] before:content-[""] before:block before:${
              pathname === PATHNAME_VALUES.rail ? 'bg-[#f1cb25]' : 'bg-[#000]'
            } before:w-[10px] before:h-[10px] before:rounded-full translate-y-[-10%]`}
          >
            <Link
              className='no-underline text-[20px] text-[#000] font-[bold] pointer-events-none'
              href={PATHNAME_VALUES.rail}
            >
              Wybierz szynę
            </Link>
          </li>
          <li
            className={` flex flex-col h-full justify-end items-center gap-[10px] before:content-[""] before:block before:${
              pathname === PATHNAME_VALUES.konfiguration
                ? 'bg-[#f1cb25]'
                : 'bg-[#000]'
            } before:w-[10px] before:h-[10px] before:rounded-full translate-y-[-10%]`}
          >
            <Link
              className='no-underline text-[20px] text-[#000] font-[bold] pointer-events-none'
              href={`${PATHNAME_VALUES.konfiguration}`}
            >
              Konfiguracja
            </Link>
          </li>
          <li
            className={` flex flex-col h-full justify-end items-center gap-[10px] before:content-[""] before:block before:${
              pathname === PATHNAME_VALUES.binding
                ? 'bg-[#f1cb25]'
                : 'bg-[#000]'
            } before:w-[10px] before:h-[10px] before:rounded-full translate-y-[-10%]`}
          >
            <Link
              className='no-underline text-[20px] text-[#000] font-[bold] pointer-events-none'
              href={`${PATHNAME_VALUES.binding}`}
            >
              Wybierz oprawy
            </Link>
          </li>
          <li
            className={` flex flex-col h-full justify-end items-center gap-[10px] before:content-[""] before:block before:${
              pathname === PATHNAME_VALUES.result ? 'bg-[#f1cb25]' : 'bg-[#000]'
            } before:w-[10px] before:h-[10px] before:rounded-full translate-y-[-10%]`}
          >
            <Link
              className='no-underline text-[20px] text-[#000] font-[bold] pointer-events-none'
              href={`${PATHNAME_VALUES.result}`}
            >
              Podsumowanie
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
