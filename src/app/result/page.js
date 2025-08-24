'use client'
import Footer from '@/components/Footer'
import { useEffect, useState } from 'react'
import Registartion from '../dinamic-page/registration/page'
import { useRouter } from 'next/navigation'
import { PATHNAME_VALUES } from '@/constans/pathNames'

export default function Result () {
  const [isLooking, setIsLooking] = useState(false)
  const [totalMoc, setTotalMoc] = useState(0)
  const [isOpeningContant, setIsOpeningContant] = useState(false)
  const [color, setColor] = useState('')
  const [selectedItems, setSelectedItems] = useState([])

  const router = useRouter()

  useEffect(() => {
    const storedRail = localStorage.getItem('selectedRail')
    if (storedRail) {
      try {
        const parsed = JSON.parse(storedRail)
        if (parsed.color) {
          setColor(parsed.color)
        }
      } catch (e) {
        console.error('Error reading localStorage for color', e)
      }
    }
  }, [])

  useEffect(() => {
    const storedItems = localStorage.getItem('selectedItems')
    if (storedItems) {
      try {
        const parsedItems = JSON.parse(storedItems)
        setSelectedItems(parsedItems)
      } catch (e) {
        console.error('Error parsing selectedItems from localStorage', e)
      }
    }
  }, [])

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

  const handleBackPage = () => {
    router.push(`${PATHNAME_VALUES.konfiguration}`)
  }

  return (
    <div className='w-full flex items-start justify-center flex-col'>
      <div className='w-full shadow-[0px_3px_5px] shadow-[#d7d7d7] h-[60px] flex items-center justify-start px-[20px]'>
        <p className='text-[20px]'>
          Moc opraw w twojej konfiguracji to{' '}
          <span className='text-[#d2b541] font-[bold]'>{`${totalMoc}W`}</span>
        </p>
      </div>
      {isOpeningContant ? (
        <div className='flex items-center justify-center w-full'>
          <div className='flex flex-col max-w-[1200px] w-full gap-[10px] py-[40px]'>
            <div>
              <h2 className='text-[30px] font-[bold]'>
                Zdjęcie twojego układu:
                <div className='w-full h-[450px] border-t-[1px] border-b-[1px] border-[#d7d7d7]'></div>
              </h2>
            </div>
            <div className='flex items-center w-full gap-[10px]'>
              <h2 className='text-[30px] font-[bold]'>
                Kolor elementów twojego układu:
              </h2>
              <div
                className={`w-[40px] h-[40px] ${
                  color === 'black' ? 'bg-[#000]' : 'bg-[#fff]'
                }`}
              ></div>
            </div>
            <div className='flex flex-col items-start justify-center gap-[10px]'>
              <h2 className='text-[30px] font-[bold]'>
                Elementy twojego układu
              </h2>
              <div>Brak Elementów</div>
            </div>
            <div className='flex flex-col items-start justify-center gap-[10px]'>
              <h2 className='text-[30px] font-[bold]'>
                Wybrane oprawy i zasilacze
              </h2>
              <div className='flex flex-col items-start justify-center gap-[20px] w-full border-b-[2px] border-[#d7d7d7] pb-[20px]'>
                {selectedItems.length === 0 && <p>Brak elementów</p>}
                {selectedItems.map(item => (
                  <div
                    key={item._uniqueId}
                    className='inline-flex items-start justify-start w-full border border-[#d7d7d7] rounded-[10px] gap-[20px] py-[20px] px-[10px]'
                  >
                    <div className='w-[250px] flex items-center justify-center'>
                      <img
                        src={item.SrcImg}
                        className='w-[200px] h-[150px] object-contain'
                      />
                    </div>
                    <div className='w-full flex flex-col items-start justify-center gap-[10px]'>
                      <h3 className='text-[20px]'>{item.Name}</h3>
                      <p className='text-[16px]'>Liczba: {item.count}</p>
                      <div className='flex flex-col items-start justify-center'>
                        <p className='text-[16px]'>Wybrane wartości:</p>
                        <ul className='flex flex-col px-[20px]'>
                          {item.selectedValues.map((val, idx) => {
                            const type = item.Type[idx]
                            const typeName = type ? type.name : 'Nieznany typ'
                            return (
                              <li key={idx} className='text-[16px]'>
                                {typeName}: {val}
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <footer className='w-full flex justify-between items-center'>
              <p className='w-[60%] text-[17px]'>
                <span className='font-[bold]'>Uwaga!</span> Szyny są dostarczane
                w odcinkach 1 m, 2 m lub 3 m, które trzeba przyciąć
                samodzielnie. W celu optymizacji skontaktuj się z dystrybutоrem.
              </p>
              <div className='w-[40%] flex gap-[10px] justify-end'>
                <button className='text-[#fff] text-[15px] bg-[#000] border rounded-[10px] px-[20px] py-[10px] font-[bold] cursor-pointer'>
                  Pobierz <span className='block'>Excel</span>
                </button>
                <button className='text-[#fff] text-[15px] bg-[#000] border rounded-[10px] px-[20px] py-[10px] font-[bold] cursor-pointer'>
                  Pobierz <span className='block'>PDF</span>
                </button>
                <button
                  onClick={handleBackPage}
                  className='text-[#000] border border-[#000] bg-[#fff] rounded-[10px] text-[15px] font-[bold] px-[20px] py-[10px] cursor-pointer flex flex-col items-start'
                >
                  Powrót do <span className='block'>konfiguracji</span>
                </button>
              </div>
            </footer>
          </div>
        </div>
      ) : (
        <Footer setIsLooking={setIsLooking} />
      )}
      {isLooking ? (
        <Registartion
          setIsLooking={setIsLooking}
          setIsOpeningContant={setIsOpeningContant}
        />
      ) : null}
    </div>
  )
}
