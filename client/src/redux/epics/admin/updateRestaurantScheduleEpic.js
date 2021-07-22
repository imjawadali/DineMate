import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  UPDATE_RESTAURANT_SCHEDULE,
  GET_RESTAURANT_SCHEDULE,
  UPDATE_RESTAURANT_SCHEDULE_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class updateRestaurantScheduleEpic {
  static updateRestaurantSchedule = action$ =>
    action$.pipe(
      ofType(UPDATE_RESTAURANT_SCHEDULE),
      switchMap(
        async ({ payload: { schedule, restaurantId } }) => {
          return generalizedEpic(
            'post',
            API_ENDPOINTS.admin.updateRestaurantSchedule,
            { schedule, restaurantId },
            (resObj) => {
              return customisedAction(GET_RESTAURANT_SCHEDULE, {
                restaurantId,
                toast: { message: resObj.msg, type: 'success' }
              })
            },
            UPDATE_RESTAURANT_SCHEDULE_FAILURE
          )
        }
      )
    )
}
