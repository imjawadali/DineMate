import React from 'react'

import Restaurant from '../Restaurant'

function RestaurantsList(props) {
  
  const { restaurants, history } = props

  return (
    restaurants && restaurants.length ? 
    <div className="Container">
      {
        restaurants.map((restaurant) => {
          return (
            <Restaurant history={history} key={restaurant.restaurantId} restaurant={restaurant} />
          )
        })
      }
    </div> : 
    <div className="loadingContainer">
      <p>No Data Found!</p>
    </div>
  )
}

export default RestaurantsList
