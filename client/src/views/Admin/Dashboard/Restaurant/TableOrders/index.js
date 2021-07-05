import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { customisedAction } from '../../../../../redux/actions'
import { GET_TABLE_ORDERS } from '../../../../../constants'

import OrdersList from './OrdersList'
import { Button, TitleWithAction } from '../../../../../components'

function TableOrders(props) {

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
            `Table - ${tableId && tableId.length === 1 ? 0 : ''}${tableId}`
            : `${
              `Table(s) - Merged: 
              ${mergedTables.map((table) => 
                `${table.value.length === 1 ? 0 : ''}${table.value}`
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
      <div className="TabularContentContainer" style={{ marginTop: '0px' }}>
        <OrdersList restaurantId={restaurantId} fetchingTableOrders={fetchingTableOrders} tableOrders={tableOrders} history={history} />
      </div>
    </div>
  )
}

export default TableOrders
