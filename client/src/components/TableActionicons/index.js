import React from 'react'

import './styles.css'

function TableActionicons ({ style, icon, onClick }) {
  return (
    <div
      className="TableActionicons" 
      style={style}>
        <i className={`fa ${icon}`}
          onClick={onClick}
        />
      </div>
  )
}

export { TableActionicons }
