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
  ADD_RESTAURANT
} from '../../constants'

export default (state = { toast: null, toastSetDismiss: false }, { type, payload }) => {
  switch (type) {
    case SET_TOAST:
      return { ...state, toast: payload }
    case RESET_TOAST:
      return { ...state, toast: null }
    case SET_TOAST_DISMISSING:
      return { ...state, toastSetDismiss: payload }
    case ADMIN_SIGN_IN_FAILURE:
      return { ...state, toast: payload }
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
    default:
      return state
  }
}
