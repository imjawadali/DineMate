import React from 'react'
import { useDispatch } from 'react-redux'

import { customisedAction } from '../../../../redux/actions'
import { RESTAURANT_CHANGED } from '../../../../constants'

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
            <th>Edit</th>
            <th>View</th>
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
                      text="Edit"
                      disabled
                      disabledAction={() => null}
                    />
                  </td>
                  <td>
                    <SmallButton
                      style={{ width: '100%' }}
                      text="Details"
                      onClick={() => {
                        dispatch(customisedAction(RESTAURANT_CHANGED))
                        history.push({
                          pathname: `/admin/generateQrs`, state: { restaurantId, qrCounts }
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
