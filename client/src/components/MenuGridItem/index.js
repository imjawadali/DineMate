import React from 'react'

import './styles.css'

function MenuGridItem({ name, shortDescription, price, onClick }) {
  return (
    <div className="MenuGridItem"
      style={{ backgroundColor: 'rgb(245, 249, 255)', border: '1px solid lightgrey' }}
      onClick={onClick}>
        <p className="MenuGridItemText" style={{ fontWeight: 'bold' }}>{name}</p>
      <div style={{ flex: 1 }}>
        <p className="MenuGridItemText">{shortDescription}</p>
      </div>
      <p className="MenuGridItemText">$ {price.toFixed(2)}</p>
    </div>
  )
}

export { MenuGridItem }
