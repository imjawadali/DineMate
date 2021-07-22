import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { customisedAction } from '../../../redux/actions'
import { Button, ScheduleRow, TitleWithAction } from '../../../components'
import { GET_RESTAURANT_SCHEDULE, UPDATE_RESTAURANT_SCHEDULE } from '../../../constants'

function Schedule() {

  const [schedule, setschedule] = useState([])

  const fetchingRestaurantSchedule = useSelector(({ scheduleReducer }) => scheduleReducer.fetchingRestaurantSchedule)
  const updatingRestaurantSchedule = useSelector(({ scheduleReducer }) => scheduleReducer.updatingRestaurantSchedule)
  const restaurantSchedule = useSelector(({ scheduleReducer }) => scheduleReducer.restaurantSchedule)
  const admin = useSelector(({ sessionReducer }) => sessionReducer.admin)
  const dispatch = useDispatch()

  const { restaurantId } = admin

  useEffect(() => {
    if (!fetchingRestaurantSchedule && !restaurantSchedule.length)
      dispatch(customisedAction(GET_RESTAURANT_SCHEDULE, { restaurantId }))
  }, [])

  useEffect(() => {
    if (restaurantSchedule && restaurantSchedule.length) {
      const tempSchedule = JSON.parse(JSON.stringify(restaurantSchedule))
      setschedule(tempSchedule)
    }
  }, [restaurantSchedule])

  const onSelect = (day) => {
    if (!fetchingRestaurantSchedule && !updatingRestaurantSchedule) {
      let tempSchedule = [...schedule]
      if (tempSchedule.filter(x => x.day === day).length)
        tempSchedule = tempSchedule.filter(x => x.day !== day)
      else tempSchedule.push({
        day,
        from: null,
        to: null
      })
      setschedule(tempSchedule)
    }
  }

  const fromTimeChange = (day, time) => {
    let tempSchedule = [...schedule]
    if (tempSchedule && tempSchedule.length) {
      let tempRow = tempSchedule.filter(x => x.day === day)
      tempRow = tempRow.length ? tempRow[0] : null
      if (tempRow) {
        tempRow.from = time
        tempSchedule = tempSchedule.filter(x => x.day !== day)
        tempSchedule.push(tempRow)
        setschedule(tempSchedule)
      }
    }
  }

  const toTimeChange = (day, time) => {
    let tempSchedule = [...schedule]
    if (tempSchedule && tempSchedule.length) {
      let tempRow = tempSchedule.filter(x => x.day === day)
      tempRow = tempRow.length ? tempRow[0] : null
      if (tempRow) {
        tempRow.to = time
        tempSchedule = tempSchedule.filter(x => x.day !== day)
        tempSchedule.push(tempRow)
        setschedule(tempSchedule)
      }
    }
  }

  const changed = () => {
    if ((schedule.length === restaurantSchedule.length)) {
      if (JSON.stringify(schedule.sort(function (a, b) {
        return a.day > b.day ? 1 : -1
      })) === JSON.stringify(restaurantSchedule.sort(function (a, b) {
        return a.day > b.day ? 1 : -1
      }))) return false
      else return true
    } else return true
  }

  const validate = () => {
    if (!fetchingRestaurantSchedule
      && !updatingRestaurantSchedule
      && schedule.length
      && changed()) {
      let disabled = false
      for (let index = 0; index < schedule.length; index++) {
        const { from, to } = schedule[index];
        if (!from || !to) {
          disabled = true
          break;
        }
      }
      return disabled
    }
    else return true
  }

  return (
    <div className="Container">
      <TitleWithAction
        text="Schedule Management"
        noMargin
        button={<Button
          text={fetchingRestaurantSchedule || updatingRestaurantSchedule ? 'Syncing' : 'Refresh'}
          light={fetchingRestaurantSchedule || updatingRestaurantSchedule}
          lightAction={() => null}
          iconLeft={<i className={`fa fa-refresh ${fetchingRestaurantSchedule || updatingRestaurantSchedule ? 'fa-pulse' : ''}`} />}
          onClick={() => dispatch(customisedAction(GET_RESTAURANT_SCHEDULE, { restaurantId }))}
        />}
      />
      <div className="TabularContentContainer">
        <div className="TableDataContainer">
          <ScheduleRow
            text="Monday"
            schedule={schedule}
            onSelect={onSelect}
            fromTimeChange={fromTimeChange}
            toTimeChange={toTimeChange}
            fetchingOrUpdating={fetchingRestaurantSchedule || updatingRestaurantSchedule}
          />
          <ScheduleRow
            text="Tuesday"
            schedule={schedule}
            onSelect={onSelect}
            fromTimeChange={fromTimeChange}
            toTimeChange={toTimeChange}
            fetchingOrUpdating={fetchingRestaurantSchedule || updatingRestaurantSchedule}
          />
          <ScheduleRow
            text="Wednesday"
            schedule={schedule}
            onSelect={onSelect}
            fromTimeChange={fromTimeChange}
            toTimeChange={toTimeChange}
            fetchingOrUpdating={fetchingRestaurantSchedule || updatingRestaurantSchedule}
          />
          <ScheduleRow
            text="Thursday"
            schedule={schedule}
            onSelect={onSelect}
            fromTimeChange={fromTimeChange}
            toTimeChange={toTimeChange}
            fetchingOrUpdating={fetchingRestaurantSchedule || updatingRestaurantSchedule}
          />
          <ScheduleRow
            text="Friday"
            schedule={schedule}
            onSelect={onSelect}
            fromTimeChange={fromTimeChange}
            toTimeChange={toTimeChange}
            fetchingOrUpdating={fetchingRestaurantSchedule || updatingRestaurantSchedule}
          />
          <ScheduleRow
            text="Saturday"
            schedule={schedule}
            onSelect={onSelect}
            fromTimeChange={fromTimeChange}
            toTimeChange={toTimeChange}
            fetchingOrUpdating={fetchingRestaurantSchedule || updatingRestaurantSchedule}
          />
          <ScheduleRow
            text="Sunday"
            schedule={schedule}
            onSelect={onSelect}
            fromTimeChange={fromTimeChange}
            toTimeChange={toTimeChange}
            fetchingOrUpdating={fetchingRestaurantSchedule || updatingRestaurantSchedule}
          />
        </div><div className="ButtonContainer" style={{ padding: '10px' }}>
          <Button
            text="Update"
            light={validate()}
            lightAction={() => null}
            iconLeft={<i className="fa fa-paper-plane" />}
            onClick={() => dispatch(customisedAction(UPDATE_RESTAURANT_SCHEDULE, { schedule, restaurantId }))}
          />
        </div>
      </div>
    </div>
  )
}

export default Schedule
