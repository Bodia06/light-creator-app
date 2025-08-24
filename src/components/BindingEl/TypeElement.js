export default function TypeElement ({ name, values, selectedValue, onChange }) {
  const selectId = `select-${name}`

  const actualValues = Array.isArray(values[0]) ? values[0] : values

  return (
    <div className='flex items-center justify-center gap-[10px]'>
      <label
        htmlFor={selectId}
        className='w-[120px] text-[16px] font-medium text-gray-700'
      >
        {name}:
      </label>
      <select
        id={selectId}
        name={name}
        value={selectedValue}
        onChange={e => onChange(e.target.value)}
        className='w-[calc(100%-140px)] appearance-none rounded-[8px] py-[10px] px-[20px] border border-[#d7d7d7] bg-[#fff] text-[12px] '
      >
        <option value='' hidden></option>
        <option value='' disabled>
          Wybierz...
        </option>
        {actualValues.map(value => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  )
}
