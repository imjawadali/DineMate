import {
  GET_MENU_ITEMS_REPORTS,
  GET_MENU_ITEMS_REPORTS_FAILURE,
  GET_MENU_ITEMS_REPORTS_SUCCESS,
  GET_ORDERS_REPORTS,
  GET_ORDERS_REPORTS_BY_INTERVAL,
  GET_ORDERS_REPORTS_BY_INTERVAL_FAILURE,
  GET_ORDERS_REPORTS_BY_INTERVAL_SUCCESS,
  GET_ORDERS_REPORTS_FAILURE,
  GET_ORDERS_REPORTS_SUCCESS,
  GET_RESTAURANTS_REPORTS, GET_RESTAURANTS_REPORTS_FAILURE, GET_RESTAURANTS_REPORTS_SUCCESS, RESET_RESTAURANT, RESTAURANT_CHANGED
} from '../../constants'

export default (state = {
  fetchingRestaurantsReports: false, restaurantsReports: null,
  fetchingOrdersReports: false, ordersReports: null,
  fetchingOrdersReportsByInterval: false, ordersReportsByInterval: null,
  fetchingMenuItemsReports: false, menuItemsReports: null
}, { type, payload }) => {
  switch (type) {
    case GET_RESTAURANTS_REPORTS:
      return { ...state, fetchingRestaurantsReports: true }
    case GET_RESTAURANTS_REPORTS_SUCCESS:
      return { ...state, fetchingRestaurantsReports: false, restaurantsReports: payload }
    case GET_RESTAURANTS_REPORTS_FAILURE:
      return { ...state, fetchingRestaurantsReports: false }

    case GET_ORDERS_REPORTS:
      return { ...state, fetchingOrdersReports: true }
    case GET_ORDERS_REPORTS_SUCCESS:
      return { ...state, fetchingOrdersReports: false, ordersReports: payload }
    case GET_ORDERS_REPORTS_FAILURE:
      return { ...state, fetchingOrdersReports: false }

    case GET_ORDERS_REPORTS_BY_INTERVAL:
      return { ...state, fetchingOrdersReportsByInterval: true }
    case GET_ORDERS_REPORTS_BY_INTERVAL_SUCCESS:
      return { ...state, fetchingOrdersReportsByInterval: false, ordersReportsByInterval: payload }
    case GET_ORDERS_REPORTS_BY_INTERVAL_FAILURE:
      return { ...state, fetchingOrdersReportsByInterval: false }

    case GET_MENU_ITEMS_REPORTS:
      return { ...state, fetchingMenuItemsReports: true }
    case GET_MENU_ITEMS_REPORTS_SUCCESS:
      return { ...state, fetchingMenuItemsReports: false, menuItemsReports: payload }
    case GET_MENU_ITEMS_REPORTS_FAILURE:
      return { ...state, fetchingMenuItemsReports: false }

    case RESET_RESTAURANT:
    case RESTAURANT_CHANGED:
      return { ...state, ordersReports: null, ordersReportsByInterval: null, menuItemsReports: null }
    default:
      return state
  }
}