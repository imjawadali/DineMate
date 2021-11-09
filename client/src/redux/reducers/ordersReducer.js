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
  APPLY_DISCOUNT,
  APPLY_DISCOUNT_FAILURE,
  EDIT_ITEM,
  EDIT_ITEM_FAILURE,
  SPLIT_ITEM,
  SPLIT_ITEM_SUCCESS,
  SPLIT_ITEM_FAILURE,
  GENERATE_RECEIPT,
  GENERATE_RECEIPT_SUCCESS,
  GENERATE_RECEIPT_FAILURE
} from '../../constants'
  
export default (state = { 
  fetchingTableOrders: false, fetchingOrderItemDetails: false, fetchingOrders: false, fetchingOrderDetails: false,
  addingUpdatingOrder: false, deletingItemId: null, edittingItemId: null, deletingOrder: false, applyingDiscount: false, generatingReceipt: false,
  tableId: null, tableOrders: null, orderItemDetails: null, closingId: null, orders: null, orderDetails: null, splitId: null
}, { type, payload }) => {
  switch (type) {
    case GET_TABLE_ORDERS:
      return { ...state, fetchingTableOrders: true, tableId: payload.tableId, closingId: null }
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
      return { ...state, fetchingOrders: false, orders: null }
    
    case GET_ORDER_DETAILS:
      return { ...state, fetchingOrderDetails: true, closingId: null, deletingItemId: null, edittingItemId: null, applyingDiscount: false }
    case GET_ORDER_DETAILS_SUCCESS:
      return { ...state, fetchingOrderDetails: false, orderDetails: payload, closingId: null, deletingItemId: null, edittingItemId: null, applyingDiscount: false }
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
    case DELETE_ITEM_FAILURE:
      return { ...state, deletingItemId: null }
    
    case EDIT_ITEM:
      return { ...state, edittingItemId: payload.id }
    case EDIT_ITEM_FAILURE:
      return { ...state, edittingItemId: null }
    
    case DELETE_ORDER:
      return { ...state, deletingOrder: true }
    case DELETE_ORDER_SUCCESS:
      return { ...state, deletingOrder: false }
    case DELETE_ORDER_FAILURE:
      return { ...state, deletingOrder: false }
    
    case APPLY_DISCOUNT:
      return { ...state, applyingDiscount: true }
    case APPLY_DISCOUNT_FAILURE:
      return { ...state, applyingDiscount: false }
    
    case CLOSE_ORDER:
      return { ...state, closingId: payload.orderNumber }
    case CLOSE_ORDER_FAILURE:
      return { ...state, closingId: null }
    
    case GENERATE_RECEIPT:
      return { ...state, generatingReceipt: true }
    case GENERATE_RECEIPT_SUCCESS:
    case GENERATE_RECEIPT_FAILURE:
      return { ...state, generatingReceipt: false }
    
    case SPLIT_ITEM:
      return { ...state, splitId: payload.id }
    case SPLIT_ITEM_SUCCESS:
      return { ...state, splitId: null }
    case SPLIT_ITEM_FAILURE:
      return { ...state, splitId: null }
    
    case RESET_RESTAURANT:
      return { ...state, tableOrders: null, orderItemDetails: null, orders: null, orderDetails: null }
    default:
      return state
  }
}