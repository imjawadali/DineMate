import { switchMap, filter } from 'rxjs/operators'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  API_ENDPOINTS,
  GET_TAKE_ORDER_ITEMS,
  GET_TAKE_ORDER_ITEMS_SUCCESS,
  GET_TAKE_ORDER_ITEMS_FAILURE,
  APPLY_REWARD_POINTS_SUCCESS
} from '../../../constants'

export class getTakeAwayOrderItemEpic {
  static getTakeAwayOrder = action$ =>
    action$.pipe(
      filter(({ type }) => {
        switch (type) {
          case GET_TAKE_ORDER_ITEMS:
            return true;
          case APPLY_REWARD_POINTS_SUCCESS:
            return true;
          default:
            return false;
        }
      }),
      switchMap(
        async ({ payload: { restaurantId, orderNumber }}) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.customer.getOrderItem,
            { restaurantId, orderNumber },
            (resObj) => {
              return customisedAction(GET_TAKE_ORDER_ITEMS_SUCCESS, { OrderItems: resObj.body, toast: { message: resObj.message, type: 'success' }})
            },
            GET_TAKE_ORDER_ITEMS_FAILURE
          )
        }
      )
    )
}
