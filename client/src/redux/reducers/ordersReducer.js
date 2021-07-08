import {
  GET_TABLE_ORDERS, GET_TABLE_ORDERS_SUCCESS, GET_TABLE_ORDERS_FAILURE, CLEAR_TABLE_ORDERS,
  GET_ORDER_ITEM_DETAILS, GET_ORDER_ITEM_DETAILS_SUCCESS, GET_ORDER_ITEM_DETAILS_FAILURE, CLEAR_ORDER_ITEM_DETAILS,
  GET_ORDERS, GET_ORDERS_SUCCESS, GET_ORDERS_FAILURE,
  GET_ORDER_DETAILS, GET_ORDER_DETAILS_SUCCESS, GET_ORDER_DETAILS_FAILURE, CLEAR_ORDER_DETAILS,
  CLOSE_ORDER, CLOSE_ORDER_SUCCESS, CLOSE_ORDER_FAILURE
} from '../../constants'
  
export default (state = { 
  fetchingTableOrders: false, fetchingOrderItemDetails: false, fetchingOrders: false, fetchingOrderDetails: false,
  tableOrders: null, orderItemDetails: null, closingId: null, orders: null, orderDetails: null
}, { type, payload }) => {
  switch (type) {
    case GET_TABLE_ORDERS:
      return { ...state, fetchingTableOrders: true}
    case GET_TABLE_ORDERS_SUCCESS:
      return { ...state, fetchingTableOrders: false, tableOrders: payload }
    case GET_TABLE_ORDERS_FAILURE:
      return { ...state, fetchingTableOrders: false }
    case CLEAR_TABLE_ORDERS:
      return { ...state, tableOrders: null }
    case GET_ORDER_ITEM_DETAILS:
      return { ...state, fetchingOrderItemDetails: true}
    case GET_ORDER_ITEM_DETAILS_SUCCESS:
      return { ...state, fetchingOrderItemDetails: false, orderItemDetails: payload }
    case GET_ORDER_ITEM_DETAILS_FAILURE:
      return { ...state, fetchingOrderItemDetails: false }
    case CLEAR_ORDER_ITEM_DETAILS:
      return { ...state, orderItemDetails: null }
    case GET_ORDERS:
      return { ...state, fetchingOrders: true, orders: null }
    case GET_ORDERS_SUCCESS:
      return { ...state, fetchingOrders: false, orders: payload }
    case GET_ORDERS_FAILURE:
      return { ...state, fetchingOrders: false }
    case GET_ORDER_DETAILS:
      return { ...state, fetchingOrderDetails: true, orderDetails: null }
    case GET_ORDER_DETAILS_SUCCESS:
      return { ...state, fetchingOrderDetails: false, orderDetails: payload }
    case GET_ORDER_DETAILS_FAILURE:
      return { ...state, fetchingOrderDetails: false }
    case CLEAR_ORDER_DETAILS:
      return { ...state, orderDetails: null }
    case CLOSE_ORDER:
      return { ...state, closingId: payload.orderNumber }
    case CLOSE_ORDER_SUCCESS:
      return { ...state, closingId: null }
    case CLOSE_ORDER_FAILURE:
      return { ...state, closingId: null }
    default:
      return state
  }
}