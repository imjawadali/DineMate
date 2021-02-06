import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  DELETE_USER,
  GET_USERS,
  DELETE_USER_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class deleteUserEpic {
  static deleteUser = action$ =>
    action$.pipe(
      ofType(DELETE_USER),
      switchMap(
        async ({ payload: { id, restaurantId } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.deleteUser,
            { id },
            () => {
              return customisedAction(GET_USERS, { restaurantId })
            },
            DELETE_USER_FAILURE
          )
        }
      )
    )
}
