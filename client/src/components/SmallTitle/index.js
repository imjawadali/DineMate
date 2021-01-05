import React from 'react'

import './styles.css'

function SmallTitle({ style, text }) {
  return (
    <h1 className="SmallTitle" style={style || {}}>{text}</h1>
  )
}

export { SmallTitle }
