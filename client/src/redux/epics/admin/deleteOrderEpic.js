import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  DELETE_ORDER,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class deleteOrderEpic {
  static deleteOrder = action$ =>
    action$.pipe(
      ofType(DELETE_ORDER),
      switchMap(
        async ({ payload, extras: { history } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.deleteOrder,
            payload,
            (resObj) => {
              if (history)
                history.goBack()
              return customisedAction(DELETE_ORDER_SUCCESS, { message: resObj.msg, type: 'success' })
            },
            DELETE_ORDER_FAILURE
          )
        }
      )
    )
}
