import { switchMap, filter } from 'rxjs/operators'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  GET_KITCHEN_DASHBOARD,
  GET_KITCHEN_DASHBOARD_SUCCESS,
  GET_KITCHEN_DASHBOARD_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class getKitchenDashboardEpic {
  static getKitchenDashboard = action$ =>
    action$.pipe(
      filter(({ type }) => {
        switch (type) {
          case GET_KITCHEN_DASHBOARD:
            return true;
          default:
            return false;
        }
      }),
      switchMap(
        async ({ payload: { restaurantId, history } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.getKitchenDashboard,
            { restaurantId },
            (resObj) => {
              if (history)
                history.push('/client/admin/dashboard/restaurantAdmin')
              return customisedAction(GET_KITCHEN_DASHBOARD_SUCCESS, resObj)
            },
            GET_KITCHEN_DASHBOARD_FAILURE
          )
        }
      )
    )
}
