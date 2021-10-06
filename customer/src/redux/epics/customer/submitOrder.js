import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  API_ENDPOINTS,
  SUBMIT_ORDER_ITEM,
  SUBMIT_ORDER_ITEM_FAILED,
  SET_ORDER_ITEM_SUCCESS
} from '../../../constants'
import { removeItem, setItem } from '../../../helpers'

export class submitOrderEpic {
  static submitOrder = action$ =>
    action$.pipe(
      ofType(SUBMIT_ORDER_ITEM),
      switchMap(
        async ({ payload: obj }) => {
          return generalizedEpic(
            'post',
            API_ENDPOINTS.customer.submitOrder,
            obj,
            (resObj) => {
              removeItem('cartMenu')
              return customisedAction(SET_ORDER_ITEM_SUCCESS, { cartMenu:[] })

            },
            SUBMIT_ORDER_ITEM_FAILED
          )
        }
      )
    )
}
