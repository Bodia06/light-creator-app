import { useState, useEffect } from 'react'
import TypeElement from './TypeElement'

export default function SelectedItemContainer ({ item, onRemove }) {
  const [count, setCount] = useState(item.count || 0)
  const [selectedValues, setSelectedValues] = useState(
    item.selectedValues?.length === item.Type?.length
      ? item.selectedValues
      : item.Type?.map(() => '') || []
  )

  const allSelected = selectedValues.every(val => val !== '')
  const isAddBtnClickActive = allSelected
  const isRemoveBtnClickActive = count > 0

  useEffect(() => {
    if (count > 0) {
      const stored = localStorage.getItem('selectedItems')
      const parsed = stored ? JSON.parse(stored) : []
      const existingIndex = parsed.findIndex(
        i => i._uniqueId === item._uniqueId
      )
      const updatedItem = { ...item, count, selectedValues }

      if (existingIndex >= 0) {
        parsed[existingIndex] = updatedItem
      } else {
        parsed.push(updatedItem)
      }

      localStorage.setItem('selectedItems', JSON.stringify(parsed))
    }
  }, [count, selectedValues, item])

  const handleChangeValue = (index, value) => {
    const newValues = [...selectedValues]
    newValues[index] = value
    setSelectedValues(newValues)
  }

  const handleRemove = () => {
    if (count > 0) {
      const newCount = count - 1
      setCount(newCount)

      if (newCount === 0 && onRemove) {
        onRemove(item._uniqueId)

        const stored = localStorage.getItem('selectedItems')
        if (stored) {
          const parsed = JSON.parse(stored)
          const filtered = parsed.filter(i => i._uniqueId !== item._uniqueId)
          localStorage.setItem('selectedItems', JSON.stringify(filtered))
        }
      }
    }
  }

  const handleAdd = () => {
    if (isAddBtnClickActive) {
      setCount(prev => prev + 1)
    }
  }

  return (
    <div className='w-[400px] min-h-[800px] max-h-[800px] h-full border border-[#d7d7d7] rounded-[10px] flex flex-col items-center px-[30px] py-[20px] gap-[10px]'>
      <div className='w-full h-[250px]'>
        <img
          src={item.SrcImg}
          alt={item.Name}
          className='w-full h-full object-cover object-center'
        />
      </div>
      <h2 className='text-[20px] font-[bold]'>{item.Name}</h2>

      <div className='flex w-full items-center justify-center gap-[10px]'>
        <button
          onClick={handleRemove}
          className={`flex items-center justify-center text-[20px] font-[bold] w-[30px] h-[25px] text-[#fff] rounded-[5px] border ${
            isRemoveBtnClickActive
              ? 'bg-[#000] border-[#000] hover:opacity-[75%] cursor-pointer hover:scale-[1.1]'
              : 'bg-[#4f4f4f] border-[#4f4f4f] cursor-not-allowed'
          }`}
        >
          -
        </button>
        <span className='flex w-[20px] h-[20px] justify-center items-center'>
          {count}
        </span>
        <button
          onClick={handleAdd}
          className={`flex items-center justify-center text-[20px] font-[bold] w-[30px] h-[25px] text-[#fff] rounded-[5px] border ${
            isAddBtnClickActive
              ? 'bg-[#000] border-[#000] hover:opacity-[75%] cursor-pointer hover:scale-[1.1]'
              : 'bg-[#4f4f4f] border-[#4f4f4f] cursor-not-allowed'
          }`}
        >
          +
        </button>
      </div>

      <div className='w-full flex flex-col items-start justify-start gap-[10px]'>
        {item.Type?.map((type, index) => (
          <TypeElement
            key={index}
            name={type.name}
            values={type.values}
            selectedValue={selectedValues[index]}
            onChange={value => handleChangeValue(index, value)}
          />
        ))}
      </div>

      <div className='w-full flex items-center justify-center mt-auto'>
        <a
          href='https://loonari.eu/?v=288404204e3d'
          className='w-full flex justify-center no-underline items-center list-none py-[10px] border border-[#b1b1b1] bg-[#b1b1b1] rounded-[10px] cursor-pointer font-[bold] text-[#000]'
        >
          Zobacz w sklepie
        </a>
      </div>
    </div>
  )
}
