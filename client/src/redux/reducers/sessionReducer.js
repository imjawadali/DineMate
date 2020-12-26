import { SET_SESSION, SESSION_CHECK_DONE, ADMIN_LOGOUT } from '../../constants'

export default (state = { checkingSignIn: true, user: null, admin: null }, { type, payload }) => {
  switch (type) {
    case SET_SESSION:
      return { ...state, checkingSignIn: false, user: payload.user, admin: payload.admin }
    case SESSION_CHECK_DONE:
      return { ...state, checkingSignIn: false }
    case ADMIN_LOGOUT:
      return { ...state, admin: null }
    default:
      return state;
  }
};
