import React from 'react'

function List(props) {
  
  const { restaurantsReports, fetchingRestaurantsReports } = props

  return (
    <div className="TableDataContainer">
      <table>
        <thead>
          <tr>
            <th>Restaurant Name</th>
            <th>Cuisine</th>
            <th>Address</th>
            <th>City</th>
            <th>Country</th>
            <th>Tax ID</th>
            <th>Tax Percentage</th>
            <th>Stripe ID</th>
            <th>QR Codes Assigned</th>
            <th>Custom Message</th>
            <th>Created At</th>
            <th>Created By</th>
            <th>Admins</th>
            <th>Staff</th>
            <th>Kitchen</th>
          </tr>
        </thead>
        <tbody>
          {restaurantsReports && restaurantsReports.length ?
            restaurantsReports.map((restaurant) => {
              const { restaurantName, cuisine, address, city, country, taxId, taxPercentage, stripeId, qRCodesAssigned, customMessage, createdAt, createdBy, admins, kitchen, staff } = restaurant
              return (
                <tr key={restaurantName}>
                  <td>{restaurantName}</td>
                  <td>{cuisine}</td>
                  <td>{address}</td>
                  <td>{city}</td>
                  <td>{country}</td>
                  <td>{taxId}</td>
                  <td>{taxPercentage}</td>
                  <td>{stripeId || "-"}</td>
                  <td>{qRCodesAssigned}</td>
                  <td>{customMessage}</td>
                  <td>{createdAt}</td>
                  <td>{createdBy || "-"}</td>
                  <td>{admins}</td>
                  <td>{kitchen}</td>
                  <td>{staff}</td>
                </tr>
              )
            }) : 
            <tr>
              <td colSpan="15" style={{ textAlign: 'center' }}>{
                fetchingRestaurantsReports ?
                  <p><i className={`fa fa-refresh ${fetchingRestaurantsReports ? 'fa-pulse' : ''}`} style={{ padding: '0px 5px' }} />Fetching / Syncing Report . . .</p>
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
