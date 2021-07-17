import React, { useState, useEffect } from 'react'
import { getTimeObject } from '../../helpers'

function KitchenTimer({ index, timeStamp, lateTime }) {

  const [timer, settimer] = useState(timeStamp)
  const [time, settime] = useState(timeStamp)

  useEffect(() => {
    settime(getTimeObject(timer))
    setTimeout(() => settimer(timer + 1), 1000)
  }, [timer])

  return (
    <td style={{ backgroundColor: index === 0 ? time.hrs || time.mints >= (lateTime || 10) ? 'rgb(248, 203, 173)' : 'rgb(198, 224, 180)' : ''}}>
      {index === 0 ? 
        <p style={{ display: 'inline' }}>
          {time.hrs ? time.hrs < 10 ? '0' + time.hrs + ':' : time.hrs + ':' : '00:'}
          {time.mints ? time.mints < 10 ? '0' + time.mints + ':' : time.mints + ':' : '00:'}
          {time.secs ? time.secs < 10 ? '0' + time.secs : time.secs : '00'}
        </p> : ''
      }
    </td>
  )
}

export { KitchenTimer }
