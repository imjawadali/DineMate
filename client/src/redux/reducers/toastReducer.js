import { 
  SET_TOAST, RESET_TOAST, SET_TOAST_DISMISSING,
  ADMIN_SIGN_IN_FAILURE,
  GENERATE_QRS,
  GENERATE_QRS_SUCCESS,
  GENERATE_QRS_FAILURE
} from '../../constants'

export default (state = { toast: null, toastSetDismiss: false }, { type, payload }) => {
  switch (type) {
    case SET_TOAST:
      return { ...state, toast: payload }
    case RESET_TOAST:
      return { ...state, toast: null }
    case ADMIN_SIGN_IN_FAILURE:
      return { ...state, toast: payload }
    case SET_TOAST_DISMISSING:
      return { ...state, toastSetDismiss: payload }
    case GENERATE_QRS:
      return { ...state, toast: { message: 'Generating QR', type: 'success' } }
    case GENERATE_QRS_SUCCESS:
      return { ...state, toastSetDismiss: true }
    case GENERATE_QRS_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }
    default:
      return state
  }
}
