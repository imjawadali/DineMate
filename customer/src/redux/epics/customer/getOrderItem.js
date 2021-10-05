import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  SET_ORDER,
  API_ENDPOINTS,
  SUBMIT_ORDER_ITEM,
  SUBMIT_ORDER_ITEM_FAILED,
  GET_ORDER_ITEMS,
  SET_ORDER_ITEM,
  GET_ORDER_ITEMS_SUCCESS,
  GET_ORDER_ITEMS_FAILURE
} from '../../../constants'
import { removeItem, setItem } from '../../../helpers'

export class getOrderItemEpic {
  static getOrder = action$ =>
    action$.pipe(
      ofType(GET_ORDER_ITEMS),
      switchMap(
        async ({ payload: obj}) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.customer.getOrderItem,
            obj,
            (resObj) => {
              return customisedAction(GET_ORDER_ITEMS_SUCCESS, { OrderItems: resObj.body, toast: { message: resObj.message, type: 'success' }})
            },
            GET_ORDER_ITEMS_FAILURE
          )
        }
      )
    )
}
