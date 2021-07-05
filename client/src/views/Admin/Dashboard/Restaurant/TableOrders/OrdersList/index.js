import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { customisedAction } from '../../../../../../redux/actions'
import { CLEAR_ORDER_ITEM_DETAILS, CLOSE_ORDER } from '../../../../../../constants'

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
              const { orderNumber, items } = tableOrder
              let orderItems
              try {
                orderItems = items && JSON.parse(items)
              } catch (error) {
                console.log(items)
              }
              return (
                <>{orderItems && orderItems.length ?
                  orderItems.map((orderItem, index) => {
                    sum += orderItem.totalPrice
                    return (
                      <tr key={orderItem.id} className={index === orderItems.length - 1 ? '' : 'NoBorder'}>
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
                                  state: { restaurantId, id: orderItem.id, orderNumber }
                                })
                              }}
                            />
                          </div>
                        </td>
                        <td style={{ textAlign: 'center' }}>{!index ? orderNumber : ''}</td>
                        <td>{!index ? '-' : ''}</td>
                        <td>{orderItem.name}</td>
                        <td style={{ textAlign: 'center' }}>{orderItem.quantity}</td>
                        <td style={{ textAlign: 'center' }}>$ {orderItem.totalPrice}</td>
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
                    <td style={{ textAlign: 'center' }}>{orderNumber}</td>
                    <td>-</td>
                    <td colSpan="3">-</td>
                  </tr>}
                  <tr><td colSpan="10" style={{ backgroundColor: 'white', margin: '10px 0px' }} /></tr>
                  </>
              )
            }) :
            <tr>
              <td colSpan="8" style={{ textAlign: 'center' }}>
                {fetchingTableOrders ?
                  <p><i className={`fa fa-refresh ${fetchingTableOrders ? 'fa-pulse' : ''}`} style={{ padding: '0px 5px' }} />Fetching Table Order . . .</p>
                  : 'No Data Found!'}
              </td>
            </tr>
          }
          {tableOrders && tableOrders.length ?
            <tr key="-">
              <td style={{ fontWeight: 'bold' }}>Total</td>
              <td colSpan="5" />
              <td style={{ fontWeight: 'bold', textAlign: 'center' }}>$ {sum}</td>
            </tr>
            : null
          }
        </tbody>
      </table>
    </div>
  )
}

export default OrdersList
