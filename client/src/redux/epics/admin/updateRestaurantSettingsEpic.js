import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  UPDATE_RESTAURANT_SETTINGS,
  GET_RESTAURANT_SETTINGS,
  UPDATE_RESTAURANT_SETTINGS_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class updateRestaurantSettingsEpic {
  static updateRestaurantSettings = action$ =>
    action$.pipe(
      ofType(UPDATE_RESTAURANT_SETTINGS),
      switchMap(
        async ({ payload: { restaurantId, updatedData } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.updateRestaurantSettings,
            { restaurantId, updatedData },
            (resObj) => {
              return customisedAction(GET_RESTAURANT_SETTINGS, { restaurantId, toast: { message: resObj.msg, type: 'success' }})
            },
            UPDATE_RESTAURANT_SETTINGS_FAILURE
          )
        }
      )
    )
}
