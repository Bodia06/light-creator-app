'use client'
import FaPlus from '@/images/FaPlus'
import { useEffect, useState } from 'react'
import BindingList from '@/components/BindingEl/BindingList'
import { takeData } from '@/firebase/config'
import SelectedItemContainer from '@/components/BindingEl/SelectedItemContainer'
import Footer from '@/components/Footer'

export default function TakeBinding () {
  const [bindingData, setBindingData] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [isOpening, setIsOpening] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('selectedItems')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          setSelectedItems(parsed)
        }
      } catch (e) {
        console.error('Помилка парсингу localStorage', e)
      }
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const binding = await takeData('binding')
      setBindingData(binding)
    }
    fetchData()
  }, [])

  const handleClickOpenAddProduct = () => setIsOpening(!isOpening)

  const handleAddItem = item => {
    const newItem = {
      ...item,
      _uniqueId: `${Date.now()}-${Math.random()}`,
      count: 0,
      selectedValues: item.Type?.map(() => '') || []
    }
    setSelectedItems(prev => [...prev, newItem])
    setIsOpening(false)
  }

  const handleRemoveItem = uniqueId => {
    setSelectedItems(prev => prev.filter(item => item._uniqueId !== uniqueId))
  }

  return (
    <div>
      <div className='flex flex-wrap items-center justify-start py-[100px] px-[250px] gap-[40px]'>
        <button
          onClick={handleClickOpenAddProduct}
          className='w-[400px] min-h-[800px] max-h-[800px] border border-[#d7d7d7] bg-[#fff] rounded-[10px] text-black font-bold text-[30px] flex flex-col items-center justify-center gap-[20px] cursor-pointer hover:bg-[#ffe100] hover:border-[#ffe100]'
        >
          <FaPlus />
          Dodaj produkt
        </button>

        {selectedItems.length > 0 &&
          selectedItems.map(item => (
            <SelectedItemContainer
              key={item._uniqueId}
              item={item}
              onRemove={handleRemoveItem}
            />
          ))}

        {isOpening && (
          <BindingList
            close={handleClickOpenAddProduct}
            elemnets={bindingData}
            addItem={handleAddItem}
          />
        )}
      </div>
      <Footer />
    </div>
  )
}
