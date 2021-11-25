import { switchMap, filter } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  SIGN_IN,
  SIGN_IN_FAILURE,
  SET_SESSION,
  API_ENDPOINTS,
  GET_RPOFILE,
  GET_RPOFILE_FAILURE,
  GET_RPOFILE_SUCCESS,
  UPDATE_RPOFILE,
  UPDATE_RPOFILE_SUCCESS,
  UPDATE_RPOFILE_FAILURE,
  SET_FCM_TOKEN,
  SET_FCM_TOKEN_SUCCESS,
  SET_FCM_TOKEN_FAILURE,
  APPLY_REWARD_POINTS_SUCCESS,
  ORDER_CLOSED_BY_ADMIN,
  LOGOUT,
  SESSION_CHECK_DONE
} from '../../../constants'
import { RestClient } from '../../../services/network'
import { getItem, setItem } from '../../../helpers'

export class loginEpic {
  static login = action$ =>
    action$.pipe(
      ofType(SIGN_IN),
      switchMap(
        async ({ payload: { email, password }, extras: { history, redirect } }) => {
          return generalizedEpic(
            'post',
            API_ENDPOINTS.customer.login,
            { email, password },
            (resObj) => {
              setItem('customer', resObj.body)
              RestClient.setHeader('Authorization', resObj.body.id)
              if (history && redirect) history.push(redirect)
              else if (history) history.push('/')
              return customisedAction(SET_SESSION, { customer: resObj.body })
            },
            SIGN_IN_FAILURE
          )
        }
      )
    )

  static getProfile = action$ =>
    action$.pipe(
      filter(({ type }) => {
        switch (type) {
          case GET_RPOFILE:
            return true;
          case APPLY_REWARD_POINTS_SUCCESS:
            return true;
          case ORDER_CLOSED_BY_ADMIN:
            return true;
          default:
            return false;
        }
      }),
      switchMap(
        async ({ payload, extras: { history, redirect } }) => {
          return generalizedEpic(
            'post',
            API_ENDPOINTS.customer.getProfile,
            { ...payload, history, redirect },
            (resObj) => {
              setItem('customer', resObj.body)
              RestClient.setHeader('Authorization', resObj.body.id)
              if (history && redirect) history.push(redirect)
              else if (history) history.push('/')
              return customisedAction(GET_RPOFILE_SUCCESS, resObj.body)
            },
            GET_RPOFILE_FAILURE
          )
        }
      )
    )

  static updateProfile = action$ =>
    action$.pipe(
      ofType(UPDATE_RPOFILE),
      switchMap(
        async ({ payload }) => {
          return generalizedEpic(
            'post',
            API_ENDPOINTS.customer.updateProfile,
            payload,
            (resObj) => {
              let id = getItem('customer').id
              RestClient.setHeader('Authorization', id)
              return customisedAction(UPDATE_RPOFILE_SUCCESS, { data: resObj.body, toast: { message: resObj.message, type: 'success' } })
            },
            UPDATE_RPOFILE_FAILURE
          )
        }
      )
    )

  static setFcmToken = action$ =>
    action$.pipe(
      ofType(SET_FCM_TOKEN),
      switchMap(
        async ({ payload: { fcmToken } }) => {
          return generalizedEpic(
            'post',
            API_ENDPOINTS.customer.setFcmToken,
            { fcmToken },
            (resObj) => {
              return customisedAction(SET_FCM_TOKEN_SUCCESS, { message: resObj.message, type: 'success' })
            },
            SET_FCM_TOKEN_FAILURE
          )
        }
      )
    )

  static logout = action$ =>
    action$.pipe(
      ofType(LOGOUT),
      switchMap(
        async () => {
          RestClient.setHeader('Authorization', '')
          return customisedAction(SESSION_CHECK_DONE)
        }
      )
    )
}
