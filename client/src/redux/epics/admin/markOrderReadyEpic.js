import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  MARK_ORDER_READY,
  GET_KITCHEN_DASHBOARD,
  MARK_ORDER_READY_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class markOrderReadyEpic {
  static markOrderReady = action$ =>
    action$.pipe(
      ofType(MARK_ORDER_READY),
      switchMap(
        async ({ payload: { restaurantId, orderNumber } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.markOrderReady,
            { restaurantId, orderNumber },
            () => {
              return customisedAction(GET_KITCHEN_DASHBOARD, { restaurantId })
            },
            MARK_ORDER_READY_FAILURE
          )
        }
      )
    )
}
