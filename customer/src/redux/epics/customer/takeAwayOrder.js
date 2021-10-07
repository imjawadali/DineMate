import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  API_ENDPOINTS,
  TAKIE_AWAY_ORDER,
  TAKIE_AWAY_ORDER_FAILED,
  GET_TAKE_ORDER_ITEMS
} from '../../../constants'
import { removeItem, setItem } from '../../../helpers'

export class takeAwayOrderEpic {
  static takeAwayOrder = action$ =>
    action$.pipe(
      ofType(TAKIE_AWAY_ORDER),
      switchMap(
        async ({ payload: obj }) => {
          return generalizedEpic(
            'post',
            API_ENDPOINTS.customer.takeAwayOrder,
            obj,
            (resObj) => {
              setItem('orderDetails', resObj.body)
              removeItem('cartMenu')
              return customisedAction(GET_TAKE_ORDER_ITEMS, {
                orderNumber: resObj.body.orderNumber,
                restaurantId: resObj.body.restaurantId,
                orderDetails: resObj.body
              })
            },
            TAKIE_AWAY_ORDER_FAILED
          )
        }
      )
    )
}
