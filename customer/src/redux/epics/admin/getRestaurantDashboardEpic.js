import { switchMap, filter } from 'rxjs/operators'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  GET_RESTAURANT_DASHBOARD,
  GET_RESTAURANT_DASHBOARD_SUCCESS,
  GET_RESTAURANT_DASHBOARD_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class getRestaurantDashboardEpic {
  static getRestaurantDashboard = action$ =>
    action$.pipe(
      filter(({ type }) => {
        switch (type) {
          case GET_RESTAURANT_DASHBOARD:
            return true;
          default:
            return false;
        }
      }),
      switchMap(
        async ({ payload: { restaurantId } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.getRestaurantDashboard,
            { restaurantId },
            (resObj) => {
              return customisedAction(GET_RESTAURANT_DASHBOARD_SUCCESS, resObj)
            },
            GET_RESTAURANT_DASHBOARD_FAILURE
          )
        }
      )
    )
}
