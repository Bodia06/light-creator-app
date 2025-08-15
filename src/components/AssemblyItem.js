export default function AssemblyItem ({ item, isActive, onClick }) {
  const { name, srcImg, alt } = item

  return (
    <li
      className={`flex flex-col items-center gap-[20px] cursor-pointer ${
        isActive
          ? 'border-[2px] border-[solid] border-[#f1cb25]'
          : 'border-[2px] border-[solid] border-[#b1b1b1]'
      }`}
      onClick={onClick}
    >
      <img
        className='w-[200px] h-[200px] object-cover object-center'
        src={srcImg}
        alt={alt}
      />
      <div className='flex items-center mb-[20px]'>
        <h2 className='text-[16px] font-[medium]'>{name}</h2>
      </div>
    </li>
  )
}
