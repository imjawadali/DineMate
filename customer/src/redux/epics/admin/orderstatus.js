import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  GET_STATUS,
  GET_STATUS_SUCCESS,
  GET_STATUS_FAILURE,
  API_ENDPOINTS
} from '../../../constants'
import { removeItem } from '../../../helpers'

export class getOrderStatusEpic {
  static getOrderStatus = action$ =>
    action$.pipe(
      ofType(GET_STATUS),
      switchMap(
        async (obj) => {
          return generalizedEpic(
            'post',
            API_ENDPOINTS.customer.getOrderStatus,
            obj.payload,
            (resObj) => {
              // removeItem('orderDetails')
              // removeItem('cartMenu')
              return customisedAction(GET_STATUS_SUCCESS,{ status: resObj.body, toast: { message: resObj.message, type: 'success' }})
            },
            GET_STATUS_FAILURE
          )
        }
      )
    )
}
