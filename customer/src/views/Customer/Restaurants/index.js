import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'

import ResturantListComponent from '../../../components/ResturantListComponent'
import { Title } from '../../../components/Title'
import { GET_ALL_RESTAURANTS, SEARCH_RESTURANT } from '../../../constants'
import { getItem } from '../../../helpers'
import { customisedAction } from '../../../redux/actions'
import './styles.css'

function Restaurants(props) {

  const [value, setValue] = useState(null)
  const [resturants, setResturants] = useState([])
  const [pageNumber, setpageNumber] = useState(1)

  const latitude = useSelector(({ restaurantsReducer }) => restaurantsReducer.latitude)
  const longitude = useSelector(({ restaurantsReducer }) => restaurantsReducer.longitude)
  const city = useSelector(({ restaurantsReducer }) => restaurantsReducer.city)
  const fetchingRestaurants = useSelector(({ restaurantsReducer }) => restaurantsReducer.fetchingRestaurants)
  const allRestaurants = useSelector(({ restaurantsReducer }) => restaurantsReducer.restaurants)
  const dispatch = useDispatch()

  const [previousCity, setpreviousCity] = useState(city)

  useEffect(() => {
    const OrderDetails = getItem('orderDetails')
    if (OrderDetails && OrderDetails.type.toLowerCase() === 'dine-in') {
      if (window.location.pathname !== `/customer/${OrderDetails.restaurantId}/menu`) {
        props.history.push(`/customer/${OrderDetails.restaurantId}/menu`)
      }
    }
  }, [])

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchText = urlParams.get("value")
    setResturants([])
    setpageNumber(1)
    setValue(searchText)
  }, [window.location.search])

  useEffect(() => {
    if (city) {
      if (previousCity != city)
        setpageNumber(1)
      if (value) {
        dispatch(customisedAction(SEARCH_RESTURANT, { searchBy: value, pageNumber }, { latitude, longitude, city }))
      } else {
        dispatch(customisedAction(GET_ALL_RESTAURANTS, { pageNumber, limit: 3 }, { latitude, longitude, city }))
      }
    }
    setpreviousCity(city)
  }, [city, value, pageNumber])

  useEffect(() => {
    if (pageNumber && pageNumber > 1) {
      const restaurants = [...resturants, ...allRestaurants]
      setResturants(restaurants)
    } else setResturants(allRestaurants)
  }, [allRestaurants])

  return (
    <div>
      <div className="image_holder">
        <img src={require("../../../assets/bgimage.png").default} style={{ width: '100%', marginTop: -60 }} />
      </div>
      <div className="heading-container">
        <Title text="All Restaurants" />
      </div>
      <div className="resturant-list-container">
        {resturants && resturants.length ?
          resturants.map((restaurant, index) => {
            const { restaurantId, imageUrl, restaurantName: name, categories, rating, ratingCounts } = restaurant
            const imagesArray = [require("../../../assets/listingbg.png"), require("../../../assets/bgimage.png")]
            return (
              <div key={index} className="resturant-list-component">
                <ResturantListComponent
                  title={name}
                  cuisines={categories && categories.length ? categories.map((category, index) => {
                    return `${category.name}${index !== (categories.length - 1) ? ' • ' : ''}`
                  }) : null}
                  stars={rating}
                  ratingCounts={ratingCounts}
                  image={imageUrl || imagesArray[index % 2].default}
                  onClick={() => props.history.push(`/customer/${restaurantId}/menu`)}
                />
              </div>)
          })
          : <div className="notFound">
            <p>
              {fetchingRestaurants ? 'Fetching Restaurants . . .' : !city ? 'Trying to get location to fetch restaurants' : 'No result found'}
            </p>
          </div>
        }
      </div>
      {resturants && resturants.length ?
        <div style={{ display: 'flex', justifyContent: 'center', }} className="button-container-resturant">
          <button onClick={() => !fetchingRestaurants
            ? setpageNumber(pageNumber + 1)
            : null
          } className="resturant-button">Show More</button>
        </div>
        : null}
    </div>
  )
}

export default withRouter(Restaurants)
