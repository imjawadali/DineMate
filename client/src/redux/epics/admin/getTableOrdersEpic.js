import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  GET_TABLE_ORDERS,
  GET_TABLE_ORDERS_SUCCESS,
  GET_TABLE_ORDERS_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class getTableOrdersEpic {
  static getTableOrders = action$ =>
    action$.pipe(
      ofType(GET_TABLE_ORDERS),
      switchMap(
        async ({ payload: { restaurantId, tableId, noToast } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.getTableOrders,
            { restaurantId, tableId },
            (resObj) => {
              return customisedAction(GET_TABLE_ORDERS_SUCCESS, resObj)
            },
            GET_TABLE_ORDERS_FAILURE,
            noToast
          )
        }
      )
    )
}
