import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { customisedAction } from '../../../redux/actions'
import { GET_ALL_RESTAURANTS } from '../../../constants'

import { Button, Input } from '../../../components'

import RestaurantsList from './RestaurantsList'

function Restaurants(props) {

  const [restaurantsFetchCalled, setrestaurantsFetchCalled] = useState(false)
  const [filterKey, setfilterKey] = useState([])

  const fetchingRestaurants = useSelector(({ restaurantsReducer }) => restaurantsReducer.fetchingRestaurants)
  const restaurants = useSelector(({ restaurantsReducer }) => restaurantsReducer.restaurants)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!restaurantsFetchCalled && !fetchingRestaurants && !restaurants) {
      setrestaurantsFetchCalled(true)
      dispatch(customisedAction(GET_ALL_RESTAURANTS))
    }
  }, [])

  const getFilterRestaurants = () => {
    let filteredRestaurants = restaurants
    if (filterKey && filterKey.length && restaurants) {
      filteredRestaurants = restaurants.filter(
        (restaurant) => restaurant.restaurantName.toLowerCase().includes(filterKey.toLowerCase())
        || restaurant.restaurantId.toLowerCase().includes(filterKey.toLowerCase())
        || restaurant.cuisine.toLowerCase().includes(filterKey.toLowerCase())
        || restaurant.adminName.toLowerCase().includes(filterKey.toLowerCase())
        || restaurant.city.toLowerCase().includes(filterKey.toLowerCase())
        || restaurant.qrCounts == filterKey
      )
    }
    return filteredRestaurants
  }

  return (
    <div className="Container">
      <h3>Restaurants Management</h3>
      <div className="TopOptionsContainer">
        <div className="TopInputContainer">
          <Input 
            placeholder="Search Restaurants"
            value={filterKey}
            onChange={({ target: { value } }) => setfilterKey(value)}
          />
        </div>
        <div className="TopButtonContainer">
          <Button
            text="+ Add New"
            onClick={() => props.history.push('/admin/addRestaurants')}
          />
        </div>
      </div>
      {fetchingRestaurants ?
        <div className="loadingContainer">
          <p>Fetching Restaurants . . .</p>
        </div> :
        <RestaurantsList history={props.history} restaurants={getFilterRestaurants()} />
      }
    </div>
  )
}

export default Restaurants
