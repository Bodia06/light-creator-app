import { useEffect, useState } from 'react'
import TypeElement from './TypeElement'

export default function SelectedItemContainer ({ item, onRemove }) {
  const { SrcImg, Name, Type, _uniqueId } = item

  const [selectedValues, setSelectedValues] = useState(Type.map(() => ''))
  const [count, setCount] = useState(0)

  const allSelected = selectedValues.every(val => val !== '')

  const addBtnClickActive = allSelected
  const removeBtnClickActive = count > 0

  const handleAdd = () => {
    if (addBtnClickActive) {
      setCount(count + 1)
    }
  }

  const handleRemove = () => {
    if (removeBtnClickActive) {
      const newCount = count - 1
      setCount(newCount)
      if (newCount === 0 && onRemove) {
        onRemove()
        localStorage.removeItem(_uniqueId)
      }
    }
  }

  useEffect(() => {
    if (count > 0) {
      const dataToStore = {
        id: _uniqueId,
        SrcImg,
        Name,
        Type,
        count,
        selectedValues
      }
      localStorage.setItem(_uniqueId, JSON.stringify(dataToStore))
    }
  }, [count, selectedValues, _uniqueId, SrcImg, Name, Type])

  return (
    <div className='w-[400px] min-h-[800px] max-h-[800px] h-full border border-[#d7d7d7] rounded-[10px] flex flex-col items-center px-[30px] py-[20px] gap-[10px]'>
      <div className='w-full h-[250px]'>
        <img
          src={SrcImg}
          alt={Name}
          className='w-full h-full object-cover object-center'
        />
      </div>
      <div className='flex w-full items-center justify-center'>
        <h2 className='text-[20px] font-[bold]'>{Name}</h2>
      </div>
      <div className='flex w-full items-center justify-center gap-[10px]'>
        <button
          onClick={handleRemove}
          className={`flex items-center justify-center text-[20px] font-[bold] w-[30px] h-[25px] text-[#fff] rounded-[5px] border ${
            removeBtnClickActive
              ? 'bg-[#000] border-[#000] hover:opacity-[75%] cursor-pointer hover:scale-[1.1]'
              : 'bg-[#4f4f4f] border-[#4f4f4f] cursor-not-allowed'
          }`}
        >
          -
        </button>
        <span className='flex w-[20px] h-[20px] justify-center items-center'>
          {`${count}`}
        </span>
        <button
          onClick={handleAdd}
          className={`flex items-center justify-center text-[20px] font-[bold] w-[30px] h-[25px] text-[#fff] rounded-[5px] border ${
            addBtnClickActive
              ? 'bg-[#000] border-[#000] hover:opacity-[75%] cursor-pointer hover:scale-[1.1]'
              : 'bg-[#4f4f4f] border-[#4f4f4f] cursor-not-allowed'
          }`}
        >
          +
        </button>
      </div>
      <div className='w-full flex flex-col items-beetwen justify-start gap-[10px]'>
        {Type.map((type, index) => (
          <TypeElement
            key={index}
            name={type.name}
            values={type.values}
            selectedValue={selectedValues[index]}
            onChange={value => {
              const newValues = [...selectedValues]
              newValues[index] = value
              setSelectedValues(newValues)
            }}
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
