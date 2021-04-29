import { 
  GET_ALL_RESTAURANTS,
  GET_ALL_RESTAURANTS_SUCCESS,
  GET_ALL_RESTAURANTS_FAILURE,
} from '../../constants'

export default (state = { fetchingRestaurants: false, restaurants: null }, { type, payload }) => {
  switch (type) {
    case GET_ALL_RESTAURANTS:
      return { ...state, fetchingRestaurants: true }
    case GET_ALL_RESTAURANTS_SUCCESS:
      return { ...state, fetchingRestaurants: false, restaurants: payload }
    case GET_ALL_RESTAURANTS_FAILURE:
      return { ...state, fetchingRestaurants: false }
    default:
      return state
  }
}
