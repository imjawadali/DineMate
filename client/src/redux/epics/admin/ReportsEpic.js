import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  GET_RESTAURANTS_REPORTS,
  GET_RESTAURANTS_REPORTS_SUCCESS,
  GET_RESTAURANTS_REPORTS_FAILURE,
  API_ENDPOINTS,
  GET_ORDERS_REPORTS,
  GET_ORDERS_REPORTS_SUCCESS,
  GET_ORDERS_REPORTS_FAILURE,
  GET_ORDERS_REPORTS_BY_INTERVAL,
  GET_ORDERS_REPORTS_BY_INTERVAL_SUCCESS,
  GET_ORDERS_REPORTS_BY_INTERVAL_FAILURE,
  GET_MENU_ITEMS_REPORTS,
  GET_MENU_ITEMS_REPORTS_SUCCESS,
  GET_MENU_ITEMS_REPORTS_FAILURE,
} from '../../../constants'

export class ReportsEpic {
  static getRestaurants = action$ =>
    action$.pipe(
      ofType(GET_RESTAURANTS_REPORTS),
      switchMap(
        async () => {
          return generalizedEpic(
            'get',
            API_ENDPOINTS.admin.reports.restaurants,
            null,
            (resObj) => {
              return customisedAction(GET_RESTAURANTS_REPORTS_SUCCESS, resObj)
            },
            GET_RESTAURANTS_REPORTS_FAILURE
          )
        }
      )
    )
  static getOrders = action$ =>
    action$.pipe(
      ofType(GET_ORDERS_REPORTS),
      switchMap(
        async ({ payload }) => {
          return generalizedEpic(
            'post',
            API_ENDPOINTS.admin.reports.orders,
            payload,
            (resObj) => {
              return customisedAction(GET_ORDERS_REPORTS_SUCCESS, resObj)
            },
            GET_ORDERS_REPORTS_FAILURE
          )
        }
      )
    )
  static getOrdersByInterval = action$ =>
    action$.pipe(
      ofType(GET_ORDERS_REPORTS_BY_INTERVAL),
      switchMap(
        async ({ payload }) => {
          return generalizedEpic(
            'post',
            API_ENDPOINTS.admin.reports.orders,
            payload,
            (resObj) => {
              return customisedAction(GET_ORDERS_REPORTS_BY_INTERVAL_SUCCESS, resObj)
            },
            GET_ORDERS_REPORTS_BY_INTERVAL_FAILURE
          )
        }
      )
    )
  static getMenuItems = action$ =>
    action$.pipe(
      ofType(GET_MENU_ITEMS_REPORTS),
      switchMap(
        async ({ payload }) => {
          return generalizedEpic(
            'post',
            API_ENDPOINTS.admin.reports.menuItems,
            payload,
            (resObj) => {
              return customisedAction(GET_MENU_ITEMS_REPORTS_SUCCESS, resObj)
            },
            GET_MENU_ITEMS_REPORTS_FAILURE
          )
        }
      )
    )
}
