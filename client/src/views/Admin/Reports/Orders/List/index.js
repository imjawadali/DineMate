import React from 'react'

function List(props) {
  
  const { ordersReports, fetchingOrdersReports } = props

  return (
    <div className="TableDataContainer">
      <table>
        <thead>
          <tr>
            <th>Check Number</th>
            <th>Staff</th>
            <th>SubTotal</th>
            <th>Tax Amount</th>
            <th>Discount Amount</th>
            <th>Tip Amount</th>
            <th>Redemption</th>
            <th>Check Total</th>
            <th>Check Open</th>
            <th>Check Close</th>
            <th>Check Duration</th>
            <th>Source</th>
            <th>Status</th>
            <th>Payment Method</th>
            <th>Guest Name</th>
          </tr>
        </thead>
        <tbody>
          {ordersReports && ordersReports.length ?
            ordersReports.map((restaurant) => {
              const { checkNumber, staff, subtotal, taxAmount, discountAmount, tipAmount, redemption, checkTotal, checkOpen, checkClose, checkDuration, source, status, paymentMethod, guestName } = restaurant
              return (
                <tr key={checkNumber}>
                  <td>{checkNumber}</td>
                  <td>{staff}</td>
                  <td>{subtotal}</td>
                  <td>{taxAmount}</td>
                  <td>{discountAmount}</td>
                  <td>{tipAmount}</td>
                  <td>{redemption}</td>
                  <td>{checkTotal}</td>
                  <td>{checkOpen}</td>
                  <td>{checkClose || "-"}</td>
                  <td>{checkDuration}</td>
                  <td>{source}</td>
                  <td>{status}</td>
                  <td>{paymentMethod}</td>
                  <td>{guestName}</td>
                </tr>
              )
            }) : 
            <tr>
              <td colSpan="15" style={{ textAlign: 'center' }}>{
                fetchingOrdersReports ?
                  <p><i className={`fa fa-refresh ${fetchingOrdersReports ? 'fa-pulse' : ''}`} style={{ padding: '0px 5px' }} />Fetching / Syncing Report . . .</p>
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
