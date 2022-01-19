import React from 'react'

function List(props) {
  
  const { menuItemsReports, fetchingMenuItemsReports } = props

  return (
    <div className="TableDataContainer">
      <table>
        <thead>
          <tr>
            <th>Kitchen</th>
            <th>Item Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Last Sold On</th>
            <th>Quantity</th>
            <th>Avg Sales</th>
            <th>Preparation Time</th>
          </tr>
        </thead>
        <tbody>
          {menuItemsReports && menuItemsReports.length ?
            menuItemsReports.map((restaurant) => {
              const { kitchen, itemName, price, category, lastSoldOn, quantity, avgSales, preparationTime } = restaurant
              return (
                <tr key={itemName}>
                  <td>{kitchen || "-"}</td>
                  <td>{itemName}</td>
                  <td>{price}</td>
                  <td>{category}</td>
                  <td>{lastSoldOn || "-"}</td>
                  <td>{quantity || "-"}</td>
                  <td>{avgSales}</td>
                  <td>{preparationTime}</td>
                </tr>
              )
            }) : 
            <tr>
              <td colSpan="7" style={{ textAlign: 'center' }}>{
                fetchingMenuItemsReports ?
                  <p><i className={`fa fa-refresh ${fetchingMenuItemsReports ? 'fa-pulse' : ''}`} style={{ padding: '0px 5px' }} />Fetching / Syncing Report . . .</p>
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
