import { 
  GET_ALL_ORDERS,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_FAILURE,
} from '../../constants'

export default (state = { fetchingOrders: false, orders: null }, { type, payload }) => {
  switch (type) {
    case GET_ALL_ORDERS:
      return { ...state, fetchingOrders: true }
    case GET_ALL_ORDERS_SUCCESS:
      return { ...state, fetchingOrders: false, orders: payload }
    case GET_ALL_ORDERS_FAILURE:
      return { ...state, fetchingOrders: false }
    default:
      return state
  }
}
