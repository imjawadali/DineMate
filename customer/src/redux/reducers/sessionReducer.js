import {
  SET_SESSION, SESSION_CHECK_DONE,
  LOGOUT,
  REGISTER_RESTURENT_SUCESS,
  GET_RPOFILE_SUCCESS
} from '../../constants'

export default (state = {
  checkingSignIn: true,
  customer: null, fetchingDashboard: false, adminDashboard: null
}, { type, payload }) => {
  switch (type) {
    case SET_SESSION:
      return { ...state, checkingSignIn: false, customer: payload.customer }
    case GET_RPOFILE_SUCCESS:
      return { ...state, customer: payload }
    case SESSION_CHECK_DONE:
      return { ...state, checkingSignIn: false }
    case LOGOUT:
      return { ...state, customer: null }
    default:
      return state
  }
}
