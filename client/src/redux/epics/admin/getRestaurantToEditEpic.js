import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  GET_RESTAURANT_TO_EDIT,
  GET_RESTAURANT_TO_EDIT_SUCCESS,
  GET_RESTAURANT_TO_EDIT_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class getRestaurantToEditEpic {
  static getRestaurantToEdit = action$ =>
    action$.pipe(
      ofType(GET_RESTAURANT_TO_EDIT),
      switchMap(
        async ({ payload: { restaurantId, history } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.getRestaurantToEdit,
            { restaurantId },
            (resObj) => {
              setTimeout(() => 
                history.push('/client/admin/editRestaurant'),
              100)
              return customisedAction(GET_RESTAURANT_TO_EDIT_SUCCESS, resObj)
            },
            GET_RESTAURANT_TO_EDIT_FAILURE
          )
        }
      )
    )
}
