import { 
  GET_ORDER_DETAIL,
  GET_ORDER_DETAIL_SUCCESS,
  GET_ORDER_DETAIL_FAILURE,
} from '../../constants'

export default (state = { fetchingOrderDetail: false, orderDetails: null }, { type, payload }) => {
  switch (type) {
    case GET_ORDER_DETAIL:
      return { ...state, fetchingOrderDetail: true }
    case GET_ORDER_DETAIL_SUCCESS:
      console.log(payload,'payload')
      return { ...state, fetchingOrderDetail: false, orderDetails: payload.orderDetails }
    case GET_ORDER_DETAIL_FAILURE:
      return { ...state, fetchingOrderDetail: false }
    default:
      return state
  }
}
