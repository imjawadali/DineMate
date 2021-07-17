import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  GET_GENERIC_DATA,
  GET_GENERIC_DATA_SUCCESS,
  GET_GENERIC_DATA_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class getGenericDataEpic {
  static getGenericData = action$ =>
    action$.pipe(
      ofType(GET_GENERIC_DATA),
      switchMap(
        async ({ payload: { noToast } }) => {
          return generalizedEpic(
            'get', 
            API_ENDPOINTS.admin.getGenericData,
            null,
            (resObj) => {
              return customisedAction(GET_GENERIC_DATA_SUCCESS, resObj)
            },
            GET_GENERIC_DATA_FAILURE,
            noToast
          )
        }
      )
    )
}
