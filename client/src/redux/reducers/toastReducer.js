import { 
  SET_TOAST, RESET_TOAST
} from '../../constants'

export default (state = { toast: null }, { type, payload }) => {
  switch (type) {
    case SET_TOAST:
      return { ...state, toast: payload }
    case RESET_TOAST:
      return { ...state, toast: null }
    default:
      return state;
  }
};
