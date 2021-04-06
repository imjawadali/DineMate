import { 
  SET_SESSION, SESSION_CHECK_DONE,
  LOGOUT
} from '../../constants'

export default (state = { checkingSignIn: true,
  customer: null, fetchingDashboard: false, adminDashboard: null
}, { type, payload }) => {
  switch (type) {
    case SET_SESSION:
      return { ...state, checkingSignIn: false, customer: payload.customer }
    case SESSION_CHECK_DONE:
      return { ...state, checkingSignIn: false }
    case LOGOUT:
      return { ...state, customer: null }
    default:
      return state
  }
}
