import { 
  CLOSE_ORDER,
  CLOSE_ORDER_SUCCESS,
  CLOSE_ORDER_FAILURE,
} from '../../constants'

export default (state = { fetchingOrder: false, closeOrder: null }, { type, payload }) => {
  switch (type) {
    case CLOSE_ORDER:
      return { ...state, fetchingOrder: true }
    case CLOSE_ORDER_SUCCESS:
      return { ...state, fetchingOrder: false, closeOrder: payload }
    case CLOSE_ORDER_FAILURE:
      return { ...state, fetchingOrder: false }
    default:
      return state
  }
}
