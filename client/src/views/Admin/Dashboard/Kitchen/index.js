import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Input, Pagination } from '../../../../components'
import { GET_KITCHEN_DASHBOARD, PER_PAGE_COUNTS } from '../../../../constants'
import { getTimeObject } from '../../../../helpers'
import { customisedAction } from '../../../../redux/actions'

import OrdersList from './OrdersList'

function Kitchen() {

  const [filterKey, setfilterKey] = useState('')
  const [category, setcategory] = useState(null)
  const [late, setlate] = useState(false)
  const [dineInCounts, setdineInCounts] = useState(0)
  const [takeawayCounts, settakeawayCounts] = useState(0)
  const [lateCounts, setlateCounts] = useState(0)
  const [currentIndex, setcurrentIndex] = useState(1)

  const admin = useSelector(({ sessionReducer }) => sessionReducer.admin)
  const fetchingDashboard = useSelector(({ dashboardReducer }) => dashboardReducer.fetchingDashboard)
  const kitchenDashboard = useSelector(({ dashboardReducer }) => dashboardReducer.kitchenDashboard)
  const dispatch = useDispatch()

  const { restaurantId } = admin

  useEffect(() => {
    if (kitchenDashboard && kitchenDashboard.length) {
      setdineInCounts(kitchenDashboard.filter((order) => {
        if (order.data[0].type === 'Dine-In')
          return order
      }).length)
      settakeawayCounts(kitchenDashboard.filter((order) => {
        if (order.data[0].type === 'Take-Away')
          return order
      }).length)
      setlateCounts(kitchenDashboard.filter((order) => {
        const time = getTimeObject(order.data[order.data.length - 1].time)
        if (time.hrs || time.mints > 9)
          return order
      }).length)
    }
  }, [kitchenDashboard])

  const getFilteredList = () => {
    let filteredOrders = kitchenDashboard
    if (kitchenDashboard && kitchenDashboard.length) {
      if (late) {
        filteredOrders = filteredOrders.filter((order) => {
          const time = getTimeObject(order.data[order.data.length - 1].time)
          if (time.hrs || time.mints > 9)
            return order
        })
      }
      if (category) {
        filteredOrders = filteredOrders.filter((order) => {
          if (order.data[0].type === category)
            return order
        })
      }
      if (filterKey && filterKey.length) {
        filteredOrders = filteredOrders.filter(
          (order) => order.id.includes(filterKey)
            || order.data.map((item) => item.tableId).includes(filterKey)
        )
      }
    }
    return filteredOrders
  }

  const paginate = (list) => {
    let paginatedList = list ? [...list] : list
    if (currentIndex && list && list.length) {
      paginatedList = paginatedList.slice(((currentIndex * PER_PAGE_COUNTS) - PER_PAGE_COUNTS), (currentIndex * PER_PAGE_COUNTS))
    }
    return paginatedList
  }

  return (
    <div className="Container">
      <div className="TabularContentContainer" style={{ marginTop: '0px' }}>
        <div className="TableTopContainer">
          <div className="TopLeftContainer">
            <div className="TableButtons TableButtonGreen"
              style={{ opacity: !category && !late ? 0.5 : '' }}
              onClick={() => {
                setcategory(null)
                setlate(false)
              }}>
              <p>All</p>
              <p>{dineInCounts + takeawayCounts}</p>
            </div>
            <div className="TableButtons TableButtonGreen"
              style={{ opacity: category === 'Dine-In' ? 0.5 : '' }}
              onClick={() => setcategory(category === 'Dine-In' ? null : 'Dine-In')}>
              <p>Dine-In</p>
              <p>{dineInCounts}</p>
            </div>
            <div className="TableButtons TableButtonGreen"
              style={{ opacity: category === 'Take-Away' ? 0.5 : '' }}
              onClick={() => setcategory(category === 'Take-Away' ? null : 'Take-Away')}>
              <p>Take-Away</p>
              <p>{takeawayCounts}</p>
            </div>
            <div className="TableButtons TableButtonOrange"
              style={{ opacity: late ? 0.5 : '' }}
              onClick={() => setlate(!late)}>
              <p>Late</p>
              <p>{lateCounts}</p>
            </div>
          </div>
          <div className="TopRightContainer">
            <Input
              style={{ border: 'none', borderBottom: '1px solid black', background: filterKey ? 'white' : 'transparent' }}
              placeholder="Search (by Check #, Table #)"
              value={filterKey}
              onChange={({ target: { value } }) => {
                setfilterKey(value)
                setcurrentIndex(1)
              }}
            />
            <i
              style={{ margin: '0px 10px', color: filterKey ? 'red' : '' }}
              className={`fa fa-${filterKey ? 'times-circle' : fetchingDashboard ? 'refresh fa-pulse' : 'refresh'} fa-lg`}
              onClick={() => filterKey ? setfilterKey('') : dispatch(customisedAction(GET_KITCHEN_DASHBOARD, { restaurantId }))} />
          </div>
        </div>
        <OrdersList restaurantId={restaurantId} fetchingDashboard={fetchingDashboard} kitchenDashboard={paginate(getFilteredList())} />
        {getFilteredList() && getFilteredList().length && getFilteredList().length > PER_PAGE_COUNTS ?
          <Pagination
            currentIndex={currentIndex}
            mappingCounts={Array(parseInt(getFilteredList().length / PER_PAGE_COUNTS) + 1).fill('0')}
            totalCounts={getFilteredList().length}
            perPageCounts={PER_PAGE_COUNTS}
            onClick={(index) => setcurrentIndex(index)}
          />
          : null}
      </div>
    </div>
  )
}

export default Kitchen
