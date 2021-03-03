import React from 'react'

import './styles.css'

function DashboardGridItem({ text, doNotDisturb, occupiedBy, merging, includesMerging, merged, onClick }) {
  return (
    <div className="DashboardGridItem"
      style={{ backgroundColor: merging ?
          merged || occupiedBy ? '' : 
            includesMerging ? 'darkslateblue' : 'lightblue'
        : merged ? occupiedBy ? doNotDisturb ? 'rgba(255, 0, 0, 0.5)' : 'lightgreen' : 'lightgrey' 
          : occupiedBy ? doNotDisturb ? 'rgba(255, 0, 0, 0.5)' : 'lightgreen' : 'lightblue',
        boxShadow: merging && (merged || occupiedBy) ? 'none' : ''
      }}
      onClick={onClick}
    >
      <p className="DashboardGridItemText">{text}{!!doNotDisturb && ` - Don't Disturb`}</p>
      {(merged || occupiedBy) && <p className="DashboardGridItemText">
        {merged ? 'Merged' : ''}
        {merged && occupiedBy ? ' & ' : ''}
        {occupiedBy ? 'Occupied' : ''}
      </p>}
    </div>
  )
}

export { DashboardGridItem }
