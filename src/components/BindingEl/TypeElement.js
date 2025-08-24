import TiArrowUnsorted from '@/images/TiArrowUnsorted'

export default function TypeElement ({ name, values, selectedValue, onChange }) {
  const selectId = `select-${name}`
  const actualValues = Array.isArray(values[0]) ? values[0] : values

  return (
    <div className='flex items-center gap-[10px] w-full'>
      <label
        htmlFor={selectId}
        className='w-[120px] text-[16px] font-medium text-[#000] cursor-pointer'
      >
        {name}:
      </label>

      <div className='relative flex-1'>
        <select
          id={selectId}
          name={name}
          value={selectedValue}
          onChange={e => onChange(e.target.value)}
          className='w-full appearance-none rounded-[8px] py-[10px] px-[20px] border border-[#d7d7d7] bg-[#fff] text-[12px] cursor-pointer'
        >
          <option value='' hidden></option>
          <option value='' disabled>
            Wybierz
          </option>
          {actualValues.map(value => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>

        <div className='absolute right-[5px] top-[50%] -translate-y-[50%]'>
          <TiArrowUnsorted />
        </div>
      </div>
    </div>
  )
}
