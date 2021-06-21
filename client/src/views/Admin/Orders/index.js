import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Button, Input } from '../../../components'
import { customisedAction } from '../../../redux/actions'
import { GET_ORDERS } from '../../../constants'

import OrdersList from './OrdersList'

function Orders() {
  const [filterKey, setSearch] = useState("");

  const fetchingOrders = useSelector(({ ordersReducer }) => ordersReducer.fetchingOrders)
  const orders = useSelector(({ ordersReducer }) => ordersReducer.orders)
  const admin = useSelector(({ sessionReducer }) => sessionReducer.admin)
  const dispatch = useDispatch()

  const { restaurantId } = admin

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

  return (
    <div className="Container">
      <div className="PageTitleContainer">
        <h2>Order Management</h2>
      </div>
      <div className="TopOptionsContainer">
        <div className="TopInputContainer">
          <Input
            placeholder="Search Order (by Table No,Type)"
            type="number"
            value={filterKey}
            onChange={({ target: { value } }) => setSearch(value)}
          />
        </div>
        <div className="TopButtonContainer">
          <Button
            text={filterKey ? "Clear" : fetchingOrders ? "Syncing" : "Refresh" }
            light={fetchingOrders}
            lightAction={() => null}
            iconLeft={<i className={`fa fa-${filterKey ? 'times-circle' : fetchingOrders ? 'refresh fa-pulse' : 'refresh'}`} />}
            onClick={() => filterKey ? setSearch('') : dispatch(customisedAction(GET_ORDERS, { restaurantId, type: 'Dine-In' }))} />
        </div>
      </div>
      <OrdersList orders={getFilteredList()} fetchingOrders={fetchingOrders} restaurantId={restaurantId} />
    </div>
  )
}
export default Orders