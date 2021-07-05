import React, { useState, useEffect } from 'react'
import { getTimeObject } from '../../helpers'

function DashboardTimer({ timeStamp }) {

  const [timer, settimer] = useState(new Date() - new Date(timeStamp))
  const [time, settime] = useState(timeStamp)

  useEffect(() => {
    settime(getTimeObject(timer))
    setTimeout(() => settimer(timer + 1), 1000)
  }, [timer])

  return (
    timeStamp !== null ? 
        <p style={{ display: 'inline' }}>
          {/* {time.days ? time.days + 'day(s)' : ''}
          {time.days && (time.hrs || time.mints) ? ', ' : ''}
          {time.hrs ? time.hrs + 'hr(s)' : ''}
          {time.hrs && time.mints ? ', ' : ''}
          {time.mints ? time.mints + 'mint(s)' : ''} */}
          {/* {time.days ? time.days + 'd ' : ''} */}
          {time.hrs ? time.hrs < 10 ? '0' + time.hrs + ':' : time.hrs + ':' : '00:'}
          {time.mints ? time.mints < 10 ? '0' + time.mints + ':' : time.mints + ':' : '00:'}
          {time.secs ? time.secs < 10 ? '0' + time.secs : time.secs : '00'}
        </p> : '00:00:00'
  )
}

export { DashboardTimer }
