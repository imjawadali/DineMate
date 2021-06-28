import React, { useEffect } from 'react'

import './styles.css'

function DashboardGridItem({ text, doNotDisturb, occupiedBy, merging, includesMerging, merged, onMouseEnter, onMouseLeave, onClick }) {
  return (
    <div className="DashboardGridItem"
      style={{
        backgroundColor: merging ?
          merged || occupiedBy ? '' : includesMerging ? 'darkslateblue' : 'rgb(206, 224, 244)'
          : merged ? occupiedBy ? doNotDisturb ? 'rgb(255, 204, 200)' : 'rgb(206, 224, 244)' : 'rgb(245, 249, 255)'
            : occupiedBy ? doNotDisturb ? 'rgb(255, 204, 200)' : 'rgb(206, 224, 244)' : 'rgb(205, 234, 208)',
        border: '1px solid',
        borderColor: merging ?
          merged || occupiedBy ? '' :
            includesMerging ? 'darkslateblue' : 'lightblue'
          : merged ? occupiedBy ? doNotDisturb ? 'rgba(255, 0, 0, 0.5)' : 'lightblue' : 'lightgrey'
            : occupiedBy ? doNotDisturb ? 'rgba(255, 0, 0, 0.5)' : 'lightblue' : 'lightgreen',
        color: includesMerging ? 'white' : '',
        boxShadow: merging && (merged || occupiedBy) ? 'none' : ''
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <p className="DashboardGridItemText">{text}{!!doNotDisturb && ` - Don't Disturb`}</p>
      {(merged || occupiedBy) ? <p className="DashboardGridItemText">
        {merged ? 'Merged' : ''}
        {merged && occupiedBy ? ' & ' : ''}
        {occupiedBy ? 'Occupied' : ''}
      </p> : null}
    </div>
  )
}

export { DashboardGridItem }
