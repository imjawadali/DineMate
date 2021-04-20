import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'

import { Button, Input} from '../../../components'
import {customisedAction} from '../../../redux/actions'
import {  GET_ORDERS } from '../../../constants'

import OrderTable from './OderTable'
 
function OrderManagement () {
  const[search, setSearch] = useState("");

  const fetchingOrder = useSelector(({ ordersReducer }) => ordersReducer.fetchingOrder)
  const order = useSelector(({ ordersReducer }) => ordersReducer.order)
  const admin = useSelector(({ sessionReducer }) => sessionReducer.admin)
  const dispatch = useDispatch()

  const { restaurantId } = admin

  const getFilteredList = () => {
    let filteredQrs = order
    if (search && search.length && order) {
      filteredQrs = order.filter(
        (ord) =>
          ord.tableId.toLowerCase().includes(search.toLowerCase())||
          ord.orderNumber.toLowerCase().includes(search.toLowerCase()) ||         
          ord.type.toLowerCase().includes(search.toLowerCase()
          ) 
      )}
    return filteredQrs
  }

  return(
      <div className="Container">
          <div className="PageTitleContainer">
          <h2>Order Management</h2>
              <div className="PageTitleButtonContainer">
                  <Button
                      text="Add Table"
                      iconLeft={<i className="fa fa fa-plus-circle" />}
                        />
              </div>
              </div>
              <div className="TopOptionsContainer">
              <div className="TopInputContainer">
                  <Input
                      placeholder="Search Order (by Table No,Type)"
                      value={search}
                      onChange={({ target: { value } }) => setSearch(value)}
                  />
              </div>
          <div className="TopButtonContainer">
                  <Button
                    text={search ? "Clear" : "Search"}
                    iconLeft={<i className={`fa fa-${search ? 'times-circle' : 'refresh'}`} />}
                    onClick={() => search ? setSearch('') :dispatch(customisedAction(GET_ORDERS, { restaurantId, type: 'Dine-In' }))} 
                  />
              </div>
    </div>
    {fetchingOrder && !order ?
      <div className="loadingContainer">
        <p><i className={`fa fa-refresh ${fetchingOrder ? 'fa-pulse' : ''}`} style={{ padding: '0px 5px' }} />Fetching / Syncing Food Items . . .</p>
      </div> : null
    }
    <OrderTable
      order={getFilteredList()}
      restaurantId={restaurantId} />
    </div>
  )
}
export default OrderManagement