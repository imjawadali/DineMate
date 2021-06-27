import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  GET_ORDERS,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class getOrdersEpic {
  static getOrders = action$ =>
    action$.pipe(
      ofType(GET_ORDERS),
      switchMap(
        async ({ payload: { restaurantId, type, status, noToast } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.getOrders,
            { restaurantId, type, status },
            (resObj) => {
              return customisedAction(GET_ORDERS_SUCCESS, resObj)
            },
            GET_ORDERS_FAILURE,
            noToast
          )
        }
      )
    )
}
