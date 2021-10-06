import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import {
  GET_ORDER_DETAIL,
  GET_ORDER_DETAIL_SUCCESS
} from '../../../constants'
import { getItem } from '../../../helpers'

export class OrderDetailEpic {
  static OrderDetail = action$ =>
    action$.pipe(
      ofType(GET_ORDER_DETAIL),
      switchMap(
        async () => {
          let orderDetail = getItem('orderDetails')
          return customisedAction(GET_ORDER_DETAIL_SUCCESS, { orderDetails: orderDetail })
        }
      )
    )
}
