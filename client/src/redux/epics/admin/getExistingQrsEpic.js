import { switchMap, filter } from 'rxjs/operators'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  GET_EXISTING_QRS,
  GENERATE_QRS_SUCCESS,
  GET_EXISTING_QRS_SUCCESS,
  GET_EXISTING_QRS_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class getExistingQrsEpic {
  static getExistingQrs = action$ =>
    action$.pipe(
      filter(({ type }) => {
        switch (type) {
          case GET_EXISTING_QRS:
            return true;
          case GENERATE_QRS_SUCCESS:
            return true;
          default:
            return false;
        }
      }),
      switchMap(
        async ({ payload: { restaurantId } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.getExistingQrs,
            { restaurantId },
            (resObj) => {
              return customisedAction(GET_EXISTING_QRS_SUCCESS, resObj)
            },
            GET_EXISTING_QRS_FAILURE
          )
        }
      )
    )
}
