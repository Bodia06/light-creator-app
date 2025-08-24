export default function BindingListItems ({ srcImg, name, clickAddItem }) {
  return (
    <li className='list-none w-full h-[200px] bg-white'>
      <button
        onClick={() => {
          console.log('Button clicked:', name)
          clickAddItem()
        }}
        className='flex flex-col items-center justify-between w-full h-full overflow-hidden  cursor-pointer p-[10px] bg-transparent border-none'
      >
        <div className='w-[120px] h-[120px] border border-[#d7d7d7] rounded-[10px] overflow-hidden'>
          <img
            src={srcImg}
            alt={`${name} photo`}
            className='w-full h-full object-cover object-center'
          />
        </div>
        <h2 className='text-[18px] font-bold text-center'>{name}</h2>
      </button>
    </li>
  )
}
