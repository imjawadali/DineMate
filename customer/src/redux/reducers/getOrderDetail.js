import {
  GET_ORDER_DETAIL,
  GET_ORDER_DETAIL_SUCCESS,
  ORDER_CHECK_DONE,
  GET_TAKE_ORDER_ITEMS,
} from '../../constants'

export default (state = { fetchingOrderDetail: false, orderDetails: null }, { type, payload }) => {
  switch (type) {
    case GET_ORDER_DETAIL:
      return { ...state, fetchingOrderDetail: true }
    case GET_ORDER_DETAIL_SUCCESS:
      return { ...state, fetchingOrderDetail: false, orderDetails: payload.orderDetails }
    case GET_TAKE_ORDER_ITEMS:
      if (payload.orderDetails)
        return { ...state, fetchingOrderDetail: false, orderDetails: payload.orderDetails }
      else
        return state
    case ORDER_CHECK_DONE:
      return { ...state, fetchingOrderDetail: false, orderDetails: null }
    default:
      return state
  }
}
