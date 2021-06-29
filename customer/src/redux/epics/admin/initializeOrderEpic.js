import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  INITIALIZE_ORDER,
  SET_ORDER,
  INITIALIZE_ORDER_FAILURE,
  API_ENDPOINTS
} from '../../../constants'
import { setItem } from '../../../helpers'

export class initializeOrderEpic {
  static initializeOrder = action$ =>
    action$.pipe(
      ofType(INITIALIZE_ORDER),
      switchMap(
        async (obj) => {
          console.log(obj.payload)
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.customer.initializeOrder,
            obj.payload,
            (resObj) => {
              setItem('orderDetails', resObj.body)
              return customisedAction(SET_ORDER, { orderDetails: resObj.body, toast: { message: resObj.message, type: 'success' } })
            },
            INITIALIZE_ORDER_FAILURE
          )
        }
      )
    )
}
