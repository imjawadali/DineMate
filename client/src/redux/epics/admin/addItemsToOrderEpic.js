import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  ADD_ITEMS_TO_ORDER,
  ADD_ITEMS_TO_ORDER_SUCCESS,
  ADD_ITEMS_TO_ORDER_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class addItemsToOrderEpic {
  static addItemsToOrder = action$ =>
    action$.pipe(
      ofType(ADD_ITEMS_TO_ORDER),
      switchMap(
        async ({ payload, extras: { history } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.addItemsToOrder,
            payload,
            (resObj) => {
              if (history) history.goBack()
              return customisedAction(ADD_ITEMS_TO_ORDER_SUCCESS, { message: resObj.msg, type: 'success' })
            },
            ADD_ITEMS_TO_ORDER_FAILURE
          )
        }
      )
    )
}
