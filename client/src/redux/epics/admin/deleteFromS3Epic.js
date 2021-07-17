import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  DELETE_FROM_S3,
  DELETE_FROM_S3_SUCCESS,
  DELETE_FROM_S3_FAILURE,
  API_ENDPOINTS,
  UPDATE_RESTAURANT_SETTINGS
} from '../../../constants'

export class deleteFromS3Epic {
  static deleteFromS3 = action$ =>
    action$.pipe(
      ofType(DELETE_FROM_S3),
      switchMap(
        async ({ payload: { fileName, updateRestaurantSettings, restaurantId } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.deleteFromS3,
            { fileName },
            (resObj) => {
              if (updateRestaurantSettings)
                return customisedAction(UPDATE_RESTAURANT_SETTINGS, { restaurantId, updatedData: { imageUrl: null }})
              return customisedAction(DELETE_FROM_S3_SUCCESS, { message: resObj.msg, type: 'success' })
            },
            DELETE_FROM_S3_FAILURE
          )
        }
      )
    )
}
