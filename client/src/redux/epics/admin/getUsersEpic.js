import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class getUsersEpic {
  static getUsers = action$ =>
    action$.pipe(
      ofType(GET_USERS),
      switchMap(
        async ({ payload: { restaurantId, noToast } }) => {
          return generalizedEpic(
            restaurantId ? 'post' : 'get', 
            restaurantId ? API_ENDPOINTS.admin.getRestaurantUsers : API_ENDPOINTS.admin.getAllUsers,
            { restaurantId },
            (resObj) => {
              return customisedAction(GET_USERS_SUCCESS, resObj)
            },
            GET_USERS_FAILURE,
            noToast
          )
        }
      )
    )
}
