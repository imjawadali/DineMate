import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  ADD_USER,
  GET_USERS,
  ADD_USER_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class addUserEpic {
  static addUser = action$ =>
    action$.pipe(
      ofType(ADD_USER),
      switchMap(
        async ({ payload, payload: { restaurantId } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.addUser,
            payload,
            () => {
              return customisedAction(GET_USERS, { restaurantId })
            },
            ADD_USER_FAILURE
          )
        }
      )
    )
}
