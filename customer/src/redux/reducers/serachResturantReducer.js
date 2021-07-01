import { 
  SEARCH_RESTURANT,
  SEARCH_RESTURANT_SUCCESS,
  SEARCH_RESTURANT_FAILURE,
} from '../../constants'

export default (state = { fetchingRestaurants: false, restaurants: null }, { type, payload }) => {
  switch (type) {
    case SEARCH_RESTURANT:
      return { ...state, fetchingRestaurants: true }
    case SEARCH_RESTURANT_SUCCESS:
      return { ...state, fetchingRestaurants: false, restaurants: payload.restaurants }
    case SEARCH_RESTURANT_FAILURE:
      return { ...state, fetchingRestaurants: false }
    default:
      return state
  }
}
