import React, { useState, useEffect } from 'react'
import { getTimeObject } from '../../helpers'

const colors = ['rgb(255, 204, 200)', 'rgb(255, 242, 200)', 'rgb(205, 234, 208)']
const bdColors = ['rgba(255, 0, 0, 0.5)', 'rgb(245, 222, 179)', 'lightgreen']

function ServiceQueItem({ tableNumber, orderNumber, textArray, timeStamp, onClick }) {

  const [timer, settimer] = useState(timeStamp)
  const [time, settime] = useState(timeStamp)

  useEffect(() => {
    settime(getTimeObject(timer))
    setTimeout(() => settimer(timer + 1), 1000)
  }, [timer])

  return (
    <div className="DashboardGridItem" key={orderNumber}
      style={{
        backgroundColor: colors[time.mints < 10 ? time.mints < 5 ? 2 : 1 : 0],
        border: '1px solid',
        borderColor: bdColors[time.mints < 10 ? time.mints < 5 ? 2 : 1 : 0],
        margin: '20px 0px',
        aspectRatio: 0,
        width: '100%'
      }}
      onClick={onClick}
    >
      <i className="fa fa-times-circle"
        style={{
          display: 'block',
          float: 'right',
          position: 'absolute',
          top: 5,
          right: 5
        }}
        onClick={() => null}
      />
      <p>
        {time.mints ? time.mints < 10 ? '0' + time.mints + ':' : time.mints + ':' : '00:'}
        {time.secs ? time.secs < 10 ? '0' + time.secs : time.secs : '00'}
      </p>
      <p style={{ margin: '5px 0px', fontWeight: 'bold' }} className="DashboardGridItemText">Table: {tableNumber} - Check: {orderNumber}</p>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        {textArray && textArray.length ?
          textArray.map(text => <p className="DashboardGridItemText">- {text}</p>)
          : null}
      </div>
    </div>
  )
}

export { ServiceQueItem }
