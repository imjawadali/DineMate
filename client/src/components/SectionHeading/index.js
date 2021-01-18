import React from 'react'

import './styles.css'

function SectionHeading({ style, text }) {
  return (
    <div className="SectionHeadingContainer">
      <p className="SectionHeading" style={style || {}}>{text}</p>
    </div>
  )
}

export { SectionHeading }
