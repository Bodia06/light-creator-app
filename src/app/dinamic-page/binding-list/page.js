'use client'
import BindingListItems from '@/components/BindingEl/BindingListItems'

export default function BindingList ({ close, elemnets, addItem }) {
  return (
    <div className='fixed top-[20px] left-[400px] right-[400px] bg-[#fff] border border-black rounded-[10px] z-[50] py-[20px] px-[40px]'>
      <div className='absolute right-[20px] top-[10px]'>
        <button
          onClick={close}
          className='w-[24px] h-[24px] cursor-pointer relative bg-transparent border-0 after:content-[""] after:inline-block after:w-[15px] after:h-[1px] after:bg-[#000] after:rotate-45 after:absolute after:top-[50%] after:translate-y-[-50%] after:right-[50%] after:translate-x-[50%] before:content-[""] before:w-[15px] before:h-[1px] before:bg-[#000] before:inline-block before:rotate-[-45deg] before:absolute before:top-[50%] before:translate-y-[-50%] before:right-[50%] before:translate-x-[50%]'
        ></button>
      </div>

      <ul className='grid grid-cols-4 gap-[20px]'>
        {elemnets.map(item => (
          <BindingListItems
            key={item.Id}
            srcImg={item.SrcImg}
            name={item.Name}
            clickAddItem={() => addItem(item)}
          />
        ))}
      </ul>
    </div>
  )
}
