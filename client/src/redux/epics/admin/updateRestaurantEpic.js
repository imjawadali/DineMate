import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  UPDATE_RESTAURANT,
  UPDATE_RESTAURANT_SUCCESS,
  UPDATE_RESTAURANT_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class updateRestaurantEpic {
  static updateRestaurant = action$ =>
    action$.pipe(
      ofType(UPDATE_RESTAURANT),
      switchMap(
        async ({ payload: { updatedData, restaurantId, history }}) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.updateRestaurant,
            { updatedData, restaurantId },
            () => {
              history.push('/client/admin/restaurants')
              return customisedAction(UPDATE_RESTAURANT_SUCCESS)
            },
            UPDATE_RESTAURANT_FAILURE
          )
        }
      )
    )
}
