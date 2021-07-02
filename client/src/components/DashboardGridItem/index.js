import React, { useEffect } from 'react'

import './styles.css'

function DashboardGridItem({ text, doNotDisturb, occupiedBy, merging, includesMerging, merged, serviceIncludes, onClick }) {
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
      onClick={onClick}
    >
      {occupiedBy ? <div style={{ width: '100%', display: 'flex' }}>
        <p className="DashboardGridItemText" style={{ flex: 1, display: 'flex' }}>Diner(s): {occupiedBy}</p>
        {!!serviceIncludes && <i className="DashboardGridItemText fa fa-bell" />}
      </div> : null}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <p className="DashboardGridItemText" style={{ fontWeight: 'bold' }}>{text}</p>
      </div>
      {!!occupiedBy ? <div style={{ width: '100%', display: 'flex' }}>
        <p className="DashboardGridItemText" style={{ flex: 1, display: 'flex' }}>Amount: $ {0}</p>
        {!!doNotDisturb && <i className="DashboardGridItemText fa fa-ban" />}
      </div> : null}
    </div>
  )
}

export { DashboardGridItem }
