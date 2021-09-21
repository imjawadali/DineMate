import { 
  RESET_RESTAURANT,
  GET_RESTAURANT_DASHBOARD, GET_RESTAURANT_DASHBOARD_SUCCESS, GET_RESTAURANT_DASHBOARD_FAILURE,
  MERGE_TABLES, MERGE_TABLES_FAILURE,
  UN_MERGE_TABLES, UN_MERGE_TABLES_FAILURE,
  GET_SERVICES_QUE, GET_SERVICES_QUE_SUCCESS, GET_SERVICES_QUE_FAILURE,
  GET_KITCHEN_DASHBOARD, GET_KITCHEN_DASHBOARD_SUCCESS, GET_KITCHEN_DASHBOARD_FAILURE,
  MARK_ITEM_READY, MARK_ITEM_READY_FAILURE, MARK_ORDER_READY, MARK_ORDER_READY_FAILURE
} from '../../constants'

export default (state = {
  fetchingDashboard: false,
  restaurantDashboard: null,
  kitchenDashboard: null,
  markingId: null,
  markingOrderNumber: null,
  mergingTables: false,
  unMergingTables: false,
  fetchingServicesQue: false,
  servicesQue: null,
}, { type, payload }) => {
  switch (type) {
    case GET_RESTAURANT_DASHBOARD:
      return { ...state, fetchingDashboard: true, mergingTables: false, unMergingTables: false }
    case GET_RESTAURANT_DASHBOARD_SUCCESS:
      return { ...state, fetchingDashboard: false, restaurantDashboard: payload }
    case GET_RESTAURANT_DASHBOARD_FAILURE:
      return { ...state, fetchingDashboard: false }

    case GET_KITCHEN_DASHBOARD:
      return { ...state, fetchingDashboard: true, markingId: null, markingOrderNumber: null }
    case GET_KITCHEN_DASHBOARD_SUCCESS:
      return { ...state, fetchingDashboard: false, kitchenDashboard: payload }
    case GET_KITCHEN_DASHBOARD_FAILURE:
      return { ...state, fetchingDashboard: false }

    case MARK_ITEM_READY:
      return { ...state, markingId: payload.id }
    case MARK_ITEM_READY_FAILURE:
      return { ...state, markingId: null }

    case MARK_ORDER_READY:
      return { ...state, markingOrderNumber: payload.orderNumber }
    case MARK_ORDER_READY_FAILURE:
      return { ...state, markingOrderNumber: null }

    case MERGE_TABLES:
      return { ...state, mergingTables: true }
    case MERGE_TABLES_FAILURE:
      return { ...state, mergingTables: false }

    case UN_MERGE_TABLES:
      return { ...state, unMergingTables: true }
    case UN_MERGE_TABLES_FAILURE:
      return { ...state, unMergingTables: false }

    case GET_SERVICES_QUE:
      return { ...state, fetchingServicesQue: true }
    case GET_SERVICES_QUE_SUCCESS:
      return { ...state, fetchingServicesQue: false, servicesQue: payload }
    case GET_SERVICES_QUE_FAILURE:
      return { ...state, fetchingServicesQue: false, servicesQue: null }
    
    case RESET_RESTAURANT:
      return { ...state, restaurantDashboard: null, servicesQue: null }
    default:
      return state
  }
}
