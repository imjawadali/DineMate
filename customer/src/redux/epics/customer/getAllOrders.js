import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  GET_ALL_ORDERS,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class getAllOrdersEpic {
  static getAllOrders = action$ =>
    action$.pipe(
      ofType(GET_ALL_ORDERS),
      switchMap(
        async () => {
          return generalizedEpic(
            'get', 
            API_ENDPOINTS.customer.getAllOrders,
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
