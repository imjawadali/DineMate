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

export class closeOrderEpic {
  static closeOrder = action$ =>
    action$.pipe(
      ofType(CLOSE_ORDER),
      switchMap(
        async ({ payload: { restaurantId, orderNumber, history } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.closeOrder,
            { restaurantId, orderNumber },
            (resObj) => {
              return customisedAction(CLOSE_ORDER_SUCCESS, { restaurantId, orderNumber, history, toast: { message: resObj.msg, type: 'success' }})
            },
            CLOSE_ORDER_FAILURE
          )
        }
      )
    )
}
