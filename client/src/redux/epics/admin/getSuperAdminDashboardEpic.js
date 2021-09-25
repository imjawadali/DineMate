import { switchMap, filter } from 'rxjs/operators'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  GET_SUPER_ADMIN_DASHBOARD,
  GENERATE_QRS_SUCCESS,
  ADD_RESTAURANT_SUCCESS,
  GET_SUPER_ADMIN_DASHBOARD_SUCCESS,
  GET_SUPER_ADMIN_DASHBOARD_FAILURE,
  API_ENDPOINTS,
  DELETE_QRS_SUCCESS
} from '../../../constants'

export class getSuperAdminDashboardEpic {
  static getSuperAdminDashboard = action$ =>
    action$.pipe(
      filter(({ type }) => {
        switch (type) {
          case GET_SUPER_ADMIN_DASHBOARD:
            return true;
          case GENERATE_QRS_SUCCESS:
            return true;
          case DELETE_QRS_SUCCESS:
            return true;
          case ADD_RESTAURANT_SUCCESS:
            return true;
          default:
            return false;
        }
      }),
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
