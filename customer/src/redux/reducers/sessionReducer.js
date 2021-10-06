import {
  SET_SESSION, SESSION_CHECK_DONE,
  LOGOUT,
  REGISTER_RESTURENT_SUCESS
} from '../../constants'

export default (state = {
  checkingSignIn: true,
  registerResturentMessage: null,
  customer: null, fetchingDashboard: false, adminDashboard: null
}, { type, payload }) => {
  switch (type) {
    case SET_SESSION:
      return { ...state, checkingSignIn: false, customer: payload.customer }
    case SESSION_CHECK_DONE:
      return { ...state, checkingSignIn: false }
    case LOGOUT:
      return { ...state, customer: null }
    case REGISTER_RESTURENT_SUCESS:
      return { ...state, registerResturentMessage: payload.signUp }
    default:
      return state
  }
}
