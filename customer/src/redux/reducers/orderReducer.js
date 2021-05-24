import {
  INITIALIZE_ORDER,
  SET_ORDER,
  INITIALIZE_ORDER_FAILURE,
  ORDER_CHECK_DONE
} from '../../constants'

export default (state = { initializingOrder: false, checkingOrder: true, checkingOrderStatus: false, orderDetails: null }, { type, payload }) => {
  switch (type) {
    case INITIALIZE_ORDER:
      return { ...state, initializingOrder: true }
    case SET_ORDER:
      return { ...state, initializingOrder: false, checkingOrder: false, orderDetails: payload.orderDetails }
    case INITIALIZE_ORDER_FAILURE:
      return { ...state, initializingOrder: false }
    case ORDER_CHECK_DONE:
      return { ...state, checkingOrder: false }
    default:
      return state
  }
}
