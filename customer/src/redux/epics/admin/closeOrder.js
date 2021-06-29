import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  CLOSE_ORDER,
  CLOSE_ORDER_SUCCESS,
  CLOSE_ORDER_FAILURE,
  API_ENDPOINTS
} from '../../../constants'
import { removeItem } from '../../../helpers'

export class closeOrderViaCashEpic {
  static closeOrderViaCash = action$ =>
    action$.pipe(
      ofType(CLOSE_ORDER),
      switchMap(
        async (obj) => {
          return generalizedEpic(
            'post',
            API_ENDPOINTS.customer.closeOrderViaCash,
            obj.payload,
            (resObj) => {
              removeItem('orderDetails')
              removeItem('cartMenu')
              return customisedAction(CLOSE_ORDER_SUCCESS,{ closeOrder: resObj.body, toast: { message: resObj.message, type: 'success' }})
            },
            CLOSE_ORDER_FAILURE
          )
        }
      )
    )
}
