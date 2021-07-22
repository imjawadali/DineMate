import React, { useState, useEffect } from 'react'
import TimePicker from 'react-time-picker';

import { SmallTitle } from '../SmallTitle'
import { Title } from '../Title'

import './styles.css'

function ScheduleRow({ text, schedule, onSelect, fromTimeChange, toTimeChange, fetchingOrUpdating }) {

  const [row, setrow] = useState(null)

  useEffect(() => {
    const tempRow = schedule.filter(x => x.day === text.toLowerCase())
    setrow(tempRow.length ? tempRow[0] : null)
  }, [schedule])

  const onChange = () => onSelect(text.toLowerCase())

  const fromTime = (time) => fromTimeChange(text.toLowerCase(), time)

  const toTime = (time) => toTimeChange(text.toLowerCase(), time)

  return (
    <div className="ScheduleRow">
      <div style={{ display: 'flex', alignItems: 'center', width: window.innerWidth < 480 ? '100%' : '30%' }}>
        <input
          type="checkbox"
          checked={!!row}
          onChange={onChange}
        />
        <Title style={{ margin: '0px 15px 0px 15px' }} text={text} />
      </div>
      <div style={{ flex: 1, marginTop: window.innerWidth < 480 ? '10px' : '', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <SmallTitle text="From:" style={{ marginRight: '10px' }} />
          <TimePicker
            value={row ? row.from : null}
            disabled={!row || fetchingOrUpdating}
            onChange={fromTime}
            format='HH:mm'
          />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <SmallTitle text="To:" style={{ marginRight: '10px' }}  />
          <TimePicker
            value={row ? row.to : null}
            disabled={!row || fetchingOrUpdating}
            onChange={toTime}
            format='HH:mm'
          />
        </div>
      </div>
    </div>
  )
}

export { ScheduleRow }
