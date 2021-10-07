import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  SET_SESSION,
  API_ENDPOINTS,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_FAILURE,
  SET_NEW_PASSWORD,
  SET_NEW_PASSWORD_FAILURE,
  FORGOT_PASSWORD_SUCCESS,
  SET_NEW_PASSWORD_SUCCESS
} from '../../../constants'

export class forgotPsswordEpic {
  static forgetPassword = action$ =>
    action$.pipe(
      ofType(FORGOT_PASSWORD),
      switchMap(
        async ({ payload }) => {
          return generalizedEpic(
            'post',
            API_ENDPOINTS.customer.forgetPassword,
            payload,
            (resObj) => {
              return customisedAction(FORGOT_PASSWORD_SUCCESS, { message: resObj.message, type: 'success' })
            },
            FORGOT_PASSWORD_FAILURE
          )
        }
      )
    )


    static setNewPassword = action$ =>
    action$.pipe(
      ofType(SET_NEW_PASSWORD),
      switchMap(
        async ({ payload, extras: { history } }) => {
          return generalizedEpic(
            'post',
            API_ENDPOINTS.customer.setNewPassword,
            payload,
            (resObj) => {
              history.push('/customer/signin')
              return customisedAction(SET_NEW_PASSWORD_SUCCESS, { message: resObj.message, type: 'success' })
            },
            SET_NEW_PASSWORD_FAILURE
          )
        }
      )
    )

}
