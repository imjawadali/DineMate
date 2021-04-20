import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { customisedAction } from '../../../../../../redux/actions'
import { CLEAR_ORDER_ITEM_DETAILS, CLOSE_ORDER } from '../../../../../../constants'

import { SmallButton, SmallButtonRed } from '../../../../../../components'

function OrdersList(props) {
  
  const closingId = useSelector(({ ordersReducer }) => ordersReducer.closingId)

  const { restaurantId, tableOrders, history } = props
  const dispatch = useDispatch()

  var sum = 0

  return (
    <div className="HorizontalScrollContainer">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Check Number</th>
            <th>Guest Name</th>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Details</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableOrders && tableOrders.length ?
            tableOrders.map((tableOrder) => {
              const { orderNumber, items } = tableOrder
              const orderItems = items && JSON.parse(items)
              return (
                orderItems && orderItems.length ?
                  orderItems.map((orderItem, index) => {
                    sum += orderItem.totalPrice
                    return (
                      <tr key={orderItem.id}>
                        <td />
                        <td>{!index ? orderNumber : ''}</td>
                        <td>{!index ? '-' : ''}</td>
                        <td>{orderItem.name}</td>
                        <td style={{ textAlign: 'end' }}>{orderItem.quantity}</td>
                        <td style={{ textAlign: 'end' }}>$ {orderItem.totalPrice}</td>
                        <td>
                          <SmallButton
                            style={{ width: '100%' }}
                            text="Details"
                            light={!!closingId}
                            lightAction={() => null}
                            iconLeft={<i className="fa fa-info" />}
                            onClick={() => {
                              dispatch(customisedAction(CLEAR_ORDER_ITEM_DETAILS))
                              history.push({
                                pathname: '/client/admin/dashboard/restaurantAdmin/orderDetails/itemDetails',
                                state: { restaurantId, id: orderItem.id, orderNumber }
                              })
                            }}
                          />
                        </td>
                        <td>
                          {!index ?
                            <SmallButtonRed
                              style={{ width: '100%' }}
                              text="Close Check"
                              light={closingId === orderNumber}
                              lightAction={() => null}
                              iconLeft={<i className="fa fa-trash" />}
                              onClick={() => dispatch(customisedAction(CLOSE_ORDER, { restaurantId, orderNumber, history }))}
                            />
                          : null}
                        </td>
                      </tr>
                    )
                  })
                :
                <tr key={orderNumber}>
                  <td />
                  <td>{orderNumber}</td>
                  <td>-</td>
                  <td colSpan="4" style={{ textAlign: 'center' }}>No items added in cart!</td>
                  <td>
                    <SmallButtonRed
                      style={{ width: '100%' }}
                      text="Close Check"
                      light={closingId === orderNumber}
                      lightAction={() => null}
                      iconLeft={<i className="fa fa-trash" />}
                      onClick={() => dispatch(customisedAction(CLOSE_ORDER, { restaurantId, orderNumber, history }))}
                    />
                  </td>
                </tr>
              )
            }) : 
            <tr>
              <td colSpan="8" style={{ textAlign: 'center' }}>No Data Found!</td>
            </tr>
          }
          {tableOrders && tableOrders.length ?
            <tr key="-">
              <td style={{ fontWeight: 'bold' }}>Total</td>
              <td colSpan="4" />
              <td style={{ fontWeight: 'bold', textAlign: 'end' }}>$ {sum}</td>
              <td colSpan="2" />
            </tr>
            : null
          }
        </tbody>
      </table>
    </div>
  )
}

export default OrdersList
