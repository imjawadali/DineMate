import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  GET_ORDER,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class orderManagementEpic {
  static getOrder = action$ =>
    action$.pipe(
      ofType(GET_ORDER),
      switchMap(
        async ({ payload: { restaurantId,type, noToast } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.orderManagement,
            { restaurantId,type},
            (resObj) => {
              return customisedAction(GET_ORDER_SUCCESS, resObj)
            },
            GET_ORDER_FAILURE,
            noToast
          )
        }
      )
    )
}
