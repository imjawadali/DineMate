import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  API_ENDPOINTS,
  GET_RESTAURANT_SCHEDULE,
  GET_RESTAURANT_SCHEDULE_SUCCESS,
  GET_RESTAURANT_SCHEDULE_FAILURE
} from '../../../constants'

export class getRestaurantScheduleEpic {
  static getRestaurantSchedule = action$ =>
    action$.pipe(
      ofType(GET_RESTAURANT_SCHEDULE),
      switchMap(
        async ({ payload: { restaurantId, noToast } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.getRestaurantSchedule,
            { restaurantId },
            (resObj) => {
              return customisedAction(GET_RESTAURANT_SCHEDULE_SUCCESS, resObj)
            },
            GET_RESTAURANT_SCHEDULE_FAILURE,
            noToast
          )
        }
      )
    )
}
