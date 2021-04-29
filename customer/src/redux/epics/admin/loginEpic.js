import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  SIGN_IN,
  SIGN_IN_FAILURE,
  SET_SESSION,
  API_ENDPOINTS
} from '../../../constants'
import { RestClient } from '../../../services/network'
import { setItem } from '../../../helpers'

export class loginEpic {
  static login = action$ =>
    action$.pipe(
      ofType(SIGN_IN),
      switchMap(
        async ({ payload: { email, password } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.customer.login,
            { email, password },
            (resObj) => {
              setItem('customer', resObj.body)
              RestClient.setHeader('Authorization', resObj.body.id)
              return customisedAction(SET_SESSION, { customer: resObj.body })
            },
            SIGN_IN_FAILURE
          )
        }
      )
    )
}
