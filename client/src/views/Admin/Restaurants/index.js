import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { customisedAction } from '../../../redux/actions'
import { GET_ALL_RESTAURANTS, PER_PAGE_COUNTS } from '../../../constants'

import { Pagination, Input } from '../../../components'

import RestaurantsList from './RestaurantsList'

function Restaurants(props) {

  const [restaurantsFetchCalled, setrestaurantsFetchCalled] = useState(false)
  const [filterKey, setfilterKey] = useState('')
  const [currentIndex, setcurrentIndex] = useState(1)

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

  const paginate = (list) => {
    let paginatedList = list ? [ ...list ] : list
    if (currentIndex && list && list.length) {
      paginatedList = paginatedList.slice(((currentIndex * PER_PAGE_COUNTS) - PER_PAGE_COUNTS), (currentIndex * PER_PAGE_COUNTS))
    }
    return paginatedList
  }

  return (
    <div className="Container">
      <h2>Restaurants Management</h2>
      <div className="TabularContentContainer">
        <div className="TableTopContainer">
          <div className="TopLeftContainer">
          </div>
          <div className="TopRightContainer">
            <Input 
              style={{ border: 'none', borderBottom: '1px solid black', background: filterKey ? 'white' : 'transparent' }}
              placeholder="Search Restaurants (by Name, Cuisine, City or Qr counts)"
              value={filterKey}
              onChange={({ target: { value } }) => {
                setfilterKey(value)
                setcurrentIndex(1)
              }}
            />
            <i
              style={{ margin: '0px 10px', color: filterKey ? 'red' : '' }}
              className={`fa fa-${filterKey ? 'times-circle' : fetchingRestaurants ? 'refresh fa-pulse' : 'refresh'} fa-lg`}
              onClick={() => filterKey ? setfilterKey('') : dispatch(customisedAction(GET_ALL_RESTAURANTS))}/>
          </div>
        </div>
        <RestaurantsList history={props.history} fetchingRestaurants={fetchingRestaurants} restaurants={paginate(getFilteredList())} />
        {getFilteredList() && getFilteredList().length && getFilteredList().length > PER_PAGE_COUNTS ? 
          <Pagination
            currentIndex={currentIndex}
            mappingCounts={Array(parseInt(getFilteredList().length / PER_PAGE_COUNTS) + 1).fill('0')}
            totalCounts={getFilteredList().length}
            perPageCounts={PER_PAGE_COUNTS}
            onClick={(index) => setcurrentIndex(index)}
          />
        : null} 
      </div>
    </div>
  )
}

export default Restaurants
