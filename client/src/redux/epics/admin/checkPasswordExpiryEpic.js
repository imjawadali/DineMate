import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  CHECK_PASSWORD_EXPIRY,
  CHECK_PASSWORD_EXPIRY_SUCCESS,
  CHECK_PASSWORD_EXPIRY_FAILURE,
  API_ENDPOINTS,
  ADMIN_LOGOUT,
  SESSION_CHECK_DONE
} from '../../../constants'
import { removeItem } from '../../../helpers'
import store from '../../store'

export class checkPasswordExpiryEpic {
  static checkPasswordExpiry = action$ =>
    action$.pipe(
      ofType(CHECK_PASSWORD_EXPIRY),
      switchMap(
        async ({ payload: { noToast } }) => {
          return generalizedEpic(
            'get', 
            API_ENDPOINTS.admin.checkPasswordExpiry,
            null,
            (resObj) => {
              const { days } = resObj
              let message
              if (days && days >= 45) {
                if (days <= 60) message = `You have not updated your password in past ${days} days`
                else {
                  message = 'Update your password'
                  removeItem('admin')
                  store.dispatch(customisedAction(ADMIN_LOGOUT))
                  store.dispatch(customisedAction(SESSION_CHECK_DONE))
                }
              }
              return customisedAction(CHECK_PASSWORD_EXPIRY_SUCCESS, message ? {
                message,
                type: days <= 60 ? 'warning' : 'error'
              } : null)
            },
            CHECK_PASSWORD_EXPIRY_FAILURE,
            noToast
          )
        }
      )
    )
}
