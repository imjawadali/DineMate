import {
  GET_ORDER_ITEMS_FAILURE,
  GET_ORDER_ITEMS,
  GET_ORDER_ITEMS_SUCCESS,
  ORDER_CHECK_DONE,
} from '../../constants'

export default (state = { fetchingOrderItems: false, OrderItems: null }, { type, payload }) => {
  switch (type) {
    case GET_ORDER_ITEMS:
      return { ...state, fetchingOrderItems: true }
    case GET_ORDER_ITEMS_SUCCESS:
      return { ...state, fetchingOrderItems: false, OrderItems: payload.OrderItems }
    case ORDER_CHECK_DONE:
      return { ...state, fetchingOrderItems: false, OrderItems: null }
    case GET_ORDER_ITEMS_FAILURE:
      return { ...state, fetchingOrderItems: false }
    default:
      return state
  }
}
