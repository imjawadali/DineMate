import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  DELETE_FROM_S3,
  DELETE_FROM_S3_SUCCESS,
  DELETE_FROM_S3_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class deleteFromS3Epic {
  static deleteFromS3 = action$ =>
    action$.pipe(
      ofType(DELETE_FROM_S3),
      switchMap(
        async ({ payload: { fileName } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.deleteFromS3,
            { fileName },
            (resObj) => {
              return customisedAction(DELETE_FROM_S3_SUCCESS, { message: resObj.msg, type: 'success' })
            },
            DELETE_FROM_S3_FAILURE
          )
        }
      )
    )
}
