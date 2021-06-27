import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  GET_STAFF_ASSIGNED_TABLES,
  GET_STAFF_ASSIGNED_TABLES_SUCCESS,
  GET_STAFF_ASSIGNED_TABLES_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class getStaffAssignedTablesEpic {
  static getStaffAssignedTables = action$ =>
    action$.pipe(
      ofType(GET_STAFF_ASSIGNED_TABLES),
      switchMap(
        async ({ payload: { restaurantId, noToast } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.getStaffAssignedTables,
            { restaurantId },
            (resObj) => {
              return customisedAction(GET_STAFF_ASSIGNED_TABLES_SUCCESS, resObj)
            },
            GET_STAFF_ASSIGNED_TABLES_FAILURE,
            noToast
          )
        }
      )
    )
}
