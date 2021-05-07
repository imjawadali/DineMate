import React from 'react'

import './styles.css'

function Logo({ style, src, onClick }) {
  return (
    <img style={style || {}} className="Logo" src={src} onClick={onClick} />
  )
}

export { Logo }
