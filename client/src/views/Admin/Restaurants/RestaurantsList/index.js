import React from 'react'
import { useDispatch } from 'react-redux'

import { customisedAction } from '../../../../redux/actions'
import { RESTAURANT_CHANGED, SET_RESTAURANT } from '../../../../constants'

import { SmallButton } from '../../../../components'

function RestaurantsList(props) {
  
  const { restaurants, history } = props
  const dispatch = useDispatch()

  return (
    <div className="HorizontalScrollContainer">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>QR Codes Assigned</th>
            <th>Payment Received</th>
            <th>Visit</th>
            <th>Manage</th>
          </tr>
        </thead>
        <tbody>
          {restaurants && restaurants.length ?
            restaurants.map((restaurant) => {
              const { restaurantId, restaurantName, qrCounts } = restaurant
              return (
                <tr key={restaurantId}>
                  <td>{restaurantName}</td>
                  <td>{qrCounts} QR Code(s)</td>
                  <td>$ {0}</td>
                  <td>
                    <SmallButton
                      style={{ width: '100%' }}
                      text="Select"
                      light
                      lightAction={() => {
                        dispatch(customisedAction(SET_RESTAURANT, restaurant))
                        history.push('/admin')
                      }}
                      iconLeft={<i className="fa fa-mouse-pointer" />}
                    />
                  </td>
                  <td>
                    <SmallButton
                      style={{ width: '100%' }}
                      text="Details"
                      iconLeft={<i className="fa fa-info-circle" />}
                      onClick={() => {
                        dispatch(customisedAction(RESTAURANT_CHANGED))
                        history.push({
                          pathname: `/admin/qrsManagement`, state: { restaurantId, qrCounts }
                        })
                      }}
                    />
                  </td>
                </tr>
              )
            }) : 
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>No Data Found!</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default RestaurantsList
