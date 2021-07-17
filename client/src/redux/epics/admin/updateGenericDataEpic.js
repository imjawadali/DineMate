import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  UPDATE_GENERIC_DATA,
  GET_GENERIC_DATA,
  UPDATE_GENERIC_DATA_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class updateGenericDataEpic {
  static updateGenericData = action$ =>
    action$.pipe(
      ofType(UPDATE_GENERIC_DATA),
      switchMap(
        async ({ payload: { updatedData } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.updateGenericData,
            { updatedData },
            (resObj) => {
              return customisedAction(GET_GENERIC_DATA, { toast: { message: resObj.msg, type: 'success' }})
            },
            UPDATE_GENERIC_DATA_FAILURE
          )
        }
      )
    )
}
