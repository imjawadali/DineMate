import React from 'react'

import './styles.css'

function Title({ style, text }) {
  return (
    <h1 className="Title" style={style || {}}>{text}</h1>
  )
}

export { Title }
