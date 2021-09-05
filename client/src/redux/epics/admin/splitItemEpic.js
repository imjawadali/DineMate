import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  SPLIT_ITEM,
  SPLIT_ITEM_SUCCESS,
  SPLIT_ITEM_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class splitItemEpic {
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
}
