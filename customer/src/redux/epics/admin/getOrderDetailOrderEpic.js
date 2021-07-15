import { filter, switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  INITIALIZE_ORDER,
  SET_ORDER,
  INITIALIZE_ORDER_FAILURE,
  API_ENDPOINTS,
  GET_ORDER_DETAIL,
  CLOSE_ORDER_SUCCESS,
  GET_ORDER_DETAIL_SUCCESS
} from '../../../constants'
import { getItem, setItem } from '../../../helpers'

// export class initializeOrderEpic {
//   static initializeOrder = action$ =>
//     action$.pipe(
//       ofType(INITIALIZE_ORDER),
//       switchMap(
//         async (obj) => {
//           setItem('orderDetails', obj)
//           return generalizedEpic(
//             'post', 
//             API_ENDPOINTS.customer.initializeOrder,
//             obj.payload,
//             (resObj) => {
//             },
//             INITIALIZE_ORDER_FAILURE
//           )
//           // orderNumber to be change to initilaze order becaus qr code is not given 
//         //   let obj2 = {
//         //     "orderNumber": "135",
//         //     "restaurantId": "xyz_restaurant",
//         //     "tableId": "8",
//         //     "type": "Dine-In"
//         // }
//           return customisedAction(SET_ORDER, { orderDetails: obj2, toast: { message: 'initialized', type: 'success' } })
//         }
//       )
//     )
// }

export class OrderDetailEpic {
  static OrderDetail = action$ =>
    action$.pipe(
      ofType(GET_ORDER_DETAIL),
      switchMap(
        async () => {
          
              let orderDetail = getItem('orderDetails')
              return customisedAction(GET_ORDER_DETAIL_SUCCESS, { orderDetails: orderDetail })
           
        }
      )
    )
}
