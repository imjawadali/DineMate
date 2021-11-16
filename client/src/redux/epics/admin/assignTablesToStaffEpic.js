import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  ASSIGN_TABLES_TO_STAFF,
  GET_STAFF_ASSIGNED_TABLES,
  ASSIGN_TABLES_TO_STAFF_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class assignTablesToStaffEpic {
  static assignTablesToStaff = action$ =>
    action$.pipe(
      ofType(ASSIGN_TABLES_TO_STAFF),
      switchMap(
        async ({ payload: { selectedStaff, assignedTables, restaurantId } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.assignTablesToStaff,
            { selectedStaff, assignedTables, restaurantId },
            (resObj) => {
              return customisedAction(GET_STAFF_ASSIGNED_TABLES, { restaurantId, toast: { message: resObj.msg, type: 'success' }})
            },
            ASSIGN_TABLES_TO_STAFF_FAILURE
          )
        }
      )
    )
}
