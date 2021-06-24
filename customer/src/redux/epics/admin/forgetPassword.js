import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  SET_SESSION,
  API_ENDPOINTS,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_FAILURE
} from '../../../constants'
import { RestClient } from '../../../services/network'
import { setItem } from '../../../helpers'

export class forgotPsswordEpic {
  static forgetPassword = action$ =>
    action$.pipe(
      ofType(FORGOT_PASSWORD),
      switchMap(
        async ({ payload: obj }) => {
          return generalizedEpic(
            'post',
            API_ENDPOINTS.customer.forgetPassword,
            obj,
            (resObj) => {
              setItem('customer', resObj.body)
              RestClient.setHeader('Authorization', resObj.body.id)
              return customisedAction(SET_SESSION, { customer: resObj })
            },
            FORGOT_PASSWORD_FAILURE
          )
        }
      )
    )

}
