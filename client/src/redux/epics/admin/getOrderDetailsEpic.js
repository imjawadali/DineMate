import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  GET_ORDER_DETAILS,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class getOrderDetailsEpic {
  static getOrderDetails = action$ =>
    action$.pipe(
      ofType(GET_ORDER_DETAILS),
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
