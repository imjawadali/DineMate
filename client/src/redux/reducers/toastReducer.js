import { 
  SET_TOAST, RESET_TOAST, SET_TOAST_DISMISSING,
  ADMIN_SIGN_IN_FAILURE,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  CREATE_PASSWORD_FAILURE,
  GET_ALL_RESTAURANTS_FAILURE,
  ADD_RESTAURANT_SUCCESS,
  ADD_RESTAURANT_FAILURE,
  GENERATE_QRS,
  GENERATE_QRS_SUCCESS,
  GENERATE_QRS_FAILURE,
  GET_EXISTING_QRS_FAILURE,
  ADD_RESTAURANT,
  SET_TABLE_NAME,
  GET_EXISTING_QRS,
  SET_TABLE_NAME_FAILURE,
  GET_SUPER_ADMIN_DASHBOARD_FAILURE,
  GET_RESTAURANT_DASHBOARD_FAILURE,
  GET_CATEGORIES,
  GET_CATEGORIES_FAILURE,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  ADD_CATEGORY_FAILURE,
  UPDATE_CATEGORY_FAILURE,
  DELETE_CATEGORY_FAILURE,
  GET_MENU,
  GET_MENU_FAILURE,
  ADD_MENU,
  ADD_MENU_FAILURE,
  GET_USERS,
  GET_USERS_FAILURE,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
  ADD_USER_FAILURE,
  UPDATE_USER_FAILURE,
  DELETE_USER_FAILURE,
  GET_RESTAURANT_DASHBOARD,
  MERGE_TABLES,
  GET_SERVICES_QUE_FAILURE,
  UN_MERGE_TABLES,
  MERGE_TABLES_FAILURE,
  UN_MERGE_TABLES_FAILURE,
  GET_ORDERS,  
  GET_ORDERS_FAILURE,
  GET_TABLE_ORDERS,
  GET_TABLE_ORDERS_FAILURE,
  CLOSE_ORDER_FAILURE,
  CLOSE_ORDER_SUCCESS,
  GET_ORDER_ITEM_DETAILS,
  GET_ORDER_ITEM_DETAILS_FAILURE,
  CLOSE_ORDER,
  UPLOAD_TO_S3,
  UPLOAD_TO_S3_SUCCESS,
  UPLOAD_TO_S3_FAILURE,
  DELETE_FROM_S3,
  DELETE_FROM_S3_SUCCESS,
  DELETE_FROM_S3_FAILURE,
  ADD_MENU_SUCCESS,
  UPDATE_MENU,
  UPDATE_MENU_SUCCESS,
  UPDATE_MENU_FAILURE,
  ADD_ADDON,
  ADD_ADDON_SUCCESS,
  ADD_ADDON_FAILURE,
  UPDATE_ADDON,
  UPDATE_ADDON_SUCCESS,
  UPDATE_ADDON_FAILURE,
  GET_RESTAURANT_TO_EDIT,
  GET_RESTAURANT_TO_EDIT_FAILURE,
  GET_RESTAURANT_TO_EDIT_SUCCESS,
  UPDATE_RESTAURANT,
  UPDATE_RESTAURANT_SUCCESS,
  UPDATE_RESTAURANT_FAILURE,
  GET_KITCHEN_DASHBOARD_FAILURE,
  MARK_ITEM_READY_FAILURE,
  MARK_ORDER_READY_FAILURE,
  GET_STAFF_ASSIGNED_TABLES_SUCCESS,
  GET_STAFF_ASSIGNED_TABLES_FAILURE,
  ASSIGN_TABLES_TO_STAFF_FAILURE,
  GET_ORDER_DETAILS,
  GET_ORDER_DETAILS_FAILURE,
  RESET_RESTAURANT,
  SUBMIT_NEW_ORDER,
  SUBMIT_NEW_ORDER_SUCCESS,
  SUBMIT_NEW_ORDER_FAILURE,
  ADD_ITEMS_TO_ORDER,
  ADD_ITEMS_TO_ORDER_SUCCESS,
  ADD_ITEMS_TO_ORDER_FAILURE,
  DELETE_ITEM,
  DELETE_ITEM_FAILURE,
  DELETE_ORDER,
  DELETE_ORDER_FAILURE,
  DELETE_ORDER_SUCCESS,
  APPLY_DISCOUNT,
  APPLY_DISCOUNT_FAILURE,
  UPDATE_RESTAURANT_SETTINGS,
  GET_RESTAURANT_SETTINGS_FAILURE,
  UPDATE_RESTAURANT_SETTINGS_FAILURE,
  GET_RESTAURANT_SETTINGS,
  ADMIN_SIGN_IN,
  SET_SESSION,
  CHECK_PASSWORD_EXPIRY_SUCCESS,
  CHECK_PASSWORD_EXPIRY_FAILURE,
  GET_GENERIC_DATA_FAILURE,
  UPDATE_GENERIC_DATA_FAILURE,
  UPDATE_GENERIC_DATA,
  GET_GENERIC_DATA
} from '../../constants'

export default (state = { toast: null, toastSetDismiss: false }, { type, payload }) => {
  switch (type) {
    case SET_TOAST:
      return { ...state, toast: payload }
    case RESET_TOAST:
      return { ...state, toast: null }
    case SET_TOAST_DISMISSING:
      return { ...state, toastSetDismiss: payload }
    case ADMIN_SIGN_IN:
      return { ...state, toastSetDismiss: true, toast: { message: 'Signing-In Admin', type: 'success' } }
    case SET_SESSION:
      return { ...state, toastSetDismiss: true }
    case ADMIN_SIGN_IN_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }
    case CHECK_PASSWORD_EXPIRY_SUCCESS:
      return { ...state, toastSetDismiss: true, toast: payload }
    case CHECK_PASSWORD_EXPIRY_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }
    case FORGOT_PASSWORD_SUCCESS:
      return { ...state, toast: payload }
    case FORGOT_PASSWORD_FAILURE:
      return { ...state, toast: payload }
    case CREATE_PASSWORD_FAILURE:
      return { ...state, toast: payload }
    case GET_ALL_RESTAURANTS_FAILURE:
      return { ...state, toast: payload }
    case GET_EXISTING_QRS_FAILURE:
      return { ...state, toast: payload }
    case GENERATE_QRS:
      return { ...state, toast: { message: 'Generating QR', type: 'success' } }
    case GENERATE_QRS_SUCCESS:
      return { ...state, toastSetDismiss: true }
    case GENERATE_QRS_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }
    case ADD_RESTAURANT:
      return { ...state, toast: { message: 'Adding Restaurant', type: 'success' } }
    case ADD_RESTAURANT_SUCCESS:
      return { ...state, toastSetDismiss: true }
    case ADD_RESTAURANT_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }
    case UPDATE_RESTAURANT:
      return { ...state, toast: { message: 'Updating Restaurant', type: 'success' } }
    case UPDATE_RESTAURANT_SUCCESS:
      return { ...state, toastSetDismiss: true }
    case UPDATE_RESTAURANT_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }
    case GET_RESTAURANT_TO_EDIT:
      return { ...state, toast: { message: 'Fetching restaurant data for editting', type: 'success' } }
    case GET_RESTAURANT_TO_EDIT_SUCCESS:
      return { ...state, toastSetDismiss: true }
    case GET_RESTAURANT_TO_EDIT_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }
    case SET_TABLE_NAME:
      return { ...state, toast: { message: 'Updating Table Name', type: 'success' } }
    case GET_EXISTING_QRS:
      return { ...state, toastSetDismiss: true }
    case SET_TABLE_NAME_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }
    case GET_GENERIC_DATA:
      return { ...state, toastSetDismiss: true, toast: payload.toast }
    case GET_GENERIC_DATA_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }
    case UPDATE_GENERIC_DATA:
      return { ...state, toastSetDismiss: true, toast: { message: 'Updating Data', type: 'success' } }
    case UPDATE_GENERIC_DATA_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }
    case GET_SUPER_ADMIN_DASHBOARD_FAILURE:
      return { ...state, toast: payload }
    case GET_RESTAURANT_DASHBOARD:
      return { ...state, toastSetDismiss: true }
    case GET_RESTAURANT_DASHBOARD_FAILURE:
      return { ...state, toast: payload }
    case GET_KITCHEN_DASHBOARD_FAILURE:
      return { ...state, toast: payload }
    case MARK_ITEM_READY_FAILURE:
      return { ...state, toast: payload }
    case MARK_ORDER_READY_FAILURE:
      return { ...state, toast: payload }
    case GET_TABLE_ORDERS:
      return { ...state, toastSetDismiss: true }
    case GET_TABLE_ORDERS_FAILURE:
      return { ...state, toast: payload }
    case GET_ORDER_ITEM_DETAILS:
      return { ...state, toastSetDismiss: true }
    case GET_ORDER_ITEM_DETAILS_FAILURE:
      return { ...state, toast: payload }
    case GET_ORDERS:
      return { ...state, toastSetDismiss: true }
    case GET_ORDERS_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }
    case GET_ORDER_DETAILS:
      return { ...state, toastSetDismiss: true, toast: payload.toast }
    case GET_ORDER_DETAILS_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }
    case SUBMIT_NEW_ORDER:
      return { ...state, toastSetDismiss: true, toast: { message: 'Submitting New Order', type: 'success' } }
    case SUBMIT_NEW_ORDER_SUCCESS:
      return { ...state, toastSetDismiss: true, toast: payload }
    case SUBMIT_NEW_ORDER_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }
    case ADD_ITEMS_TO_ORDER:
      return { ...state, toastSetDismiss: true, toast: { message: 'Adding item(s) to order', type: 'success' } }
    case ADD_ITEMS_TO_ORDER_SUCCESS:
      return { ...state, toastSetDismiss: true, toast: payload }
    case ADD_ITEMS_TO_ORDER_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }
    case DELETE_ITEM:
      return { ...state, toastSetDismiss: true, toast: { message: 'Deleting item', type: 'success' } }
    case DELETE_ITEM_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }
    case DELETE_ORDER:
      return { ...state, toastSetDismiss: true, toast: { message: 'Deleting order', type: 'success' } }
    case DELETE_ORDER_SUCCESS:
      return { ...state, toastSetDismiss: true, toast: payload }
    case DELETE_ORDER_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }
    case APPLY_DISCOUNT:
      return { ...state, toastSetDismiss: true, toast: { message: 'Applying discount to order', type: 'success' } }
    case APPLY_DISCOUNT_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }
    case CLOSE_ORDER:
      return { ...state, toastSetDismiss: true, toast: { message: 'Closing Check', type: 'success' } }
    case CLOSE_ORDER_SUCCESS:
      return { ...state, toastSetDismiss: true, toast: payload.toast }
    case CLOSE_ORDER_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }
    case MERGE_TABLES:
      return { ...state, toast: { message: 'Merging Tables', type: 'success' } }
    case MERGE_TABLES_FAILURE:
      return { ...state, toast: payload }
    case UN_MERGE_TABLES:
      return { ...state, toast: { message: 'Un-Merging Tables', type: 'warning' } }
    case UN_MERGE_TABLES_FAILURE:
      return { ...state, toast: payload }
    case GET_STAFF_ASSIGNED_TABLES_SUCCESS:
      return { ...state, toastSetDismiss: true}
    case GET_STAFF_ASSIGNED_TABLES_FAILURE:
      return { ...state, toast: payload }
    case ASSIGN_TABLES_TO_STAFF_FAILURE:
      return { ...state, toast: payload }
    case GET_CATEGORIES:
      return { ...state, toastSetDismiss: true }
    case GET_CATEGORIES_FAILURE:
      return { ...state, toast: payload }
    case ADD_CATEGORY:
      return { ...state, toast: { message: 'Adding Category', type: 'success' } }
    case UPDATE_CATEGORY:
      return { ...state, toast: { message: 'Updating Category', type: 'warning' } }
    case DELETE_CATEGORY:
      return { ...state, toast: { message: 'Deleting Category', type: 'error' } }
    case ADD_CATEGORY_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }
    case UPDATE_CATEGORY_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }
    case DELETE_CATEGORY_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }
    case GET_USERS:
      return { ...state, toastSetDismiss: true, toast: payload.toast }
    case GET_USERS_FAILURE:
      return { ...state, toast: payload }
    case ADD_USER:
      return { ...state, toast: { message: 'Adding User', type: 'success' } }
    case UPDATE_USER:
      return { ...state, toast: { message: 'Updating User', type: 'warning' }}
    case DELETE_USER:
      return { ...state, toast: { message: 'Deleting User', type: 'error' } }
    case ADD_USER_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }
    case UPDATE_USER_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }
    case DELETE_USER_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }
    case GET_MENU:
      return { ...state, toastSetDismiss: true }
    case GET_MENU_FAILURE:
      return { ...state, toast: payload }
    case ADD_MENU:
      return { ...state, toast: { message: 'Adding Menu Item', type: 'success' } }
    case ADD_MENU_SUCCESS:
      return { ...state, toastSetDismiss: true, toast: payload.toast }
    case ADD_MENU_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }
    case UPDATE_MENU:
      return { ...state, toast: { message: 'Updating Menu Item', type: 'success' } }
    case UPDATE_MENU_SUCCESS:
      return { ...state, toastSetDismiss: true, toast: payload.toast }
    case UPDATE_MENU_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }
    case ADD_ADDON:
      return { ...state, toast: { message: 'Adding Add-on', type: 'success' } }
    case ADD_ADDON_SUCCESS:
      return { ...state, toastSetDismiss: true, toast: payload.toast }
    case ADD_ADDON_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }
    case UPDATE_ADDON:
      return { ...state, toast: { message: 'Updating Add-on', type: 'success' } }
    case UPDATE_ADDON_SUCCESS:
      return { ...state, toastSetDismiss: true, toast: payload.toast }
    case UPDATE_ADDON_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }
    case GET_RESTAURANT_SETTINGS:
      return { ...state, toastSetDismiss: true, toast: payload.toast }
    case GET_RESTAURANT_SETTINGS_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }
    case UPDATE_RESTAURANT_SETTINGS:
      return { ...state, toastSetDismiss: true, toast: { message: 'Updating Restaurant Settings', type: 'success' } }
    case UPDATE_RESTAURANT_SETTINGS_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }
    case UPLOAD_TO_S3:
      return { ...state, toastSetDismiss: true }
    case UPLOAD_TO_S3_SUCCESS:
      return { ...state, toastSetDismiss: true, toast: payload.toast }
    case UPLOAD_TO_S3_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }
    case DELETE_FROM_S3:
      return { ...state, toastSetDismiss: true, toast: { message: 'Deleting File', type: 'warning' } }
    case DELETE_FROM_S3_SUCCESS:
      return { ...state, toastSetDismiss: true, toast: payload }
    case DELETE_FROM_S3_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }
    
    case RESET_RESTAURANT:
      return { ...state, users: null }
    default:
      return state
  }
}
