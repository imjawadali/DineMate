import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  MERGE_TABLES,
  GET_RESTAURANT_DASHBOARD,
  MERGE_TABLES_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class mergeTablesEpic {
  static mergeTables = action$ =>
    action$.pipe(
      ofType(MERGE_TABLES),
      switchMap(
        async ({ payload: { selectedTables, mergeId, restaurantId } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.mergeTables,
            { selectedTables, mergeId },
            () => {
              return customisedAction(GET_RESTAURANT_DASHBOARD, { restaurantId })
            },
            MERGE_TABLES_FAILURE
          )
        }
      )
    )
}
