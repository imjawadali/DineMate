import { 
  SET_TOAST, RESET_TOAST, SET_TOAST_DISMISSING,
  GET_ALL_RESTAURANTS_FAILURE,
  GET_MENU_FAILURE,
  GET_MENU,
  GET_RESTAURANT_DETAILS
} from '../../constants'

export default (state = { toast: null, toastSetDismiss: false }, { type, payload }) => {
  switch (type) {
    case SET_TOAST:
      return { ...state, toast: payload }
    case RESET_TOAST:
      return { ...state, toast: null }
    case SET_TOAST_DISMISSING:
      return { ...state, toastSetDismiss: payload }
    case GET_ALL_RESTAURANTS_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }
    case GET_MENU:
      return { ...state, toastSetDismiss: true }
    case GET_MENU_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }
    case GET_RESTAURANT_DETAILS:
      return { ...state, toastSetDismiss: true, toast: { message: 'Fetching restaurant data', type: 'success' }}
    case GET_MENU_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }
    default:
      return state
  }
}
