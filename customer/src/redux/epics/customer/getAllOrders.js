import { switchMap, filter } from 'rxjs/operators'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  GET_ALL_ORDERS,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_FAILURE,
  API_ENDPOINTS,
  ORDER_CANCELLED,
  ORDER_CLOSED_BY_ADMIN
} from '../../../constants'

export class getAllOrdersEpic {
  static getAllOrders = action$ =>
    action$.pipe(
      filter(({ type }) => {
        switch (type) {
          case GET_ALL_ORDERS:
            return true;
          case ORDER_CANCELLED:
            return true;
          case ORDER_CLOSED_BY_ADMIN:
            return true;
          default:
            return false;
        }
      }),
      switchMap(
        async () => {
          return generalizedEpic(
            'get',
            API_ENDPOINTS.customer.getMyOrders,
            null,
            (resObj) => {
              return customisedAction(GET_ALL_ORDERS_SUCCESS, resObj.body)
            },
            GET_ALL_ORDERS_FAILURE
          )
        }
      )
    )
}
