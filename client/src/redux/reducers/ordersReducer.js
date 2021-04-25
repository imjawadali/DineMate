import {
  GET_TABLE_ORDERS, GET_TABLE_ORDERS_SUCCESS, GET_TABLE_ORDERS_FAILURE, CLEAR_TABLE_ORDERS,
  GET_ORDER_ITEM_DETAILS, GET_ORDER_ITEM_DETAILS_SUCCESS, GET_ORDER_ITEM_DETAILS_FAILURE, CLEAR_ORDER_ITEM_DETAILS,
  GET_ORDERS, GET_ORDERS_SUCCESS, GET_ORDERS_FAILURE, CLOSE_ORDER, CLOSE_ORDER_SUCCESS, CLOSE_ORDER_FAILURE
} from '../../constants'
  
export default (state = { 
  fetchingTableOrders: false, fetchingOrderItemDetails: false, fetchingOrder: false,
  tableOrders: null, orderItemDetails: null, closingId: null, order: null
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
    case CLOSE_ORDER:
      return { ...state, closingId: payload.orderNumber }
    case CLOSE_ORDER_SUCCESS:
      return { ...state, closingId: null }
    case CLOSE_ORDER_FAILURE:
      return { ...state, closingId: null }
    case GET_ORDERS:
      return { ...state, fetchingOrder: true }
    case GET_ORDERS_SUCCESS:
      return { ...state, fetchingOrder: false, order: payload }
    case GET_ORDERS_FAILURE:
      return { ...state, fetchingOrder: false, order: null }
    default:
      return state
  }
}