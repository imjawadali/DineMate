import React, { useState, useEffect } from 'react'
import { getTimeObject } from '../../helpers'

function OrderTimer({ status, timeStamp, textOnly }) {

  const [timer, settimer] = useState(timeStamp)
  const [time, settime] = useState(timeStamp || 0)

  useEffect(() => {
    settime(getTimeObject(timer || 0))
    if (status)
      setTimeout(() => settimer(timer + 1), 1000)
  }, [timer])

  return (
    textOnly ?
      <p className="OrderDetailsText" style={{ display: 'inline' }}>
        {/* {time.days ? time.days + 'day(s)' : ''}
        {time.days && (time.hrs || time.mints) ? ', ' : ''}
        {time.hrs ? time.hrs + 'hr(s)' : ''}
        {time.hrs && time.mints ? ', ' : ''}
        {time.mints ? time.mints + 'mint(s)' : ''} */}
        {/* {time.days ? time.days + 'd ' : ''} */}
        {time.hrs ? time.hrs < 10 ? '0' + time.hrs + ':' : time.hrs + ':' : '00:'}
        {time.mints ? time.mints < 10 ? '0' + time.mints + ':' : time.mints + ':' : '00:'}
        {time.secs ? time.secs < 10 ? '0' + time.secs : time.secs : '00'}
      </p>
      :
      <td style={{ textAlign: 'center', backgroundColor: status ? time.hrs || time.mints > 9 ? 'rgb(248, 203, 173)' : 'rgb(198, 224, 180)' : '' }}>
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
        </p>
      </td>
  )
}

export { OrderTimer }
