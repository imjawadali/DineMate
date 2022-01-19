import {
  GET_ALL_RESTAURANTS,
  GET_ALL_RESTAURANTS_SUCCESS,
  GET_ALL_RESTAURANTS_FAILURE,
  SEARCH_RESTURANT,
  SEARCH_RESTURANT_SUCCESS,
  SEARCH_RESTURANT_FAILURE,
  SET_LOCATION,
  LOCATION_REQUIRED,
  GET_CITIES_SUCCESS,
  SET_CITY
} from '../../constants'

export default (state = { locationRequired: false, latitude: null, longitude: null, city: null, cities: [], fetchingRestaurants: false, restaurants: null }, { type, payload }) => {
  switch (type) {

    case SET_LOCATION:
      return { ...state, locationRequired: false, latitude: payload.latitude, longitude: payload.longitude, city: payload.city }
    case LOCATION_REQUIRED:
      return { ...state, locationRequired: true }

    case GET_CITIES_SUCCESS:
      return { ...state, cities: payload }
    case SET_CITY:
      return { ...state, city: payload }

    case GET_ALL_RESTAURANTS:
      return { ...state, fetchingRestaurants: true }
    case GET_ALL_RESTAURANTS_SUCCESS:
      return { ...state, fetchingRestaurants: false, restaurants: payload }
    case GET_ALL_RESTAURANTS_FAILURE:
      return { ...state, fetchingRestaurants: false }

    case SEARCH_RESTURANT:
      return { ...state, fetchingRestaurants: true }
    case SEARCH_RESTURANT_SUCCESS:
      return { ...state, fetchingRestaurants: false, restaurants: payload }
    case SEARCH_RESTURANT_FAILURE:
      return { ...state, fetchingRestaurants: false }
    default:
      return state
  }
}
