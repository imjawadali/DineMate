import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../actions'
import {
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  API_ENDPOINTS,
} from '../../constants'
import { RestClient } from '../../services/network'

export class defaultEpic {
  static default = action$ =>
    action$.pipe(
      ofType(SIGN_IN),
      switchMap(
        async ({ payload: { email, password } }) => {
          try {
            const response = await RestClient.post(API_ENDPOINTS.signIn, {
              email,
              password,
            });
            const { status, data: resObj, problem } = response;
            if (status && status === 200) {
              const { token } = resObj;
              return customisedAction(SIGN_IN_SUCCESS, { token, failure_action: SIGN_IN_FAILURE });
            }
            if (status && (status === 401 || status === 422 || status === 503)) {
              return customisedAction(SIGN_IN_FAILURE);
            }
            if (problem && problem === 'NETWORK_ERROR') {
              return customisedAction(SIGN_IN_FAILURE);
            }
            return customisedAction(SIGN_IN_FAILURE);
          } catch (error) {
            console.log('Default Unknown Error', error)
            return customisedAction(SIGN_IN_FAILURE);
          }
        }
      )
    );
}
