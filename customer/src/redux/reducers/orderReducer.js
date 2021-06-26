import {
  INITIALIZE_ORDER,
  SET_ORDER,
  INITIALIZE_ORDER_FAILURE,
  ORDER_CHECK_DONE,
  SET_ORDER_ITEM,
  SET_ORDER_ITEM_FAILED,
  SUBMIT_ORDER_ITEM,
  SUBMIT_ORDER_ITEM_FAILED
} from '../../constants'

export default (state = {
  initializingOrder: false, checkingOrder: true, checkingOrderStatus: false, orderDetails: null, settingOrder: false, setOrder: null, cartMenu: null,
  submitOrder: null
}, { type, payload }) => {
  switch (type) {
    case INITIALIZE_ORDER:
      return { ...state, initializingOrder: true }
    case SET_ORDER:
      return { ...state, initializingOrder: false, checkingOrder: false, orderDetails: payload.orderDetails }
    case INITIALIZE_ORDER_FAILURE:
      return { ...state, initializingOrder: false }
    case ORDER_CHECK_DONE:
      return { ...state, checkingOrder: false }
    case SET_ORDER_ITEM:
      console.log(payload)
      return { ...state, initializingOrder: false, checkingOrder: false, setOrder: payload.orderDetails, cartMenu: payload.cartMenu }
    case SET_ORDER_ITEM_FAILED:
      return { ...state, settingOrder: false }
    case SUBMIT_ORDER_ITEM:
      console.log(payload)
      return { ...state, initializingOrder: false, checkingOrder: false, submitOrder: payload.orderDetails, }
    case SUBMIT_ORDER_ITEM_FAILED:
      return { ...state, settingOrder: false }
    default:
      return state
  }
}
