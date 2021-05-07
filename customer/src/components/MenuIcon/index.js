import React from 'react'

import './styles.css'

function MenuIcon({ onClick }) {
  return (
    <img className="MenuIcon"
      src={require('../../assets/hamburger.png').default}
      onClick={onClick}
    />
  )
}

export { MenuIcon }
