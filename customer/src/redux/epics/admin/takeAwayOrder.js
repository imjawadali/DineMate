import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  SET_ORDER,
  API_ENDPOINTS,
  SUBMIT_ORDER_ITEM,
  SUBMIT_ORDER_ITEM_FAILED,
  SET_ORDER_ITEM_SUCCESS,
  TAKIE_AWAY_ORDER,
  TAKIE_AWAY_ORDER_FAILED
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
              setItem('orderDetails',resObj.body)
              return customisedAction(SET_ORDER_ITEM_SUCCESS, obj)

            },
            TAKIE_AWAY_ORDER_FAILED
          )
        }
      )
    )
}
