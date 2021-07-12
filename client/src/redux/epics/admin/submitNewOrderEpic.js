import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  SUBMIT_NEW_ORDER,
  SUBMIT_NEW_ORDER_SUCCESS,
  SUBMIT_NEW_ORDER_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class submitNewOrderEpic {
  static submitNewOrder = action$ =>
    action$.pipe(
      ofType(SUBMIT_NEW_ORDER),
      switchMap(
        async ({ payload, extras: { history } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.submitNewOrder,
            payload,
            (resObj) => {
              if (history) history.goBack()
              return customisedAction(SUBMIT_NEW_ORDER_SUCCESS, { message: resObj.msg, type: 'success' })
            },
            SUBMIT_NEW_ORDER_FAILURE
          )
        }
      )
    )
}
