import React from 'react'
import { useDispatch } from 'react-redux'

import { customisedAction } from '../../../../redux/actions'
import { GET_EXISTING_QRS, RESTAURANT_CHANGED, SET_RESTAURANT } from '../../../../constants'

import { SmallButton } from '../../../../components'

function RestaurantsList(props) {
  
  const { restaurants, fetchingRestaurants, history } = props
  const dispatch = useDispatch()

  return (
    <div className="HorizontalScrollContainer">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Cuisine</th>
            <th>City</th>
            <th>QR Codes Assigned</th>
            <th>Payment Received</th>
            <th>Visit</th>
            <th>Manage</th>
          </tr>
        </thead>
        <tbody>
          {restaurants && restaurants.length ?
            restaurants.map((restaurant) => {
              const { restaurantId, restaurantName, cuisine, city, qrCounts } = restaurant
              return (
                <tr key={restaurantId}>
                  <td>{restaurantName}</td>
                  <td>{cuisine}</td>
                  <td>{city}</td>
                  <td>{qrCounts} QR Code(s)</td>
                  <td>$ {0}</td>
                  <td>
                    <SmallButton
                      style={{ width: '100%' }}
                      text="Select"
                      light
                      lightAction={() => {
                        dispatch(customisedAction(SET_RESTAURANT, restaurant))
                        history.push('/client/admin')
                      }}
                      iconLeft={<i className="fa fa-mouse-pointer" />}
                    />
                  </td>
                  <td>
                    <SmallButton
                      style={{ width: '100%' }}
                      text="Manage"
                      iconLeft={<i className="fa fa-info-circle" />}
                      onClick={() => {
                        dispatch(customisedAction(RESTAURANT_CHANGED))
                        dispatch(customisedAction(GET_EXISTING_QRS, { restaurantId }))
                        history.push({
                          pathname: `/client/admin/qrsManagement`, state: { restaurantId, qrCounts }
                        })
                      }}
                    />
                  </td>
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
