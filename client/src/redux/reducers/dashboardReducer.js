import { 
  RESET_RESTAURANT,
  GET_RESTAURANT_DASHBOARD, GET_RESTAURANT_DASHBOARD_SUCCESS, GET_RESTAURANT_DASHBOARD_FAILURE,
  MERGE_TABLES, MERGE_TABLES_FAILURE
} from '../../constants'

export default (state = {
  fetchingDashboard: false,
  restaurantDashboard: null,
  mergingTables: false
}, { type, payload }) => {
  switch (type) {
    case RESET_RESTAURANT:
      return { ...state, restaurantDashboard: null }
    case GET_RESTAURANT_DASHBOARD:
      return { ...state, fetchingDashboard: true, mergingTables: false }
    case GET_RESTAURANT_DASHBOARD_SUCCESS:
      return { ...state, fetchingDashboard: false, restaurantDashboard: payload }
    case GET_RESTAURANT_DASHBOARD_FAILURE:
      return { ...state, fetchingDashboard: false }
    case MERGE_TABLES:
      return { ...state, mergingTables: true }
    case MERGE_TABLES_FAILURE:
      return { ...state, mergingTables: false }
    default:
      return state
  }
}
