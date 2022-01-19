import React from 'react'

function List(props) {
  
  const { ordersReportsByInterval, fetchingOrdersReportsByInterval } = props

  return (
    <div className="TableDataContainer">
      <table>
        <thead>
          <tr>
            <th>Interval</th>
            <th>Check Number</th>
            <th>Staff</th>
            <th>SubTotal</th>
            <th>Tax Amount</th>
            <th>Discount Amount</th>
            <th>Tip Amount</th>
            <th>Redemption</th>
            <th>Check Total</th>
            <th>First Check Opened At</th>
            <th>First Check Closeed At</th>
            <th>Source</th>
            <th>Status</th>
            <th>Payment Method</th>
          </tr>
        </thead>
        <tbody>
          {ordersReportsByInterval && ordersReportsByInterval.length ?
            ordersReportsByInterval.map((restaurant) => {
              const { interval, checkNumber, staff, subtotal, taxAmount, discountAmount, tipAmount, redemption, checkTotal, firstCheckOpenedAt, firstCheckClosedAt, source, status, paymentMethod } = restaurant
              return (
                <tr key={checkNumber}>
                  <td>{interval}</td>
                  <td>{checkNumber}</td>
                  <td>{staff}</td>
                  <td>{subtotal}</td>
                  <td>{taxAmount}</td>
                  <td>{discountAmount}</td>
                  <td>{tipAmount}</td>
                  <td>{redemption}</td>
                  <td>{checkTotal}</td>
                  <td>{firstCheckOpenedAt}</td>
                  <td>{firstCheckClosedAt}</td>
                  <td>{source}</td>
                  <td>{status}</td>
                  <td>{paymentMethod}</td>
                </tr>
              )
            }) : 
            <tr>
              <td colSpan="14" style={{ textAlign: 'center' }}>{
                fetchingOrdersReportsByInterval ?
                  <p><i className={`fa fa-refresh ${fetchingOrdersReportsByInterval ? 'fa-pulse' : ''}`} style={{ padding: '0px 5px' }} />Fetching / Syncing Report . . .</p>
                : 'No Data Found!'
              }</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default List
