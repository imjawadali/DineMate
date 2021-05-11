import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { customisedAction } from '../../../redux/actions'
import { GET_EXISTING_QRS } from '../../../constants'

import { Button, Input } from '../../../components'

import TablesList from './TablesList'

function Tables(props) {

  const [filterKey, setfilterKey] = useState('')

  const fetchingQrs = useSelector(({ restaurantReducer }) => restaurantReducer.fetchingQrs)
  const qrs = useSelector(({ restaurantReducer }) => restaurantReducer.qrs)
  const admin = useSelector(({ sessionReducer }) => sessionReducer.admin)
  const dispatch = useDispatch()

  const { restaurantId } = admin

  const getFilteredList = () => {
    let filteredQrs = qrs
    if (filterKey && filterKey.length && qrs) {
      filteredQrs = qrs.filter(
        (qr) => qr.value.toLowerCase().includes(filterKey.toLowerCase())
      )
    }
    return filteredQrs
  }

  return (
    <div className="Container">
      <h2>Tables Management</h2>
      <div className="TopOptionsContainer">
        <div className="TopInputContainer">
          <Input 
            placeholder="Search Table (by Table No.)"
            value={filterKey}
            onChange={({ target: { value } }) => setfilterKey(value)}
          />
        </div>
        <div className="TopButtonContainer">
          <Button
            text={filterKey ? "Clear" : fetchingQrs ? "Syncing" : "Refresh"}
            light={fetchingQrs}
            lightAction={() => null}
            iconLeft={<i className={`fa fa-${filterKey ? 'times-circle' : fetchingQrs ? 'refresh fa-pulse' : 'refresh'}`} />}
            onClick={() => filterKey ? setfilterKey('') : dispatch(customisedAction(GET_EXISTING_QRS, { restaurantId }))} />
        </div>
      </div>
      <TablesList history={props.history} fetchingQrs={fetchingQrs} restaurantId={restaurantId} tables={getFilteredList()} />
    </div>
  )
}

export default Tables
