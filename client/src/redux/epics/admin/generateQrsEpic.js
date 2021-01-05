import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  GENERATE_QRS,
  GENERATE_QRS_SUCCESS,
  GENERATE_QRS_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class generateQrsEpic {
  static generateQrs = action$ =>
    action$.pipe(
      ofType(GENERATE_QRS),
      switchMap(
        async ({ payload, payload: { restaurantId } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.generateQrs,
            payload,
            () => {
              return customisedAction(GENERATE_QRS_SUCCESS, { restaurantId })
            },
            GENERATE_QRS_FAILURE
          )
        }
      )
    )
}
