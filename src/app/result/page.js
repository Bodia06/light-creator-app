'use client'
import Footer from '@/components/Footer'
import { useEffect, useState } from 'react'
import Registartion from '../dinamic-page/registration/page'

export default function Result () {
  const [isLooking, setIsLooking] = useState(false)
  const [totalMoc, setTotalMoc] = useState(0)

  useEffect(() => {
    const stored = localStorage.getItem('selectedItems')
    if (stored) {
      try {
        const items = JSON.parse(stored)
        let total = 0
        items.forEach(item => {
          item.selectedValues.forEach((value, index) => {
            const type = item.Type[index]
            if (!type) return
            const actualValues = Array.isArray(type.values[0])
              ? type.values[0]
              : type.values
            if (type.name.toLowerCase().includes('moc')) {
              const matched = actualValues.find(v => v === value)
              if (matched) {
                const mocNumber = parseInt(matched.replace('W', ''), 10)
                total += item.count * mocNumber
              }
            }
          })
        })
        setTotalMoc(total)
      } catch (e) {
        console.error('Error reading localStorage', e)
      }
    }
  }, [])

  return (
    <div className='w-full flex items-start justify-center flex-col'>
      <div className='w-full shadow-[0px_3px_5px] shadow-[#d7d7d7] h-[60px] flex items-center justify-start px-[20px]'>
        <p className='text-[20px]'>
          Moc opraw w twojej konfiguracji to{' '}
          <span className='text-[#d2b541] font-[bold]'>{`${totalMoc}W`}</span>
        </p>
      </div>
      {isLooking ? <Registartion setIsLooking={setIsLooking} /> : null}
      <Footer setIsLooking={setIsLooking} />
    </div>
  )
}
