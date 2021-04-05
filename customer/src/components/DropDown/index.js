import React from 'react'

function DropDown ({ style, placeholder, options, value, onChange }) {
  return (
    <select className="Input DropDown" style={{ color: !value && 'grey', ...style }} value={value} onChange={onChange}>
      <option value="" defaultValue>{placeholder}</option>
      {options.map(option => <option key={option.value || option} value={option.value || option}>{option.label || option}</option>)}
    </select>
  )
}

export { DropDown }