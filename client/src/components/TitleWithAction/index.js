import React from 'react'

import './styles.css'

function TitleWithAction({ text, noMargin, textAlign, icon, button }) {
  return (
    <div className="TitleWithActionContainer" style={{ margin: noMargin ? '0px' : null }}>
      <div className="TitleWithIcon">
        {icon && icon}
        <div className="TitleContainer" style={{ justifyContent: textAlign }}><h2>{text}</h2></div>
      </div>
      {button && <div className="TitleButtonContainer">
        {button}
      </div>}
    </div>
  )
}

export { TitleWithAction }
