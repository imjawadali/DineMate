import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import {
  UPLOAD_TO_S3,
  UPLOAD_TO_S3_SUCCESS,
  UPLOAD_TO_S3_FAILURE,
  API_ENDPOINTS,
  BASE_URL,
  ADMIN_LOGOUT,
  SESSION_CHECK_DONE,
  UPDATE_RESTAURANT_SETTINGS
} from '../../../constants'

import store from '../../store'
import { removeItem } from '../../../helpers'

export class uploadToS3Epic {
  static uploadToS3 = action$ =>
    action$.pipe(
      ofType(UPLOAD_TO_S3),
      switchMap(
        async ({ payload: { file, restaurantId, updateRestaurantSettings }}) => {
          try {
            const response = await fetch(BASE_URL+API_ENDPOINTS.admin.uploadToS3, {
              method: 'POST',
              headers: new Headers({ 'Authorization': store.getState().sessionReducer.admin.id }),
              body: file
            })
            const data = await response.json()
            const { status } = response
            if (status && status === 200) {
              if (updateRestaurantSettings)
                return customisedAction(UPDATE_RESTAURANT_SETTINGS, { restaurantId, updatedData: { imageUrl: data.imageUrl }})
              return customisedAction(UPLOAD_TO_S3_SUCCESS, { imageUrl: data.imageUrl, toast: { message: data.msg, type: 'success' } })
            }
            if (status && (status === 401 || status === 422 || status === 503)) {
              if (status === 401) {
                removeItem('admin')
                store.dispatch(customisedAction(ADMIN_LOGOUT))
                store.dispatch(customisedAction(SESSION_CHECK_DONE))
              }
              return customisedAction(UPLOAD_TO_S3_FAILURE, { message: data.msg, type: 'error' })
            }
            return customisedAction(UPLOAD_TO_S3_FAILURE, { message: `Unknown Error at ${UPLOAD_TO_S3}!`, type: 'error' })
          } catch (error) {
              console.log(`${UPLOAD_TO_S3} Unknown Error`, error)
              return customisedAction(UPLOAD_TO_S3_FAILURE, { message: 'Failed to upload file', type: 'error' })
          }
        }
      )
    )
}
