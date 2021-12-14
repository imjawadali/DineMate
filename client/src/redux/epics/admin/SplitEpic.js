import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  SPLIT_ITEM,
  SPLIT_ITEM_SUCCESS,
  SPLIT_ITEM_FAILURE,
  API_ENDPOINTS,
  SPLIT_ORDER,
  SPLIT_ORDER_SUCCESS,
  SPLIT_ORDER_FAILURE,
  SPLIT_TABLE,
  SPLIT_TABLE_SUCCESS,
  SPLIT_TABLE_FAILURE
} from '../../../constants'

export class SplitEpic {
  static splitItem = action$ =>
    action$.pipe(
      ofType(SPLIT_ITEM),
      switchMap(
        async ({ payload, extras: { history } }) => {
          return generalizedEpic(
            'post',
            API_ENDPOINTS.admin.itemSplit,
            payload,
            (resObj) => {
              if (history) history.goBack()
              return customisedAction(SPLIT_ITEM_SUCCESS, { message: resObj.msg, type: 'success' })
            },
            SPLIT_ITEM_FAILURE
          )
        }
      )
    )

  static splitOrder = action$ =>
    action$.pipe(
      ofType(SPLIT_ORDER),
      switchMap(
        async ({ payload, extras: { history } }) => {
          return generalizedEpic(
            'post',
            API_ENDPOINTS.admin.orderSplit,
            payload,
            (resObj) => {
              if (history) history.goBack()
              return customisedAction(SPLIT_ORDER_SUCCESS, { message: resObj.msg, type: 'success' })
            },
            SPLIT_ORDER_FAILURE
          )
        }
      )
    )

  static splitTable = action$ =>
    action$.pipe(
      ofType(SPLIT_TABLE),
      switchMap(
        async ({ payload, extras: { history } }) => {
          return generalizedEpic(
            'post',
            API_ENDPOINTS.admin.tableSplit,
            payload,
            (resObj) => {
              if (history) history.goBack()
              return customisedAction(SPLIT_TABLE_SUCCESS, { message: resObj.msg, type: 'success' })
            },
            SPLIT_TABLE_FAILURE
          )
        }
      )
    )
}
