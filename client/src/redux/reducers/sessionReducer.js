import { 
  SET_SESSION, SESSION_CHECK_DONE,
  ADMIN_LOGOUT,
  SET_RESTAURANT, RESET_RESTAURANT,
  GET_SUPER_ADMIN_DASHBOARD, GET_SUPER_ADMIN_DASHBOARD_SUCCESS, GET_SUPER_ADMIN_DASHBOARD_FAILURE,
  GET_RESTAURANT_DASHBOARD, GET_RESTAURANT_DASHBOARD_SUCCESS, GET_RESTAURANT_DASHBOARD_FAILURE
} from '../../constants'

export default (state = { checkingSignIn: true,
  admin: null, fetchingDashboard: false,
  adminDashboard: null, restaurantDashboard: null
}, { type, payload }) => {
  switch (type) {
    case SET_SESSION:
      return { ...state, checkingSignIn: false, admin: payload.admin }
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
      return { ...state, admin: newAdmin, restaurantDashboard: null }
    }
    case GET_SUPER_ADMIN_DASHBOARD:
      return { ...state, fetchingDashboard: true }
    case GET_SUPER_ADMIN_DASHBOARD_SUCCESS:
      return { ...state, fetchingDashboard: false, adminDashboard: payload }
    case GET_SUPER_ADMIN_DASHBOARD_FAILURE:
      return { ...state, fetchingDashboard: false }
    case GET_RESTAURANT_DASHBOARD:
      return { ...state, fetchingDashboard: true }
    case GET_RESTAURANT_DASHBOARD_SUCCESS:
      return { ...state, fetchingDashboard: false, restaurantDashboard: payload }
    case GET_RESTAURANT_DASHBOARD_FAILURE:
      return { ...state, fetchingDashboard: false }
    default:
      return state
  }
}
