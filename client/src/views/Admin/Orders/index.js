import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Input, Pagination } from '../../../components'
import { customisedAction } from '../../../redux/actions'
import { GET_ORDERS, PER_PAGE_COUNTS } from '../../../constants'

import OrdersList from './OrdersList'

function Orders(props) {

  const [searchKey, setsearchKey] = useState("")
  const [filterKey, setfilterKey] = useState("All")
  const [currentIndex, setcurrentIndex] = useState(1)

  const fetchingOrders = useSelector(({ ordersReducer }) => ordersReducer.fetchingOrders)
  const orders = useSelector(({ ordersReducer }) => ordersReducer.orders)
  const admin = useSelector(({ sessionReducer }) => sessionReducer.admin)
  const dispatch = useDispatch()

  const { restaurantId } = admin

  useEffect(() => {
    dispatch(customisedAction(GET_ORDERS, { restaurantId, status: 1 }))
  }, [])

  const getFilteredList = () => {
    let filteredQrs = orders
    if (searchKey && searchKey.length && orders) {
      filteredQrs = orders.filter(
        (ord) =>
          (ord.tableId && ord.tableId.includes(searchKey)) ||
          ord.orderNumber.includes(searchKey)
      )
    }
    return filteredQrs
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
      <h2>Order Management</h2>
      <div className="TabularContentContainer">
        <div className="TableTopContainer">
          <div className="TopLeftContainer">
            <div className="TableButtons TableButtonGreen"
              style={{ opacity: filterKey === 'All' ? 0.5 : '' }}
              onClick={() => {
                setfilterKey('All')
                setcurrentIndex(1)
                dispatch(customisedAction(GET_ORDERS, { restaurantId, status: 1 }))
              }}>
              <p>All</p>
            </div>
            <div className="TableButtons TableButtonGreen"
              style={{ opacity: filterKey === 'Dine-In' ? 0.5 : '' }}
              onClick={() => {
                setfilterKey('Dine-In')
                setcurrentIndex(1)
                dispatch(customisedAction(GET_ORDERS, { restaurantId, type: 'Dine-In', status: 1 }))
              }}>
              <p>Dine-In</p>
            </div>
            <div className="TableButtons TableButtonGreen"
              style={{ opacity: filterKey === 'Take-Away' ? 0.5 : '' }}
              onClick={() => {
                setfilterKey('Take-Away')
                setcurrentIndex(1)
                dispatch(customisedAction(GET_ORDERS, { restaurantId, type: 'Take-Away', status: 1 }))
              }}>
              <p>Take-Away</p>
            </div>
            <div className="TableButtons TableButtonGreen"
              style={{ opacity: filterKey === 'Closed' ? 0.5 : '' }}
              onClick={() => {
                setfilterKey('Closed')
                setcurrentIndex(1)
                dispatch(customisedAction(GET_ORDERS, { restaurantId, status: 0 }))
              }}>
              <p>Closed</p>
            </div>
          </div>
          <div className="TopRightContainer">
            <Input
              style={{ border: 'none', borderBottom: 'none', background: searchKey ? 'white' : 'transparent' }}
              placeholder={filterKey !== 'Take-Away' ? "Search (by Check #, Table #)" : "Search (by Check #)"}
              type="number"
              value={searchKey}
              onChange={({ target: { value } }) => {
                if (value !== '0') {
                  setsearchKey(value < 0 ? `${value * -1}` : value)
                  setcurrentIndex(1)
                }
              }}
            />
            <i
              style={{ margin: '0px 10px', color: searchKey ? 'red' : '' }}
              className={`fa fa-${searchKey ? 'times-circle' : fetchingOrders ? 'refresh fa-pulse' : 'refresh'} fa-lg`}
              onClick={() => {
                if (searchKey) setsearchKey('')
                else {
                  setcurrentIndex(1)
                  switch (filterKey) {
                    case 'Dine-In':
                      dispatch(customisedAction(GET_ORDERS, { restaurantId, type: 'Dine-In', status: 1 }))
                      break;
                    case 'Take-Away':
                      dispatch(customisedAction(GET_ORDERS, { restaurantId, type: 'Take-Away', status: 1 }))
                      break;
                    case 'Closed':
                      dispatch(customisedAction(GET_ORDERS, { restaurantId, status: 0 }))
                      break;
                    default:
                      dispatch(customisedAction(GET_ORDERS, { restaurantId, status: 1 }))
                      break;
                  }
                }
              }} />
            <div className="TableButtons TableButtonOrange"
              style={{ marginRight: '5px' }}
              onClick={() => props.history.push('/client/admin/ordersManagement/newOrder')}>
              <p>New Order</p>
            </div>
          </div>
        </div>
        <OrdersList orders={paginate(getFilteredList())} fetchingOrders={fetchingOrders} restaurantId={restaurantId} history={props.history} />
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
export default Orders