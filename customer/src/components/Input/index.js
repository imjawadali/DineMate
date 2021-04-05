import React from 'react'

import './styles.css'

function Input ({ type, style, placeholder, value, onChange }) {
  return (
    <input
      className="Input" 
      style={style}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
}

export { Input }
