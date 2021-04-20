import { switchMap, filter } from 'rxjs/operators'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  GET_RESTAURANT_DASHBOARD,
  GET_RESTAURANT_DASHBOARD_SUCCESS,
  GET_RESTAURANT_DASHBOARD_FAILURE,
  API_ENDPOINTS,
  CLOSE_ORDER_SUCCESS
} from '../../../constants'

export class getRestaurantDashboardEpic {
  static getRestaurantDashboard = action$ =>
    action$.pipe(
      filter(({ type }) => {
        switch (type) {
          case GET_RESTAURANT_DASHBOARD:
            return true;
          case CLOSE_ORDER_SUCCESS:
            return true;
          default:
            return false;
        }
      }),
      switchMap(
        async ({ payload: { restaurantId, history } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.getRestaurantDashboard,
            { restaurantId },
            (resObj) => {
              if (history)
                history.push('/client/admin/dashboard/restaurantAdmin')
              return customisedAction(GET_RESTAURANT_DASHBOARD_SUCCESS, resObj)
            },
            GET_RESTAURANT_DASHBOARD_FAILURE
          )
        }
      )
    )
}
