import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { DropDown, Input, Pagination } from '../../../components'
import { customisedAction } from '../../../redux/actions'
import { GET_ORDERS, PER_PAGE_COUNTS } from '../../../constants'

import OrdersList from './OrdersList'

function Orders() {

  const [filterKey, setfilterKey] = useState("")
  const [currentIndex, setcurrentIndex] = useState(1)
  const [type, settype] = useState('Dine-In')
  const [status, setstatus] = useState(1)

  const fetchingOrders = useSelector(({ ordersReducer }) => ordersReducer.fetchingOrders)
  const orders = useSelector(({ ordersReducer }) => ordersReducer.orders)
  const admin = useSelector(({ sessionReducer }) => sessionReducer.admin)
  const dispatch = useDispatch()

  const { restaurantId } = admin

  useEffect(() => {
    setcurrentIndex(1)
    dispatch(customisedAction(GET_ORDERS, { restaurantId, type, status: status == 1 ? 1 : '0' }))
  }, [type, status])

  const getFilteredList = () => {
    let filteredQrs = orders
    if (filterKey && filterKey.length && orders) {
      filteredQrs = orders.filter(
        (ord) =>
          ord.tableId.toLowerCase().includes(filterKey.toLowerCase()) ||
          ord.orderNumber.toLowerCase().includes(filterKey.toLowerCase())
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
            <DropDown
              style={{ border: 'none', borderBottom: '1px solid black', background: type ? 'white' : 'transparent' }}
              placeholder="Select type"
              options={['Dine-In','Take-Away']}
              value={type}
              onChange={({ target: { value } }) => settype(value)}
            />
            <DropDown
              style={{ border: 'none', borderBottom: '1px solid black', background: status ? 'white' : 'transparent' }}
              placeholder="Select status"
              options={[{
                label: 'Open',
                value: 1
              },{
                label: 'Close',
                value: 0
              }]}
              value={status}
              onChange={({ target: { value } }) => setstatus(value)}
            />
          </div>
          <div className="TopRightContainer">
            <Input
              style={{ border: 'none', borderBottom: '1px solid black', background: filterKey ? 'white' : 'transparent' }}
              placeholder="Search (by Check #, Table #)"
              type="number"
              value={filterKey}
              onChange={({ target: { value } }) => {
                if (value !== '0') {
                  setfilterKey(value < 0 ? `${value * -1}` : value)
                  setcurrentIndex(1)
                }
              }}
            />
            <i
              style={{ margin: '0px 10px', color: filterKey ? 'red' : '' }}
              className={`fa fa-${filterKey ? 'times-circle' : fetchingOrders ? 'refresh fa-pulse' : 'refresh'} fa-lg`}
              onClick={() => filterKey ? setfilterKey('') : dispatch(customisedAction(GET_ORDERS, { restaurantId, type, status: status == 1 ? 1 : '0' }))} />
          </div>
        </div>
        <OrdersList orders={paginate(getFilteredList())} fetchingOrders={fetchingOrders} restaurantId={restaurantId} />
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