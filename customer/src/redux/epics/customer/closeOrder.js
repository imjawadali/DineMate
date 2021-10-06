import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  CLOSE_ORDER,
  CLOSE_ORDER_SUCCESS,
  CLOSE_ORDER_FAILURE,
  API_ENDPOINTS,
  CLOSE_ORDER_VIA_STRIPE
} from '../../../constants'

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
            () => {
              return customisedAction(CLOSE_ORDER_SUCCESS,{ toast: { message: 'Please Wait Manager Will Respond You Soon', type: 'success' }})
            },
            CLOSE_ORDER_FAILURE
          )
        }
      )
    )


  static closeOrderViaStripe = action$ =>
  action$.pipe(
    ofType(CLOSE_ORDER_VIA_STRIPE),
    switchMap(
      async ({ payload }) => {
        return generalizedEpic(
          'post',
          API_ENDPOINTS.customer.closeOrderViaStripe,
          payload,
          (resObj) => {
            return customisedAction(CLOSE_ORDER_SUCCESS,{ toast: { message: resObj.message, type: 'success' }})
          },
          CLOSE_ORDER_FAILURE
        )
      }
    )
  )
}
