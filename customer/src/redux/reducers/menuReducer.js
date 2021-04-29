import { 
  GET_MENU,
  GET_MENU_SUCCESS,
  GET_MENU_FAILURE,
  GET_RESTAURANT_DETAILS,
  GET_RESTAURANT_DETAILS_SUCCESS,
  GET_RESTAURANT_DETAILS_FAILURE
} from '../../constants'

export default (state = { fetchingMenu: false, fetchingRestaurantDetails: false, menu: null, restaurant: null }, { type, payload }) => {
  switch (type) {
    case GET_MENU:
      return { ...state, fetchingMenu: true, menu: null }
    case GET_MENU_SUCCESS:
      return { ...state, fetchingMenu: false, menu: payload }
    case GET_MENU_FAILURE:
      return { ...state, fetchingMenu: false }
    case GET_RESTAURANT_DETAILS:
      return { ...state, fetchingRestaurantDetails: true, restaurant: null }
    case GET_RESTAURANT_DETAILS_SUCCESS:
      return { ...state, fetchingRestaurantDetails: false, restaurant: payload }
    case GET_RESTAURANT_DETAILS_FAILURE:
      return { ...state, fetchingRestaurantDetails: false }
    default:
      return state
  }
}
