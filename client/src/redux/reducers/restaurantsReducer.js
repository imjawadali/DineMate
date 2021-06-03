import {
  GET_ALL_RESTAURANTS,
  GET_ALL_RESTAURANTS_SUCCESS,
  GET_ALL_RESTAURANTS_FAILURE,
  ADD_RESTAURANT,
  ADD_RESTAURANT_SUCCESS,
  ADD_RESTAURANT_FAILURE,
  GET_RESTAURANT_TO_EDIT,
  GET_RESTAURANT_TO_EDIT_SUCCESS,
  UPDATE_RESTAURANT,
  UPDATE_RESTAURANT_SUCCESS,
  UPDATE_RESTAURANT_FAILURE
} from '../../constants'

export default (state = {
  fetchingRestaurants: false,
  addingUpdatingRestaurant: false,
  restaurants: null,
  restaurantToEdit: null
}, { type, payload }) => {
  switch (type) {
    case GET_ALL_RESTAURANTS:
      return { ...state, fetchingRestaurants: true, restaurantToEdit: null }
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
    case UPDATE_RESTAURANT:
      return { ...state, addingUpdatingRestaurant: true }
    case UPDATE_RESTAURANT_SUCCESS:
      return { ...state, addingUpdatingRestaurant: false }
    case UPDATE_RESTAURANT_FAILURE:
      return { ...state, addingUpdatingRestaurant: false }
    case GET_RESTAURANT_TO_EDIT:
      return { ...state, restaurantToEdit: null }
    case GET_RESTAURANT_TO_EDIT_SUCCESS:
      return { ...state, restaurantToEdit: payload }
    default:
      return state
  }
}
