import React from 'react'
import { useDispatch } from 'react-redux'

import { customisedAction } from '../../../../redux/actions'
import { GET_EXISTING_QRS, GET_RESTAURANT_TO_EDIT, RESTAURANT_CHANGED, SET_RESTAURANT } from '../../../../constants'

import { TableActionicons } from '../../../../components'

function RestaurantsList(props) {
  
  const { restaurants, fetchingRestaurants, history } = props
  const dispatch = useDispatch()

  return (
    <div className="TableDataContainer">
      <table>
        <thead>
          <tr>
            <th style={{ borderRight: 'none' }}>Manage</th>
            <th style={{ borderLeft: 'none' }}>Name</th>
            <th>Cuisine</th>
            <th>City</th>
            <th>QR Codes Assigned</th>
            <th>Payment Received</th>
          </tr>
        </thead>
        <tbody>
          {restaurants && restaurants.length ?
            restaurants.map((restaurant) => {
              const { restaurantId, restaurantName, cuisine, city, qrCounts } = restaurant
              return (
                <tr key={restaurantId}>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'row'}}>
                      <TableActionicons
                        icon="fa-mouse-pointer"
                        onClick={() => {
                          dispatch(customisedAction(SET_RESTAURANT, restaurant))
                          history.push('/client/admin')
                        }}
                      />
                      <TableActionicons
                        icon="fa-edit"
                        onClick={() => dispatch(customisedAction(GET_RESTAURANT_TO_EDIT, { restaurantId, history }))}
                      />
                      <TableActionicons
                        icon="fa-info-circle"
                        onClick={() => {
                          dispatch(customisedAction(RESTAURANT_CHANGED))
                          dispatch(customisedAction(GET_EXISTING_QRS, { restaurantId }))
                          history.push({
                            pathname: `/client/admin/qrsManagement`, state: { restaurantId, qrCounts }
                          })
                        }}
                      />
                    </div>
                  </td>
                  <td>{restaurantName}</td>
                  <td>{cuisine}</td>
                  <td>{city}</td>
                  <td>{qrCounts} QR Code{qrCounts !== 1  ? 's' : ''}</td>
                  <td style={{ textAlign: 'center' }}>$ {'11.99'}</td>
                </tr>
              )
            }) : 
            <tr>
              <td colSpan="7" style={{ textAlign: 'center' }}>{
                fetchingRestaurants ?
                  <p><i className={`fa fa-refresh ${fetchingRestaurants ? 'fa-pulse' : ''}`} style={{ padding: '0px 5px' }} />Fetching / Syncing Restaurants . . .</p>
                : 'No Data Found!'
              }</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default RestaurantsList
