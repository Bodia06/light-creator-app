'use client'
import AssemblyItem from '@/components/AssemblyItem'
import AssemblyTypes from '@/components/AssemblyTypes'
import { PATHNAME_VALUES } from '@/constans/pathNames'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function TakeRail () {
  const [activeColor, setActiveColor] = useState('black')
  const [assemblyData, setAssemblyData] = useState([])
  const [assemblyIdActive, setAssemblyIdActive] = useState('')
  const [activeTypeCode, setActiveTypeCode] = useState('')
  const router = useRouter()

  const handlerTakeColor = color => {
    setActiveColor(color)
  }

  const handlerActiveAssembly = id => {
    setAssemblyIdActive(id)
    const assembly = assemblyData.find(item => item.id === id)
    if (assembly && assembly.type.length > 0) {
      setActiveTypeCode(assembly.type[0].code)
    }
  }

  const handlerActiveType = code => {
    setActiveTypeCode(code)
  }

  const handlerNextPage = () => {
    router.push(`${PATHNAME_VALUES.konfiguration}`)
  }

  useEffect(() => {
    fetch('/data/assemblyData.json')
      .then(res => res.json())
      .then(data => {
        setAssemblyData(data)
        if (data.length > 0) {
          setAssemblyIdActive(data[0].id)
          if (data[0].type.length > 0) {
            setActiveTypeCode(data[0].type[0].code)
          }
        }
      })
      .catch(err => console.error('Error fetching data:', err))
  }, [])

  return (
    <div className='flex flex-col items-center w-full p-[40px] gap-[40px] bg-[#e3e2e2] relative'>
      <div className='flex flex-col gap-[20px] w-full items-center'>
        <h2 className='text-[20px] font-[medium]'>Wybierz kolor szyn</h2>
        <div className='flex items-center gap-[20px] w-full justify-center'>
          <button
            onClick={() => handlerTakeColor('black')}
            className={`w-[40px] h-[40px] bg-[#000] block border-[2px] cursor-pointer ${
              activeColor === 'black' ? 'border-[#f1cb25]' : 'border-[#b1b1b1]'
            }`}
          ></button>
          <button
            onClick={() => handlerTakeColor('yellow')}
            className={`w-[40px] h-[40px] bg-[#fff] block border-[2px] cursor-pointer ${
              activeColor === 'yellow' ? 'border-[#f1cb25]' : 'border-[#b1b1b1]'
            }`}
          ></button>
        </div>
      </div>

      <div className='w-[650px] flex-none flex flex-col'>
        <h2 className='w-full text-[20px] font-[medium] mb-[20px]'>
          Wybierz sposób montażu
        </h2>
        <ul className='w-full flex gap-[20px]'>
          {assemblyData.map(item => (
            <AssemblyItem
              key={item.id}
              item={item}
              isActive={assemblyIdActive === item.id}
              onClick={() => handlerActiveAssembly(item.id)}
            />
          ))}
        </ul>
      </div>

      <div className='w-[650px] flex flex-col'>
        <h2 className='w-full text-[20px] font-[medium] mb-[20px]'>
          Wybierz typ szyny
        </h2>
        <ul className='w-full flex gap-[20px]'>
          {assemblyData
            .filter(item => item.id === assemblyIdActive)
            .flatMap(item => item.type)
            .map(type => (
              <AssemblyTypes
                key={type.code}
                type={type}
                isActive={activeTypeCode === type.code}
                onClick={() => handlerActiveType(type.code)}
              />
            ))}
        </ul>
      </div>
      <div className='fixed bottom-[20px] right-[20px]'>
        <button
          className='text-[white] px-[20px] py-[10px] text-[20px] font-[bold] border-[1px] border-[#000] bg-[#000] rounded-[5px] cursor-pointer hover:opacity-80'
          onClick={handlerNextPage}
        >
          Dalej
        </button>
      </div>
    </div>
  )
}
