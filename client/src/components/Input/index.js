import React from 'react'

import './styles.css'

function Input ({ type, style, disabled, placeholder, value, onChange }) {
  return (
    <input
      className="Input" 
      style={style}
      type={type}
      disabled={disabled || false}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
}

export { Input }
