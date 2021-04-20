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

export class getOpenOrdersEpic {
  static getOpenOrders = action$ =>
    action$.pipe(
      ofType(GET_ORDERS),
      switchMap(
        async ({ payload: { restaurantId, type, noToast } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.getOpenOrders,
            { restaurantId,type},
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
