import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  UPLOAD_TO_S3,
  UPLOAD_TO_S3_SUCCESS,
  UPLOAD_TO_S3_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class uploadToS3Epic {
  static uploadToS3 = action$ =>
    action$.pipe(
      ofType(UPLOAD_TO_S3),
      switchMap(
        async ({ payload: { fileName, mimeType, data } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.uploadToS3,
            { fileName, mimeType, data },
            (resObj) => {
              return customisedAction(UPLOAD_TO_S3_SUCCESS, { imageUrl: resObj.imageUrl })
            },
            UPLOAD_TO_S3_FAILURE
          )
        }
      )
    )
}
