import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  GET_ORDER_ITEM_DETAILS,
  GET_ORDER_ITEM_DETAILS_SUCCESS,
  GET_ORDER_ITEM_DETAILS_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class getOrderItemDetailsEpic {
  static getOrderItemDetails = action$ =>
    action$.pipe(
      ofType(GET_ORDER_ITEM_DETAILS),
      switchMap(
        async ({ payload: { id } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.getOrderItemDetails,
            { id },
            (resObj) => {
              return customisedAction(GET_ORDER_ITEM_DETAILS_SUCCESS, resObj)
            },
            GET_ORDER_ITEM_DETAILS_FAILURE
          )
        }
      )
    )
}
