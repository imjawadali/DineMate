import {
  INITIALIZE_ORDER,
  SET_ORDER,
  INITIALIZE_ORDER_FAILURE,
  ORDER_CHECK_DONE,
  SET_ORDER_ITEM,
  SET_ORDER_ITEM_FAILED,
  SUBMIT_ORDER_ITEM,
  SUBMIT_ORDER_ITEM_FAILED,
  SET_ORDER_ITEM_SUCCESS,
  TAKIE_AWAY_ORDER,
  TAKIE_AWAY_ORDER_FAILED,
  SET_TAKE_ORDER_ITEM_SUCCESS,
  GET_STATUS_FAILURE
} from '../../constants'

export default (state = {
  initializingOrder: false, checkingOrder: true, orderDetails: null, settingOrder: false, setOrder: null, cartMenu: null,
  submitOrder: null, cartTakeItem: null, submitDetail: null
}, { type, payload }) => {
  switch (type) {
    case INITIALIZE_ORDER:
      return { ...state, initializingOrder: true }
    case SET_ORDER:
      return { ...state, initializingOrder: false, checkingOrder: false, orderDetails: payload.orderDetails }
    case INITIALIZE_ORDER_FAILURE:
      return { ...state, initializingOrder: false }
    case ORDER_CHECK_DONE:
      return { ...state, checkingOrder: false, orderDetails: null, cartMenu: null, cartTakeItem: null }
    case GET_STATUS_FAILURE:
      return { ...state, checkingOrder: false }
    case SET_ORDER_ITEM:
      return { ...state, initializingOrder: false, checkingOrder: false, setOrder: payload.orderDetails, }
    case SET_ORDER_ITEM_FAILED:
      return { ...state, settingOrder: false }
    case SET_ORDER_ITEM_SUCCESS:
      return { ...state, settingOrder: false, cartMenu: payload.cartMenu }
    case SET_TAKE_ORDER_ITEM_SUCCESS:
      return { ...state, settingOrder: false, cartTakeItem: payload }
    case SUBMIT_ORDER_ITEM:
      return { ...state, initializingOrder: false, checkingOrder: false, submitOrder: payload.orderDetails, }
    case SUBMIT_ORDER_ITEM_FAILED:
      return { ...state, settingOrder: false }
    case TAKIE_AWAY_ORDER:
      return { ...state, initializingOrder: false, checkingOrder: false, submitOrder: payload.orderDetails, submitDetail: payload }
    case TAKIE_AWAY_ORDER_FAILED:
      return { ...state, settingOrder: false }
    default:
      return state
  }
}
