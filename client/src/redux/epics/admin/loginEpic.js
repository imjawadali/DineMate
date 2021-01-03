import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  ADMIN_SIGN_IN,
  ADMIN_SIGN_IN_FAILURE,
  SET_SESSION,
  API_ENDPOINTS
} from '../../../constants'
import { RestClient } from '../../../services/network'
import { setItem } from '../../../helpers'

export class loginEpic {
  static login = action$ =>
    action$.pipe(
      ofType(ADMIN_SIGN_IN),
      switchMap(
        async ({ payload: { email, password } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.login,
            { email, password },
            (resObj) => {
              setItem('admin', resObj)
              RestClient.setHeader('Authorization', resObj.id)
              return customisedAction(SET_SESSION, { admin: resObj })
            },
            ADMIN_SIGN_IN_FAILURE
          )
        }
      )
    )
}
