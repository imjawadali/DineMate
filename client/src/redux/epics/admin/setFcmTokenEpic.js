import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  SET_FCM_TOKEN,
  SET_FCM_TOKEN_SUCCESS,
  SET_FCM_TOKEN_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class setFcmTokenEpic {
  static setFcmToken = action$ =>
    action$.pipe(
      ofType(SET_FCM_TOKEN),
      switchMap(
        async ({ payload: { fcmToken } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.setFcmToken,
            { fcmToken },
            () => {
              return customisedAction(SET_FCM_TOKEN_SUCCESS)
            },
            SET_FCM_TOKEN_FAILURE
          )
        }
      )
    )
}
