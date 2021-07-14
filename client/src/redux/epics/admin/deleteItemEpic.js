import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  DELETE_ITEM,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_SUCCESS_NO_MORE_DETAILS,
  DELETE_ITEM_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class deleteItemEpic {
  static deleteItem = action$ =>
    action$.pipe(
      ofType(DELETE_ITEM),
      switchMap(
        async ({ payload: { id, restaurantId, orderNumber }, extras: { history } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.deleteItem,
            { id },
            (resObj) => {
              if (history) {
                history.goBack()
                return customisedAction(DELETE_ITEM_SUCCESS_NO_MORE_DETAILS, { message: resObj.msg, type: 'success' })
              } else
                return customisedAction(DELETE_ITEM_SUCCESS, { restaurantId, orderNumber, toast: { message: resObj.msg, type: 'success' }})
            },
            DELETE_ITEM_FAILURE
          )
        }
      )
    )
}
