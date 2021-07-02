import React, { useState, useEffect } from 'react'
import { getTimeObject } from '../../helpers'

import './styles.css'

function DashboardGridItem({ text, currentIndex, lastIndex, doNotDisturb, occupiedBy, merging, includesMerging, merged, serviceIncludes, timeStamp, onClick }) {

  const [timer, settimer] = useState(timeStamp)
  const [time, settime] = useState(timeStamp)

  useEffect(() => {
    settime(getTimeObject(timer))
    setTimeout(() => settimer(timer + 1), 1000)
  }, [timer])

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
      {occupiedBy && !currentIndex ? <div style={{ width: '100%', display: 'flex' }}>
        <p className="DashboardGridItemText" style={{ flex: 1, display: 'flex' }}>Diner(s): {occupiedBy}</p>
        {!!doNotDisturb && <i className="DashboardGridItemText fa fa-ban" style={{ margin: '0px 5px' }} />}
        {!!serviceIncludes && <i className="DashboardGridItemText fa fa-bell" />}
      </div> : null}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <p className="DashboardGridItemText" style={{ fontWeight: 'bold' }}>{text}</p>
      </div>
      {!!occupiedBy && currentIndex === lastIndex ? <div className="ResponsiveDirection" style={{ width: '100%', display: 'flex' }}>
        <p className="DashboardGridItemText" style={{ flex: 1, display: 'flex' }}>$ {0}</p>
        <p className="DashboardGridItemText">
          {time.hrs ? time.hrs < 10 ? '0' + time.hrs + ':' : time.hrs + ':' : '00:'}
          {time.mints ? time.mints < 10 ? '0' + time.mints + ':' : time.mints + ':' : '00:'}
          {time.secs ? time.secs < 10 ? '0' + time.secs : time.secs : '00'}
        </p>
      </div> : null}
    </div>
  )
}

export { DashboardGridItem }
