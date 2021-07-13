import { switchMap, filter } from 'rxjs/operators'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  GET_ORDER_DETAILS,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_FAILURE,
  API_ENDPOINTS,
  CLOSE_ORDER_SUCCESS
} from '../../../constants'

export class getOrderDetailsEpic {
  static getOrderDetails = action$ =>
    action$.pipe(
      filter(({ type }) => {
        switch (type) {
          case GET_ORDER_DETAILS:
            return true;
          case CLOSE_ORDER_SUCCESS:
            return true;
          default:
            return false;
        }
      }),
      switchMap(
        async ({ payload: { restaurantId, orderNumber } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.getOrderDetails,
            { restaurantId, orderNumber },
            (resObj) => {
              return customisedAction(GET_ORDER_DETAILS_SUCCESS, resObj)
            },
            GET_ORDER_DETAILS_FAILURE
          )
        }
      )
    )
}
