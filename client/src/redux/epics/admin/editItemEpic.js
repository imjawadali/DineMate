import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  EDIT_ITEM,
  GET_ORDER_DETAILS,
  EDIT_ITEM_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class editItemEpic {
  static editItem = action$ =>
    action$.pipe(
      ofType(EDIT_ITEM),
      switchMap(
        async ({ payload, payload: { restaurantId, orderNumber } }) => {
          return generalizedEpic(
            'post',
            API_ENDPOINTS.admin.editItem,
            payload,
            (resObj) => {
              return customisedAction(GET_ORDER_DETAILS, {
                restaurantId,
                orderNumber,
                toast: { message: resObj.msg, type: 'success' }
              })
            },
            EDIT_ITEM_FAILURE
          )
        }
      )
    )
}
