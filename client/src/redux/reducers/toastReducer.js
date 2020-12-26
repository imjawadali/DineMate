import { 
  SET_TOAST, RESET_TOAST,
  ADMIN_SIGN_IN_FAILURE
} from '../../constants'

export default (state = { toast: null }, { type, payload }) => {
  switch (type) {
    case SET_TOAST:
      return { ...state, toast: payload }
    case RESET_TOAST:
      return { ...state, toast: null }
    case ADMIN_SIGN_IN_FAILURE:
      return { ...state, toast: payload }
    default:
      return state;
  }
};
