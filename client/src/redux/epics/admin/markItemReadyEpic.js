import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  MARK_ITEM_READY,
  GET_KITCHEN_DASHBOARD,
  MARK_ITEM_READY_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class markItemReadyEpic {
  static markItemReady = action$ =>
    action$.pipe(
      ofType(MARK_ITEM_READY),
      switchMap(
        async ({ payload: { restaurantId, id } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.markItemReady,
            { id },
            () => {
              return customisedAction(GET_KITCHEN_DASHBOARD, { restaurantId })
            },
            MARK_ITEM_READY_FAILURE
          )
        }
      )
    )
}
