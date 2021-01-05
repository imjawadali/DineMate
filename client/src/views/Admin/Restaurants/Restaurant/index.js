import React from 'react'
import { useDispatch } from 'react-redux'

import { customisedAction } from '../../../../redux/actions'
import { RESTAURANT_CHANGED } from '../../../../constants'

import { Title, SmallTitle, SmallButton } from '../../../../components'
import './styles.css'

function Restaurant(props) {
  
  const { restaurant, history } = props
  const { restaurantId, restaurantName, cuisine, adminName, city, qrCounts } = restaurant
  const dispatch = useDispatch()

  return (
    <div className="RowContainer">
      <div className="RestaurantDataContainer">
        <div className="RestaurantNameContainer">
          <Title text={restaurantName} />
        </div>
        <div className="RestaurantSectionOuterContainer">
          <div className="RestaurantSectionsContainer">
            <div className="RestaurantSections">
              <h4>Slug: </h4>
              <SmallTitle text={restaurantId} />
            </div>
            <div className="RestaurantSections">
              <h4>Cuisine: </h4>
              <SmallTitle text={cuisine} />
            </div>
          </div>
          <div className="RestaurantSectionsContainer">
            <div className="RestaurantSections">
              <h4>Admin: </h4>
              <SmallTitle text={adminName} />
            </div>
            <div className="RestaurantSections">
              <h4>City: </h4>
              <SmallTitle text={city} />
            </div>
          </div>
        </div>
      </div>
      <div className="RestaurantActionsContainer">
        <div className="RestaurantActionContainer">
          <SmallButton
            style={{ width: '100%' }}
            text="Details"
            disabled
          />
        </div>
        <div className="RestaurantActionContainer">
          <SmallButton
            style={{ width: '100%' }}
            text="Generate Qrs"
            onClick={() => {
              dispatch(customisedAction(RESTAURANT_CHANGED))
              history.push({
                pathname: `/admin/generateQrs`, state: { restaurantId, qrCounts }
              })
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Restaurant
