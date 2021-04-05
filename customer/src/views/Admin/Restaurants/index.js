import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { customisedAction } from '../../../redux/actions'
import { GET_ALL_RESTAURANTS } from '../../../constants'

import { Button, Input } from '../../../components'

import RestaurantsList from './RestaurantsList'

function Restaurants(props) {

  const [restaurantsFetchCalled, setrestaurantsFetchCalled] = useState(false)
  const [filterKey, setfilterKey] = useState('')

  const fetchingRestaurants = useSelector(({ restaurantsReducer }) => restaurantsReducer.fetchingRestaurants)
  const restaurants = useSelector(({ restaurantsReducer }) => restaurantsReducer.restaurants)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!restaurantsFetchCalled && !fetchingRestaurants && !restaurants) {
      setrestaurantsFetchCalled(true)
      dispatch(customisedAction(GET_ALL_RESTAURANTS))
    }
  }, [])

  const getFilteredList = () => {
    let filteredRestaurants = restaurants
    if (filterKey && filterKey.length && restaurants) {
      filteredRestaurants = restaurants.filter(
        (restaurant) => restaurant.restaurantName.toLowerCase().includes(filterKey.toLowerCase())
        || restaurant.restaurantId.toLowerCase().includes(filterKey.toLowerCase())
        || restaurant.cuisine.toLowerCase().includes(filterKey.toLowerCase())
        || restaurant.city.toLowerCase().includes(filterKey.toLowerCase())
        || restaurant.qrCounts == filterKey
      )
    }
    return filteredRestaurants
  }

  return (
    <div className="Container">
      <h2>Restaurants Management</h2>
      <div className="TopOptionsContainer">
        <div className="TopInputContainer">
          <Input 
            placeholder="Search Restaurants (by Name, Cuisine, City or Qr counts)"
            value={filterKey}
            onChange={({ target: { value } }) => setfilterKey(value)}
          />
        </div>
        <div className="TopButtonContainer">
          <Button
            text={filterKey ? "Clear" : fetchingRestaurants ? "Syncing" : "Refresh"}
            light={fetchingRestaurants}
            lightAction={() => null}
            iconLeft={<i className={`fa fa-${filterKey ? 'times-circle' : fetchingRestaurants ? 'refresh fa-pulse' : 'refresh'}`} />}
            onClick={() => filterKey ? setfilterKey('') : dispatch(customisedAction(GET_ALL_RESTAURANTS))} />
        </div>
      </div>
      {fetchingRestaurants && !restaurants ?
        <div className="loadingContainer">
          <p><i className={`fa fa-refresh ${fetchingRestaurants ? 'fa-pulse' : ''}`} style={{ padding: '0px 5px' }} />Fetching / Syncing Restaurants . . .</p>
        </div> : null
      }
      <RestaurantsList history={props.history} restaurants={getFilteredList()} />
    </div>
  )
}

export default Restaurants
