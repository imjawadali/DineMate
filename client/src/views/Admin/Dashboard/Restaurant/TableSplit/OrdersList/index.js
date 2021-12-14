import React from 'react'

function OrdersList(props) {

  const { fetchingTableOrders, tableOrders, splittedItem, splitOrderNumber } = props

  const getRedemptionAmount = (pointsToRedeem) => {
      return (pointsToRedeem * 2) / 100
  }

  const getTotalAmount = (subTotal, taxAmount, tipAmount, redemptionAmount) => {
      const total = (subTotal + taxAmount + tipAmount) - redemptionAmount
      return total > 0 ? total : 0
  }

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
              var taxAmount = 0
              const { orderNumber, taxPercentage, discountType, discount, tip, pointsToRedeem, firstName, lastName, items } = tableOrder
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
                        if (index === orderItems.length - 1) {
                          if (discount) {
                            discountAmount = discount
                            if (discountType === '%') {
                              discountAmount = (foodTotal * discount) / 100
                            }
                          }
                          if (discountAmount < foodTotal) {
                            subTotal = foodTotal - discountAmount
                            taxAmount = (subTotal * taxPercentage) / 100
                          } else {
                            subTotal = 0
                            taxAmount = 0
                          }
                        }
                        return (
                          <tr key={orderItem.id} className={index === orderItems.length - 1 ? '' : 'NoBorder'}>
                            <td style={{ textAlign: 'center' }}>{!index ? orderNumber : ''}</td>
                            <td>{!index ? firstName ? firstName + ' ' + lastName : '-' : ''}</td>
                            <td style={{ width: '20vw', color: 'lightBlue' }}>{orderItem.name}</td>
                            {<td style={{ textAlign: 'center', color: 'lightBlue' }}>{0}</td>}
                            {<td style={{ textAlign: 'end', color: 'lightBlue' }}>${(0).toFixed(2)}</td>}
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
                          taxAmount = (subTotal * taxPercentage) / 100
                        } else {
                          subTotal = 0
                          taxAmount = 0
                        }
                        return (
                          <tr key={item.id}>
                            <td colSpan="2" />
                            <td style={{ width: '20vw', color: 'blue' }}>{item.name}</td>
                            <td style={{ textAlign: 'center', color: 'blue' }}>{item.quantity}</td>
                            <td style={{ textAlign: 'end', color: 'blue' }}>${Number(item.totalPrice).toFixed(2)}</td>
                          </tr>
                        )
                      })
                      : null
                  }
                  {discountAmount ? <tr className="NoBorder">
                    <td colSpan="2" />
                    <td colSpan="2">Discount <span style={{ opacity: 0.5 }}>({discount}{discountType})</span></td>
                    <td style={{ textAlign: 'end', color: 'red' }}>- ${discountAmount.toFixed(2)}</td>
                  </tr> : null}
                  <tr className="NoBorder">
                    <td colSpan="2" />
                    <td colSpan="2">Tax <span style={{ opacity: 0.5 }}>({taxPercentage}%)</span></td>
                    <td style={{ textAlign: 'end' }}>${taxAmount.toFixed(2)}</td>
                  </tr>
                  {tip ? <tr className="NoBorder">
                    <td colSpan="2" />
                    <td colSpan="2">Tip</td>
                    <td style={{ textAlign: 'end' }}>${tip.toFixed(2)}</td>
                  </tr> : null}
                  {getRedemptionAmount(pointsToRedeem) ? <tr className="NoBorder">
                    <td colSpan="2" />
                    <td colSpan="2">Redemption <span style={{ opacity: 0.5 }}>({pointsToRedeem} Points)</span></td>
                    <td style={{ textAlign: 'end', color: 'red' }}>- ${getRedemptionAmount(pointsToRedeem).toFixed(2)}</td>
                  </tr> : null}
                  <tr>
                    <td colSpan="2" />
                    <td colSpan="2">Check Total</td>
                    <td style={{ textAlign: 'end' }}>${(getTotalAmount(subTotal, taxAmount, tip, getRedemptionAmount(pointsToRedeem))).toFixed(2)}</td>
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
