import {
  GET_ALL_RESTAURANTS,
  GET_ALL_RESTAURANTS_SUCCESS,
  GET_ALL_RESTAURANTS_FAILURE,
  ADD_RESTAURANT,
  ADD_RESTAURANT_SUCCESS,
  ADD_RESTAURANT_FAILURE
} from '../../constants'

export default (state = {
  fetchingRestaurants: false,
  addingUpdatingRestaurant: false,
  restaurants: null
}, { type, payload }) => {
  switch (type) {
    case GET_ALL_RESTAURANTS:
      return { ...state, fetchingRestaurants: true }
    case GET_ALL_RESTAURANTS_SUCCESS:
      return { ...state, fetchingRestaurants: false, restaurants: payload.restaurants }
    case GET_ALL_RESTAURANTS_FAILURE:
      return { ...state, fetchingRestaurants: false }
    case ADD_RESTAURANT:
      return { ...state, addingUpdatingRestaurant: true }
    case ADD_RESTAURANT_SUCCESS:
      return { ...state, addingUpdatingRestaurant: false }
    case ADD_RESTAURANT_FAILURE:
      return { ...state, addingUpdatingRestaurant: false }
    default:
      return state
  }
}
