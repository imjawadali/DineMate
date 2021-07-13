import { switchMap, filter } from 'rxjs/operators'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  GET_ORDERS,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAILURE,
  API_ENDPOINTS,
  CLOSE_ORDER_SUCCESS
} from '../../../constants'

export class getOrdersEpic {
  static getOrders = action$ =>
    action$.pipe(
      filter(({ type }) => {
        switch (type) {
          case GET_ORDERS:
            return true;
          case CLOSE_ORDER_SUCCESS:
            return true;
          default:
            return false;
        }
      }),
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
