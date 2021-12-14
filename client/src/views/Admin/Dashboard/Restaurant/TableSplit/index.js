import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Button, Input, TitleWithAction } from '../../../../../components'
import { customisedAction } from '../../../../../redux/actions'
import { GET_TABLE_ORDERS, SET_TOAST, SPLIT_TABLE } from '../../../../../constants'

import OrdersList from './OrdersList'

function TableSplit(props) {

  const [tableId, settableId] = useState(null)
  const [tableToSplit, settableToSplit] = useState({})
  const [splitType, setsplitType] = useState('equal')
  const [splittedItem, setsplittedItem] = useState([])
  const [splittedItemTotal, setsplittedItemTotal] = useState(0)

  const fetchingTableOrders = useSelector(({ ordersReducer }) => ordersReducer.fetchingTableOrders)
  const tableOrders = useSelector(({ ordersReducer }) => ordersReducer.tableOrders)
  const splitId = useSelector(({ ordersReducer }) => ordersReducer.splitId)
  const admin = useSelector(({ sessionReducer }) => sessionReducer.admin)
  const dispatch = useDispatch()

  const { restaurantId } = admin

  const { location: { state }, history } = props

  useEffect(() => {
    if (!state)
      history.push('/')
    else {
      settableId(state.tableId)
      settableToSplit(state.tableToSplit)
      if (!tableOrders || !tableOrders.length)
        dispatch(customisedAction(GET_TABLE_ORDERS, { restaurantId, tableId: state.tableId }))
    }
  }, [])

  useEffect(() => {
    const temp = [...splittedItem]
    if (splitType === 'equal') {
      for (let index = 0; index < temp.length; index++) {
        temp[index].totalPrice = (tableToSplit.totalPrice / temp.length).toFixed(2)
        const quantity = tableToSplit.quantity * (temp[index].totalPrice / tableToSplit.totalPrice)
        temp[index].quantity = Number.isInteger(quantity) ? quantity : quantity.toFixed(2)
      }
      setsplittedItem(temp)
    }
  }, [splitType])

  useEffect(() => {
    let sum = 0
    if (splittedItem && splittedItem.length) {
      for (let index = 0; index < splittedItem.length; index++) {
        sum += Number(splittedItem[index].totalPrice)
      }
    }
    setsplittedItemTotal(sum)
  }, [splittedItem])

  const onSelect = (orderNumber) => {
    const temp = [...splittedItem]
    const split = temp.filter(item => item.orderNumber === orderNumber)
    if (split && split.length) {
      temp.splice(temp.indexOf(split[0]), 1)
    } else {
      temp.push({
        restaurantId,
        orderNumber,
        name: `Split - Table # ${tableId}`,
        status: 'R',
        totalPrice: 0,
        quantity: 0,
        splitted: 1
      })
    }
    if (splitType === 'equal') {
      for (let index = 0; index < temp.length; index++) {
        temp[index].totalPrice = (tableToSplit.totalPrice / temp.length).toFixed(2)
        const quantity = tableToSplit.quantity * (temp[index].totalPrice / tableToSplit.totalPrice)
        temp[index].quantity = Number.isInteger(quantity) ? quantity : quantity.toFixed(2)
      }
    }
    setsplittedItem(temp)
  }

  const onChange = (orderNumber, price) => {
    const temp = [...splittedItem]
    const split = temp.filter(item => item.orderNumber === orderNumber)
    temp[temp.indexOf(split[0])].totalPrice = price
    const quantity = tableToSplit.quantity * (price / tableToSplit.totalPrice)
    temp[temp.indexOf(split[0])].quantity = Number.isInteger(quantity) ? quantity : quantity.toFixed(2)
    setsplittedItem(temp)
  }

  const submit = () => {
    if (splittedItemTotal != tableToSplit.totalPrice)
      dispatch(customisedAction(SET_TOAST, { message: 'Splitted sum is not equal to item total', type: 'error' }))
    else
      dispatch(customisedAction(SPLIT_TABLE, { splitRestaurantId: restaurantId, splitTableId: tableId, splittedItem }, { history }))
  }

  return (
    <div className="Container">
      <TitleWithAction
        text={`Table Splitting (Table - ${tableId?.length === 1 ? 0 : ''}${tableId})`}
        textAlign="center"
        noMargin
        icon={<i
          className="fa fa-arrow-left fa-lg"
          style={{ cursor: 'pointer', marginRight: '10px' }}
          onClick={() => history.goBack()}
        />}
        button={<Button
          text="Submit"
          light={!!splitId}
          lightAction={() => null}
          onClick={() => submit()}
        />}
      />
      <div style={{ height: '95%', display: 'flex', flexDirection: 'row' }}>
        <div className="TabularContentContainer" style={{ flex: 1 }} >
          <div style={{ height: '85%' }}>
            <div className="TableDataContainer">
              <table>
                <thead>
                  <tr>
                    <th />
                    <th>Split - Table # {tableId}</th>
                    <th style={{ textAlign: 'center' }}>${(tableToSplit.totalPrice || 0).toFixed(2)}</th>
                  </tr>
                </thead>
                <tbody>
                  {tableOrders && tableOrders.length ?
                    tableOrders.map((order) => {
                      const { orderNumber, firstName } = order
                      return (
                        <tr key={orderNumber}>
                          <td style={{ textAlign: 'center' }}>
                            <input
                              type="checkbox"
                              checked={!!splittedItem.filter(item => item.orderNumber === orderNumber).length}
                              onChange={() => onSelect(orderNumber)}
                            />
                          </td>
                          <td>Check {orderNumber} - {firstName}</td>
                          <td style={{ display: 'flex', alignItems: 'center' }}>
                            $
                            <Input
                              type="number"
                              style={{ marginLeft: '5px' }}
                              disabled={splitType === 'equal' || !splittedItem.filter(item => item.orderNumber === orderNumber).length}
                              value={splittedItem.filter(item => item.orderNumber === orderNumber).length ?
                                splittedItem.filter(item => item.orderNumber === orderNumber)[0].totalPrice
                                : ''}
                              onChange={({ target: { value } }) => onChange(orderNumber, value)}
                            />
                          </td>
                        </tr>
                      )
                    }) : null
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ height: '5%' }}>
            <table>
              <thead>
                <tr>
                  <th />
                  <th style={{ textAlign: 'end' }}>Split Item Total:</th>
                  <th style={{ color: 'red', textDecoration: 'underline' }}>${splittedItemTotal.toFixed(2)}</th>
                </tr>
              </thead>
            </table>
          </div>
          <div style={{ height: '10%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
            <Button
              text="Equal Split"
              light={splitType === 'equal'}
              lightAction={() => null}
              onClick={() => setsplitType('equal')}
            />
            <Button
              text="Manual Split"
              light={splitType === 'manual'}
              lightAction={() => null}
              onClick={() => setsplitType('manual')}
            />
          </div>
        </div>
        <div className="TabularContentContainer" style={{ flex: 2 }} >
          <OrdersList fetchingTableOrders={fetchingTableOrders} tableOrders={tableOrders} splittedItem={splittedItem} />
        </div>
      </div>
    </div>
  )
}
export default TableSplit