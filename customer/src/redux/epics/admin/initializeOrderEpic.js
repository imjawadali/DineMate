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
          // setItem('orderDetails', obj)
          // orderNumber to be change to initilaze order becaus qr code is not given 
          let obj2 = {
            "orderNumber": "135",
            "restaurantId": "xyz_restaurant",
            "tableId": "8",
            "type": "Dine-In"
        }
          return customisedAction(SET_ORDER, { orderDetails: obj2, toast: { message: 'initialized', type: 'success' } })
          // return generalizedEpic(
          //   'post', 
          //   API_ENDPOINTS.customer.initializeOrder,
          //   obj.payload,
          //   (resObj) => {
          //   },
          //   INITIALIZE_ORDER_FAILURE
          // )
        }
      )
    )
}
