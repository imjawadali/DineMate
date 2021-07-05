import {
  SET_TOAST, RESET_TOAST, SET_TOAST_DISMISSING,
  GET_ALL_RESTAURANTS_FAILURE,
  GET_MENU_FAILURE,
  GET_MENU,
  GET_RESTAURANT_DETAILS,
  GET_RESTAURANT_DETAILS_SUCCESS,
  GET_RESTAURANT_DETAILS_FAILURE,
  SET_ORDER,
  INITIALIZE_ORDER_FAILURE,
  SIGN_IN,
  SET_SESSION,
  SIGN_IN_FAILURE,
  SIGN_UP,
  ALREADY_IN_CART,
  CALL_FOR_SERVICE,
  CALL_FOR_SERVICE_SUCCESS,
  CALL_FOR_SERVICE_FAILURE,
  DONOTDISTURB,
  DONOTDISTURB_SUCCESS,
  DONOTDISTURB_FAILURE,
  CLOSE_ORDER,
  CLOSE_ORDER_SUCCESS,
  CLOSE_ORDER_FAILURE,
  UPDATE_RPOFILE_SUCCESS,
  CANT_SIGN_OUT
} from '../../constants'

export default (state = { toast: null, toastSetDismiss: false }, { type, payload }) => {
  switch (type) {
    case SET_TOAST:
      return { ...state, toast: payload }
    case RESET_TOAST:
      return { ...state, toast: null }
    case SET_TOAST_DISMISSING:
      return { ...state, toastSetDismiss: payload }
    case SIGN_IN:
      return { ...state, toastSetDismiss: true, toast: { message: 'Singing You In!', type: 'success' } }
    case SIGN_UP:
      return { ...state, toastSetDismiss: true, toast: { message: 'Sign Up Succes', type: 'success' } }
    case SET_SESSION:
      return { ...state, toastSetDismiss: true }
    case SIGN_IN_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }
    case GET_ALL_RESTAURANTS_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }
    case GET_MENU_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }
    case GET_RESTAURANT_DETAILS:
      return { ...state, toastSetDismiss: true, toast: { message: 'Fetching restaurant data', type: 'success' } }
    case GET_RESTAURANT_DETAILS_SUCCESS:
      return { ...state, toastSetDismiss: true }
    case GET_RESTAURANT_DETAILS_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }
    case SET_ORDER:
      return { ...state, toast: payload.toast }
    case ALREADY_IN_CART:
      return { ...state, toast: payload }

    case CALL_FOR_SERVICE:
      return { ...state, toastSetDismiss: true, toast: payload.toast }
    case CALL_FOR_SERVICE_SUCCESS:
      return { ...state, toastSetDismiss: true, toast: payload.toast }
    case CALL_FOR_SERVICE_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload.toast }
    case DONOTDISTURB:
      return { ...state, toastSetDismiss: true, toast: payload.toast }
    case DONOTDISTURB_SUCCESS:
      return { ...state, toastSetDismiss: true, toast: payload.toast }
    case DONOTDISTURB_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload.toast }
      case CLOSE_ORDER:
        return { ...state, toastSetDismiss: true, toast: payload.toast }
      case CLOSE_ORDER_SUCCESS:
        return { ...state, toastSetDismiss: true, toast: payload.toast }
      case CLOSE_ORDER_FAILURE:
        return { ...state, toastSetDismiss: true, toast: payload.toast }
        case UPDATE_RPOFILE_SUCCESS:
        return { ...state, toastSetDismiss: true, toast: payload.toast }
        
        case CANT_SIGN_OUT:
          return { ...state, toastSetDismiss: true, toast: { message: "You Can't Sign Out The Cart Need To Be Clear", type: 'success' } }
     
    case INITIALIZE_ORDER_FAILURE:
      return { ...state, toast: payload }
    default:
      return state
  }
}
