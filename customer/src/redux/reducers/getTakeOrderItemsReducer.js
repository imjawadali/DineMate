import {
  GET_TAKE_ORDER_ITEMS_FAILURE,
  GET_TAKE_ORDER_ITEMS,
  GET_TAKE_ORDER_ITEMS_SUCCESS,
  ORDER_CHECK_DONE,
} from '../../constants'

export default (state = { fetchingTakeOrderItems: false, takeOrderItems: null, orderNumber: null }, { type, payload }) => {
  switch (type) {
    case GET_TAKE_ORDER_ITEMS:
      return { ...state, fetchingTakeOrderItems: true, orderNumber: payload.orderNumber }
    case GET_TAKE_ORDER_ITEMS_SUCCESS:
      return { ...state, fetchingTakeOrderItems: false, takeOrderItems: payload.OrderItems }
    case ORDER_CHECK_DONE:
      return { ...state, fetchingTakeOrderItems: false, takeOrderItems: null }
    case GET_TAKE_ORDER_ITEMS_FAILURE:
      return { ...state, fetchingTakeOrderItems: false }
    default:
      return state
  }
}
