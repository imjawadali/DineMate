import {
  GET_ALL_RESTAURANTS,
  GET_ALL_RESTAURANTS_SUCCESS,
  GET_ORDER_ITEMS_FAILURE,
  GET_ORDER_ITEMS,
  GET_ORDER_ITEMS_SUCCESS,
} from '../../constants'

export default (state = { fetchingOrderItems: false, OrderItems: null }, { type, payload }) => {
  switch (type) {
    case GET_ORDER_ITEMS:
      return { ...state, fetchingOrderItems: true }
    case GET_ORDER_ITEMS_SUCCESS:
      return { ...state, fetchingOrderItems: false, OrderItems: payload }
    case GET_ORDER_ITEMS_FAILURE:
      return { ...state, fetchingOrderItems: false }
    default:
      return state
  }
}
