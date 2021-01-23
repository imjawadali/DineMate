import { 
  SET_SESSION, SESSION_CHECK_DONE,
  ADMIN_LOGOUT,
  SET_RESTAURANT, RESET_RESTAURANT
} from '../../constants'

export default (state = { checkingSignIn: true, user: null, admin: null }, { type, payload }) => {
  switch (type) {
    case SET_SESSION:
      return { ...state, checkingSignIn: false, user: payload.user, admin: payload.admin }
    case SESSION_CHECK_DONE:
      return { ...state, checkingSignIn: false }
    case ADMIN_LOGOUT:
      return { ...state, admin: null }
    case SET_RESTAURANT: {
      const newAdmin = state.admin
      newAdmin.restaurantId = payload.restaurantId
      newAdmin.restaurantName = payload.restaurantName
      return { ...state, admin: newAdmin }
    }
    case RESET_RESTAURANT: {
      const newAdmin = state.admin
      newAdmin.restaurantId = null
      newAdmin.restaurantName = null
      return { ...state, admin: newAdmin }
    }
    default:
      return state
  }
}
