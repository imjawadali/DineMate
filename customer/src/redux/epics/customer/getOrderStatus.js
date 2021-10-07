import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  GET_ORDER_STATUS,
  GET_ORDER_STATUS_SUCCESS,
  GET_ORDER_STATUS_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class orderGetStatusEpic {
  static getOrderStatus = action$ =>
    action$.pipe(
      ofType(GET_ORDER_STATUS),
      switchMap(
        async (obj) => {
          return generalizedEpic(
            'post',
            API_ENDPOINTS.customer.getOrderStatus,
            obj.payload,
            (resObj) => {
              return customisedAction(GET_ORDER_STATUS_SUCCESS, { status: resObj.body, toast: { message: resObj.message, type: 'success' } })
            },
            GET_ORDER_STATUS_FAILURE
          )
        }
      )
    )
}
