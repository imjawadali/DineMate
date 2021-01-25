import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { customisedAction } from '../../../redux/actions'
import { GET_EXISTING_QRS } from '../../../constants'

import { Button, Input } from '../../../components'

import TablesList from './TablesList'

function Tables(props) {

  const [qrFetchCalled, setqrFetchCalled] = useState(false)
  const [filterKey, setfilterKey] = useState('')

  const fetchingQrs = useSelector(({ restaurantReducer }) => restaurantReducer.fetchingQrs)
  const qrs = useSelector(({ restaurantReducer }) => restaurantReducer.qrs)
  const admin = useSelector(({ sessionReducer }) => sessionReducer.admin)
  const dispatch = useDispatch()

  const { restaurantId } = admin

  useEffect(() => {
    if (!qrFetchCalled && !fetchingQrs && !qrs) {
      setqrFetchCalled(true)
      dispatch(customisedAction(GET_EXISTING_QRS, { restaurantId }))
    }
  }, [])

  const getFilteredQrs = () => {
    let filteredQrs = qrs
    if (filterKey && filterKey.length && qrs) {
      filteredQrs = qrs.filter(
        (qr) => qr.value.toLowerCase().includes(filterKey.toLowerCase())
        || qr.active == filterKey
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
            placeholder="Search Restaurants"
            value={filterKey}
            onChange={({ target: { value } }) => setfilterKey(value)}
          />
        </div>
        <div className="TopButtonContainer">
          <Button
            text="Refresh"
            iconLeft={<i className="fa fa-refresh" />}
            onClick={() => dispatch(customisedAction(GET_EXISTING_QRS, { restaurantId }))} />
        </div>
      </div>
      {fetchingQrs ?
        <div className="loadingContainer">
          <p><i className="fa fa-refresh" style={{ paddingRight: '5px' }} />Fetching Tables . . .</p>
        </div> : null
      }
      <TablesList history={props.history} restaurantId={restaurantId} tables={getFilteredQrs()} />
    </div>
  )
}

export default Tables