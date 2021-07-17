import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  GET_RESTAURANT_SETTINGS,
  GET_RESTAURANT_SETTINGS_SUCCESS,
  GET_RESTAURANT_SETTINGS_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class getRestaurantSettingsEpic {
  static getRestaurantSettings = action$ =>
    action$.pipe(
      ofType(GET_RESTAURANT_SETTINGS),
      switchMap(
        async ({ payload: { restaurantId, noToast } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.getRestaurantSettings,
            { restaurantId },
            (resObj) => {
              return customisedAction(GET_RESTAURANT_SETTINGS_SUCCESS, resObj)
            },
            GET_RESTAURANT_SETTINGS_FAILURE,
            noToast
          )
        }
      )
    )
}
