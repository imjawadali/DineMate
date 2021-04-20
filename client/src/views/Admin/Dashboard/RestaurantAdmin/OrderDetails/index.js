import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { customisedAction } from '../../../../../redux/actions'
import { GET_TABLE_ORDERS } from '../../../../../constants'

import OrdersList from './OrdersList'
import { Button, TitleWithAction } from '../../../../../components'

function OrderDetails(props) {

  const [restaurantId, setrestaurantId] = useState(null)
  const [tableId, settableId] = useState(null)
  const [mergedTables, setmergedTables] = useState(null)

  const fetchingTableOrders = useSelector(({ ordersReducer }) => ordersReducer.fetchingTableOrders)
  const tableOrders = useSelector(({ ordersReducer }) => ordersReducer.tableOrders)
  const dispatch = useDispatch()

  const { location: { state }, history } = props

  useEffect(() => {
    if (!state) {
      history.push('/')
    } else {
      dispatch(customisedAction(GET_TABLE_ORDERS, { restaurantId: state.restaurantId, tableId: state.tableId }))
      setrestaurantId(state.restaurantId)
      settableId(state.tableId)
      setmergedTables(state.mergedTables)
    }
  }, [])

  return (
    <div className="Container">
      <TitleWithAction
        text={`
          ${!mergedTables ?
            `Table - ${tableId && tableId.replace(`${restaurantId}/`, '').length === 1 && 0}${tableId && tableId.replace(`${restaurantId}/`, '')}`
            : `${
              `Table(s) - Merged: 
              ${mergedTables.map((table) => 
                `${table.value.replace(`${restaurantId}/`, '').length === 1 ? 0 : ''}${table.value.replace(`${restaurantId}/`, '')}`
              )}`
            }`
          }`
        }
        textAlign="center"
        icon={<i
          className="fa fa-arrow-left fa-lg"
          style={{ cursor: 'pointer', marginRight: '10px' }}
          onClick={() => history.goBack()}
        />}
        button={<Button
          text={fetchingTableOrders ? "Syncing" : "Refresh"}
          light={fetchingTableOrders}
          lightAction={() => null}
          iconLeft={<i className={`fa fa-refresh ${fetchingTableOrders ? 'fa-pulse' : ''}`} />}
          onClick={() => dispatch(customisedAction(GET_TABLE_ORDERS, { restaurantId, tableId }))}
        />}
      />
      {fetchingTableOrders && !tableOrders ?
        <div className="loadingContainer">
          <p><i className={`fa fa-refresh ${fetchingTableOrders ? 'fa-pulse' : ''}`} style={{ padding: '0px 5px' }} />Fetching Order Details . . .</p>
        </div> : null
      }
      <OrdersList restaurantId={restaurantId} tableOrders={tableOrders} history={history} />
    </div>
  )
}

export default OrderDetails
