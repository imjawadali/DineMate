import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  UN_MERGE_TABLES,
  GET_RESTAURANT_DASHBOARD,
  UN_MERGE_TABLES_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class unMergeTablesEpic {
  static unMergeTables = action$ =>
    action$.pipe(
      ofType(UN_MERGE_TABLES),
      switchMap(
        async ({ payload: { mergeId, restaurantId } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.unMergeTables,
            { mergeId },
            () => {
              return customisedAction(GET_RESTAURANT_DASHBOARD, { restaurantId })
            },
            UN_MERGE_TABLES_FAILURE
          )
        }
      )
    )
}
