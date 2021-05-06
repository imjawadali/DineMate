import React from 'react'

import './styles.css'

function HeaderButton({ style, red, text, src, itemCounts, onClick }) {
  return (
    <div className="HeaderButton" style={ style, red ? { color: 'white', background: 'red' } : {}} onClick={onClick}>
      {src && <img className="HeaderButtonImage" src={src} />}
      <p className="HeaderButtonText">{text}</p>
    </div>
  )
}

export { HeaderButton }
