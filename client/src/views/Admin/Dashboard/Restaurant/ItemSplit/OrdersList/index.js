import React from 'react'

function OrdersList(props) {

  const { tableOrders, fetchingTableOrders, splitItemId, splittedItem } = props

  return (
    <div className="TableDataContainer">
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>Chk #</th>
            <th>Guest Name</th>
            <th>Item Name</th>
            <th style={{ textAlign: 'center' }}>Quantity</th>
            <th style={{ textAlign: 'end' }}>Price</th>
          </tr>
        </thead>
        <tbody>
          {tableOrders && tableOrders.length ?
            tableOrders.map((tableOrder) => {
              var foodTotal = 0
              var discountAmount = 0
              var subTotal = 0
              var tax = 0
              const { orderNumber, taxPercentage, discountType, discount, tip, firstName, lastName, items } = tableOrder
              let orderItems
              try {
                orderItems = items && JSON.parse(items)
              } catch (error) {
                console.log(items)
              }
              return (
                <>
                  {
                    orderItems && orderItems.length ?
                      orderItems.map((orderItem, index) => {
                        if (orderItem.id !== splitItemId) foodTotal += orderItem.totalPrice
                        if (index === orderItems.length - 1) {
                          if (discount) {
                            discountAmount = discount
                            if (discountType === '%') {
                              discountAmount = (foodTotal * discount) / 100
                            }
                          }
                          if (discountAmount < foodTotal) {
                            subTotal = foodTotal - discountAmount
                            tax = (subTotal * taxPercentage) / 100
                          } else {
                            subTotal = 0
                            tax = 0
                          }
                        }
                        return (
                          <tr key={orderItem.id} className={index === orderItems.length - 1 ? '' : 'NoBorder'}>
                            <td style={{ textAlign: 'center' }}>{!index ? orderNumber : ''}</td>
                            <td>{!index ? firstName ? firstName + ' ' + lastName : '-' : ''}</td>
                            <td style={{ width: '20vw', color: orderItem.id !== splitItemId ? '' : 'lightBlue' }}>{orderItem.name}</td>
                            {<td style={{ textAlign: 'center', color: orderItem.id !== splitItemId ? '' : 'lightBlue' }}>{orderItem.id !== splitItemId ? orderItem.quantity : 0}</td>}
                            {<td style={{ textAlign: 'end', color: orderItem.id !== splitItemId ? '' : 'lightBlue' }}>{(orderItem.id !== splitItemId ? orderItem.totalPrice : 0).toFixed(2)} $</td>}
                          </tr>
                        )
                      })
                      :
                      <tr key={orderNumber}>
                        <td style={{ textAlign: 'center' }}>{orderNumber}</td>
                        <td>{firstName ? firstName + ' ' + lastName : '-'}</td>
                        <td colSpan="3">-</td>
                      </tr>
                  }
                  {
                    splittedItem && splittedItem.length ?
                      splittedItem.filter(split => split.orderNumber === orderNumber).map((item) => {
                        foodTotal += item.totalPrice
                        if (discount) {
                          discountAmount = discount
                          if (discountType === '%') {
                            discountAmount = (foodTotal * discount) / 100
                          }
                        }
                        if (discountAmount < foodTotal) {
                          subTotal = foodTotal - discountAmount
                          tax = (subTotal * taxPercentage) / 100
                        } else {
                          subTotal = 0
                          tax = 0
                        }
                        return (
                          <tr key={item.id}>
                            <td colSpan="2" />
                            <td style={{ width: '20vw', color: 'blue' }}>{item.name}</td>
                            <td style={{ textAlign: 'center', color: 'blue' }}>{item.quantity}</td>
                            <td style={{ textAlign: 'end', color: 'blue' }}>{Number(item.totalPrice).toFixed(2)} $</td>
                          </tr>
                        )
                      })
                      : null
                  }
                  {discountAmount ? <tr className="NoBorder">
                    <td colSpan="2" />
                    <td colSpan="2">Discount <span style={{ opacity: 0.5 }}>({discount}{discountType})</span></td>
                    <td style={{ textAlign: 'end', color: 'red' }}>- {discountAmount.toFixed(2)} $</td>
                  </tr> : null}
                  <tr className="NoBorder">
                    <td colSpan="2" />
                    <td colSpan="2">Tax <span style={{ opacity: 0.5 }}>({taxPercentage}%)</span></td>
                    <td style={{ textAlign: 'end' }}>{tax.toFixed(2)} $</td>
                  </tr>
                  {tip ? <tr className="NoBorder">
                    <td colSpan="2" />
                    <td colSpan="2">Tip</td>
                    <td style={{ textAlign: 'end' }}>{tip.toFixed(2)} $</td>
                  </tr> : null}
                  <tr>
                    <td colSpan="2" />
                    <td colSpan="2">Check Total</td>
                    <td style={{ textAlign: 'end' }}>{(subTotal + tax + tip).toFixed(2)} $</td>
                  </tr>
                  <tr><td colSpan="5" style={{ backgroundColor: 'white', margin: '10px 0px' }} /></tr>
                </>
              )
            }) :
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>
                {fetchingTableOrders ?
                  <p><i className={`fa fa-refresh ${fetchingTableOrders ? 'fa-pulse' : ''}`} style={{ padding: '0px 5px' }} />Fetching Table Check(s) . . .</p>
                  : 'No Data Found!'}
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default OrdersList
