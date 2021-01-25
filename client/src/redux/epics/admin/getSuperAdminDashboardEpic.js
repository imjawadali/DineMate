import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  GET_SUPER_ADMIN_DASHBOARD,
  GET_SUPER_ADMIN_DASHBOARD_SUCCESS,
  GET_SUPER_ADMIN_DASHBOARD_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class getSuperAdminDashboardEpic {
  static getSuperAdminDashboard = action$ =>
    action$.pipe(
      ofType(GET_SUPER_ADMIN_DASHBOARD),
      switchMap(
        async () => {
          return generalizedEpic(
            'get', 
            API_ENDPOINTS.admin.getSuperAdminDashboard,
            null,
            (resObj) => {
              return customisedAction(GET_SUPER_ADMIN_DASHBOARD_SUCCESS, resObj)
            },
            GET_SUPER_ADMIN_DASHBOARD_FAILURE
          )
        }
      )
    )
}
