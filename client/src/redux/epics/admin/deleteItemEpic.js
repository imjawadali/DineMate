import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  DELETE_ITEM,
  GET_ORDER_DETAILS,
  DELETE_ITEM_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class deleteItemEpic {
  static deleteItem = action$ =>
    action$.pipe(
      ofType(DELETE_ITEM),
      switchMap(
        async ({ payload: { id, restaurantId, orderNumber }}) => {
          return generalizedEpic(
            'post',
            API_ENDPOINTS.admin.deleteItem,
            { id },
            (resObj) => {
              return customisedAction(GET_ORDER_DETAILS, {
                restaurantId,
                orderNumber,
                toast: { message: resObj.msg, type: 'success' }
              })
            },
            DELETE_ITEM_FAILURE
          )
        }
      )
    )
}
