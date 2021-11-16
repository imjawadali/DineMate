import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  SET_SESSION,
  API_ENDPOINTS,
  SIGN_UP,
  SIGN_UP_FAILURE,
  REGISTER_RESTURENT,
  REGISTER_RESTURENT_SUCESS
} from '../../../constants'
import { RestClient } from '../../../services/network'
import { setItem } from '../../../helpers'

export class signUpEpic {
  static signUp = action$ =>
    action$.pipe(
      ofType(SIGN_UP),
      switchMap(
        async ({ payload, extras: { history, redirect } }) => {
          return generalizedEpic(
            'post',
            API_ENDPOINTS.customer.signUp,
            payload,
            (resObj) => {
              setItem('customer', resObj.body)
              RestClient.setHeader('Authorization', resObj.body.id)
              if (history && redirect) history.push(redirect)
              else if (history) history.push('/')
              return customisedAction(SET_SESSION, { customer: resObj.body })
            },
            SIGN_UP_FAILURE
          )
        }
      )
    )
  static registerRestuarant = action$ =>
    action$.pipe(
      ofType(REGISTER_RESTURENT),
      switchMap(
        async ({ payload: { data, reset }}) => {
          return generalizedEpic(
            'post',
            API_ENDPOINTS.customer.registerRestuarant,
            data,
            (resObj) => {
              reset()
              return customisedAction(REGISTER_RESTURENT_SUCESS, { signUp: resObj })
            },
            SIGN_UP_FAILURE
          )
        }
      )
    )
}
