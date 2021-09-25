import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { customisedAction } from '../../../../../../redux/actions'
import { CLEAR_ORDER_ITEM_DETAILS, CLOSE_ORDER, SET_TOAST } from '../../../../../../constants'

import { TableActionicons } from '../../../../../../components'

function OrdersList(props) {

  const closingId = useSelector(({ ordersReducer }) => ordersReducer.closingId)

  const { restaurantId, tableOrders, fetchingTableOrders, history } = props
  const dispatch = useDispatch()

  var sum = 0

  return (
    <div className="TableDataContainer">
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>Manage</th>
            <th />
            <th style={{ textAlign: 'center' }}>Status</th>
            <th style={{ textAlign: 'center' }}>Check Number</th>
            <th>Guest Name</th>
            <th>Item Name</th>
            <th style={{ textAlign: 'center' }}>Quantity</th>
            <th style={{ textAlign: 'center' }}>Price</th>
          </tr>
        </thead>
        <tbody>
          {tableOrders && tableOrders.length ?
            tableOrders.map((tableOrder) => {
              const { orderNumber, tableId, firstName, lastName, items, customerStatus } = tableOrder
              let orderItems
              try {
                orderItems = items && JSON.parse(items)
              } catch (error) {
                console.log(items)
              }
              return (
                <>{orderItems && orderItems.length ?
                  orderItems.map((orderItem, index) => {
                    const { id, name, quantity, status, splitted, vanished, totalPrice } = orderItem
                    sum += totalPrice
                    return (
                      <tr key={id} className={index === orderItems.length - 1 ? '' : 'NoBorder'}>
                        <td>
                          {!index && <TableActionicons
                            icon={`fa fa-ban`}
                            onClick={() => closingId !== orderNumber ?
                              dispatch(customisedAction(CLOSE_ORDER, { restaurantId, orderNumber, history }))
                              : null
                            }
                          />}
                        </td>
                        <td>
                          <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <TableActionicons
                              icon={`fa fa-info`}
                              onClick={() => {
                                dispatch(customisedAction(CLEAR_ORDER_ITEM_DETAILS))
                                history.push({
                                  pathname: '/client/admin/dashboard/restaurant/tableOrders/itemDetails',
                                  state: { restaurantId, id, orderNumber }
                                })
                              }}
                            />
                            <TableActionicons
                              icon={`fa fa-columns`}
                              style={{ marginLeft: '20px', opacity: vanished ? 0.5 : '' }}
                              onClick={() => {
                                if (closingId !== orderNumber && !vanished) {
                                  if (totalPrice !== 0) {
                                    if (!splitted) {
                                      history.push({
                                        pathname: '/client/admin/dashboard/restaurant/itemSplit', state: {
                                          orderNumber,
                                          tableId: tableId,
                                          itemToSplit: { id, name, quantity, totalPrice }
                                        }
                                      })
                                    } else dispatch(customisedAction(SET_TOAST, { message: 'Can\'t split shared item', type: 'error' }))
                                  } else dispatch(customisedAction(SET_TOAST, { message: 'Can\'t split item with price "0"', type: 'error' }))
                                }
                              }}
                            />
                          </div>
                        </td>
                        <td style={{ color: customerStatus ? 'blue' : 'green', textAlign: 'center' }}>{!index ? customerStatus ? "Ready to close" : "Open" : ''}</td>
                        <td style={{ textAlign: 'center' }}>{!index ? orderNumber : ''}</td>
                        <td>{!index ? firstName ? firstName + ' ' + lastName : '-' : ''}</td>
                        <td style={{
                          textDecorationLine: vanished ? 'line-through' : '',
                          opacity: vanished ? 0.5 : ''
                        }}>{name}</td>
                        <td style={{
                          textAlign: 'center',
                          textDecorationLine: vanished ? 'line-through' : '',
                          opacity: vanished ? 0.5 : ''
                        }}>{quantity}</td>
                        <td style={{
                          textAlign: 'end',
                          textDecorationLine: vanished ? 'line-through' : '',
                          opacity: vanished ? 0.5 : ''
                        }}>${totalPrice.toFixed(2)}</td>
                      </tr>
                    )
                  })
                  :
                  <tr key={orderNumber}>
                    <td>
                      <TableActionicons
                        icon={`fa fa-ban`}
                        onClick={() => closingId !== orderNumber ?
                          dispatch(customisedAction(CLOSE_ORDER, { restaurantId, orderNumber, history }))
                          : null
                        }
                      />
                    </td>
                    <td />
                    <td style={{ color: customerStatus ? 'blue' : 'green', textAlign: 'center' }}>{customerStatus ? "Ready to close" : "Open"}</td>
                    <td style={{ textAlign: 'center' }}>{orderNumber}</td>
                    <td>{firstName ? firstName + ' ' + lastName : '-'}</td>
                    <td colSpan="3">-</td>
                  </tr>}
                  <tr><td colSpan="10" style={{ backgroundColor: 'white', margin: '10px 0px' }} /></tr>
                </>
              )
            }) :
            <tr>
              <td colSpan="8" style={{ textAlign: 'center' }}>
                {fetchingTableOrders ?
                  <p><i className={`fa fa-refresh ${fetchingTableOrders ? 'fa-pulse' : ''}`} style={{ padding: '0px 5px' }} />Fetching Table Check(s) . . .</p>
                  : 'No Data Found!'}
              </td>
            </tr>
          }
          {tableOrders && tableOrders.length ?
            <tr key="-">
              <td style={{ fontWeight: 'bold' }}>Total</td>
              <td colSpan="6" />
              <td style={{ fontWeight: 'bold', textAlign: 'end' }}>${sum.toFixed(2)}</td>
            </tr>
            : null
          }
        </tbody>
      </table>
    </div>
  )
}

export default OrdersList
