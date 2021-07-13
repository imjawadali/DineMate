import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  SET_SESSION,
  API_ENDPOINTS,
  SIGN_UP,
  SIGN_UP_FAILURE,
  SIGN_UP_SUCESS
} from '../../../constants'
import { RestClient } from '../../../services/network'
import { setItem } from '../../../helpers'

export class signUpEpic {
  static signUp = action$ =>
    action$.pipe(
      ofType(SIGN_UP),
      switchMap(
        async ({ payload: obj }) => {
          return generalizedEpic(
            'post',
            API_ENDPOINTS.customer.signUp,
            obj,
            (resObj) => {
              // setItem('customer', resObj.body)
              // RestClient.setHeader('Authorization', resObj.body.id)
              return customisedAction(SIGN_UP_SUCESS, { signUp: resObj })
            },
            SIGN_UP_FAILURE
          )
        }
      )
    )

}
