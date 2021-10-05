import { switchMap } from 'rxjs/operators'
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
  UPDATE_RPOFILE_FAILURE
} from '../../../constants'
import { RestClient } from '../../../services/network'
import { getItem, setItem } from '../../../helpers'

export class loginEpic {
  static login = action$ =>
    action$.pipe(
      ofType(SIGN_IN),
      switchMap(
        async ({ payload: { email, password, fcmToken } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.customer.login,
            { email, password, fcmToken },
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
    
    static getProfile = action$ =>
    action$.pipe(
      ofType(GET_RPOFILE),
      switchMap(
        async () => {
          return generalizedEpic(
            'get', 
            API_ENDPOINTS.customer.getProfile,
            null,
            (resObj) => {
              let id = getItem('customer').id
              RestClient.setHeader('Authorization', id)
              return customisedAction(GET_RPOFILE_SUCCESS,resObj.body )
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
        async (obj) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.customer.updateProfile,
            obj.payload,
            (resObj) => {
              let id = getItem('customer').id
              RestClient.setHeader('Authorization', id)
              // dispatch(customisedAction(GET_RPOFILE))
              return customisedAction(UPDATE_RPOFILE_SUCCESS,{data: resObj.body, toast: { message: resObj.message, type: 'success' }} )
              // return customisedAction(UPDATE_RPOFILE_SUCCESS,resObj.body )
            },
            UPDATE_RPOFILE_FAILURE
          )
        }
      )
    )
}
