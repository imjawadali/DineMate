import {
  GET_TABLE_ORDERS, GET_TABLE_ORDERS_SUCCESS, GET_TABLE_ORDERS_FAILURE, CLEAR_TABLE_ORDERS,
  GET_ORDER_ITEM_DETAILS, GET_ORDER_ITEM_DETAILS_SUCCESS, GET_ORDER_ITEM_DETAILS_FAILURE, CLEAR_ORDER_ITEM_DETAILS,
  GET_ORDERS, GET_ORDERS_SUCCESS, GET_ORDERS_FAILURE,
  GET_ORDER_DETAILS, GET_ORDER_DETAILS_SUCCESS, GET_ORDER_DETAILS_FAILURE, CLEAR_ORDER_DETAILS,
  CLOSE_ORDER, CLOSE_ORDER_FAILURE,
  SUBMIT_NEW_ORDER, SUBMIT_NEW_ORDER_SUCCESS, SUBMIT_NEW_ORDER_FAILURE,
  ADD_ITEMS_TO_ORDER, ADD_ITEMS_TO_ORDER_SUCCESS, ADD_ITEMS_TO_ORDER_FAILURE,
  RESET_RESTAURANT,
  DELETE_ITEM,
  DELETE_ITEM_FAILURE,
  DELETE_ORDER,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAILURE,
  DELETE_ITEM_SUCCESS_NO_MORE_DETAILS
} from '../../constants'
  
export default (state = { 
  fetchingTableOrders: false, fetchingOrderItemDetails: false, fetchingOrders: false, fetchingOrderDetails: false,
  addingUpdatingOrder: false, deletingItemId: null, deletingOrder: false,
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
      return { ...state, fetchingOrders: true }
    case GET_ORDERS_SUCCESS:
      return { ...state, fetchingOrders: false, orders: payload }
    case GET_ORDERS_FAILURE:
      return { ...state, fetchingOrders: false }
    
    case GET_ORDER_DETAILS:
      return { ...state, fetchingOrderDetails: true }
    case GET_ORDER_DETAILS_SUCCESS:
      return { ...state, fetchingOrderDetails: false, orderDetails: payload, deletingItemId: null }
    case GET_ORDER_DETAILS_FAILURE:
      return { ...state, fetchingOrderDetails: false }
    
    case CLEAR_ORDER_DETAILS:
      return { ...state, orderDetails: null }
    
    case SUBMIT_NEW_ORDER:
      return { ...state, addingUpdatingOrder: true }
    case SUBMIT_NEW_ORDER_SUCCESS:
      return { ...state, addingUpdatingOrder: false }
    case SUBMIT_NEW_ORDER_FAILURE:
      return { ...state, addingUpdatingOrder: false }
    
    case ADD_ITEMS_TO_ORDER:
      return { ...state, addingUpdatingOrder: true }
    case ADD_ITEMS_TO_ORDER_SUCCESS:
      return { ...state, addingUpdatingOrder: false }
    case ADD_ITEMS_TO_ORDER_FAILURE:
      return { ...state, addingUpdatingOrder: false }
    
    case DELETE_ITEM:
      return { ...state, deletingItemId: payload.id }
    case DELETE_ITEM_SUCCESS_NO_MORE_DETAILS:
      return { ...state, deletingItemId: null }
    case DELETE_ITEM_FAILURE:
      return { ...state, deletingItemId: null }
    
    case DELETE_ORDER:
      return { ...state, deletingOrder: true }
    case DELETE_ORDER_SUCCESS:
      return { ...state, deletingOrder: false }
    case DELETE_ORDER_FAILURE:
      return { ...state, deletingOrder: false }
    
    case CLOSE_ORDER:
      return { ...state, closingId: payload.orderNumber }
    case CLOSE_ORDER_FAILURE:
      return { ...state, closingId: null }
    
    case RESET_RESTAURANT:
      return { ...state, tableOrders: null, orderItemDetails: null, orders: null, orderDetails: null }
    default:
      return state
  }
}