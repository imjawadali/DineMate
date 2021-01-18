import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class forgotPasswordEpic {
  static forgotPassword = action$ =>
    action$.pipe(
      ofType(FORGOT_PASSWORD),
      switchMap(
        async ({ payload }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.forgotPassword,
            payload,
            (resObj) => {
              return customisedAction(FORGOT_PASSWORD_SUCCESS, { message: resObj.msg, type: 'success' })
            },
            FORGOT_PASSWORD_FAILURE
          )
        }
      )
    )
}
