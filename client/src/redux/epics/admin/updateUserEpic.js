import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  UPDATE_USER,
  GET_USERS,
  UPDATE_USER_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class updateUserEpic {
  static updateUser = action$ =>
    action$.pipe(
      ofType(UPDATE_USER),
      switchMap(
        async ({ payload: { id, userUpdatedData, restaurantId } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.updateUser,
            { id, userUpdatedData },
            (resObj) => {
              return customisedAction(GET_USERS, { restaurantId, toast: { message: resObj.msg, type: 'success' } })
            },
            UPDATE_USER_FAILURE
          )
        }
      )
    )
}
