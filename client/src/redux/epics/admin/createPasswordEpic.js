import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  CREATE_PASSWORD,
  ADMIN_SIGN_IN,
  CREATE_PASSWORD_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class createPasswordEpic {
  static createPassword = action$ =>
    action$.pipe(
      ofType(CREATE_PASSWORD),
      switchMap(
        async ({ payload: { restaurantId, email, password } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.createPassword,
            { restaurantId, email, password },
            () => {
              return customisedAction(ADMIN_SIGN_IN, { email, password })
            },
            CREATE_PASSWORD_FAILURE
          )
        }
      )
    )
}
