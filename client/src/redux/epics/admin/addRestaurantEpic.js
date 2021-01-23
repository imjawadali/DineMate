import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  ADD_RESTAURANT,
  ADD_RESTAURANT_SUCCESS,
  ADD_RESTAURANT_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class addRestaurantEpic {
  static addRestaurant = action$ =>
    action$.pipe(
      ofType(ADD_RESTAURANT),
      switchMap(
        async ({ payload, extras: { history } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.addRestuarant,
            payload,
            () => {
              history.push('/admin/restaurants')
              return customisedAction(ADD_RESTAURANT_SUCCESS)
            },
            ADD_RESTAURANT_FAILURE
          )
        }
      )
    )
}
