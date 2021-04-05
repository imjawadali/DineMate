import React from 'react'

import './styles.css'

function DineMateTitle({ style }) {
  return (
    <h1 className="DineMateTitle" style={style || {}}>DineMate</h1>
  )
}

export { DineMateTitle }
