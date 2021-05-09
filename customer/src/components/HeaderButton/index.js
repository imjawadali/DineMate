import React from 'react'

import './styles.css'

function HeaderButton({ style, red, src, text, itemCounts, onClick }) {
  return (
    <div className="HeaderButton" style={ style, red ? { color: 'white', background: 'red' } : {}} onClick={onClick}>
      {src && <img className="HeaderButtonImage" src={src} />}
      <p className="HeaderButtonText">{text}</p>
      {(itemCounts || itemCounts == 0) && <p className="HeaderItemCountsText"> • {itemCounts || '0'}</p>}
    </div>
  )
}

export { HeaderButton }
