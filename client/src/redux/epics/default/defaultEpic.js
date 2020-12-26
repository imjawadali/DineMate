import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import {
  ADMIN_SIGN_IN,
  ADMIN_SIGN_IN_FAILURE,
  SET_SESSION,
  API_ENDPOINTS
} from '../../../constants'
import { RestClient } from '../../../services/network'

export class defaultEpic {
  static default = action$ =>
    action$.pipe(
      ofType(ADMIN_SIGN_IN),
      switchMap(
        async ({ payload: { email, password } }) => {
          try {
            const response = await RestClient.post(API_ENDPOINTS.admin.login, {
              email,
              password,
            });
            const { status, data: resObj, problem } = response;
            if (status && status === 200) {
              console.log(resObj)
              return customisedAction(SET_SESSION, { admin: null });
            }
            if (status && (status === 401 || status === 422 || status === 503)) {
              return customisedAction(ADMIN_SIGN_IN_FAILURE, { message: resObj.msg, type: 'error' })
            }
            if (problem && problem === 'NETWORK_ERROR') {
              return customisedAction(ADMIN_SIGN_IN_FAILURE, { message: 'Network Error while Fetching BillingInfo!', type: 'error' })
            }
            return customisedAction(ADMIN_SIGN_IN_FAILURE, { message: 'Unknown Error while Fetching BillingInfo!', type: 'error' })
          } catch (error) {
            console.log('ADMIN_SIGN_IN Unknown Error', error)
            return customisedAction(ADMIN_SIGN_IN_FAILURE, { message: error.message, type: 'error' })
          }
        }
      )
    );
}