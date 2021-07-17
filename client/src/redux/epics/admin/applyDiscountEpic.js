import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  APPLY_DISCOUNT,
  GET_ORDER_DETAILS,
  APPLY_DISCOUNT_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class applyDiscountEpic {
  static applyDiscount = action$ =>
    action$.pipe(
      ofType(APPLY_DISCOUNT),
      switchMap(
        async ({ payload: {
          restaurantId,
          orderNumber,
          discount,
          discountType
        }}) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.applyDiscount,
            {
              restaurantId,
              orderNumber,
              discount,
              discountType
            },
            (resObj) => 
              customisedAction(GET_ORDER_DETAILS, {
                restaurantId,
                orderNumber,
                toast: { message: resObj.msg, type: 'success' }
              }),
            APPLY_DISCOUNT_FAILURE
          )
        }
      )
    )
}
