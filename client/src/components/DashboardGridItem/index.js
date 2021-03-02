import React from 'react'

import './styles.css'

function DashboardGridItem({ text, doNotDisturb, occupiedBy, merged }) {
  return (
    <div className="DashboardGridItem"
      style={{ backgroundColor: merged ? occupiedBy ? 'lightblue' : 'lightgrey' : occupiedBy ? doNotDisturb ? 'orangered' : 'lightblue' : 'lightgreen'}}
    >
      <p className="DashboardGridItemText">{text}</p>
      {merged && <p className="DashboardGridItemText">Merged</p>}
    </div>
  )
}

export { DashboardGridItem }
