import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  GET_GENERIC_DATA,
  API_ENDPOINTS,
  DELETE_FAQ,
  DELETE_FAQ_FAILURE
} from '../../../constants'

export class deleteFaqEpic {
  static deleteFaq = action$ =>
    action$.pipe(
      ofType(DELETE_FAQ),
      switchMap(
        async ({ payload: { id } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.deleteFaq,
            { id },
            (resObj) => {
              return customisedAction(GET_GENERIC_DATA, { toast: { message: resObj.msg, type: 'success' }})
            },
            DELETE_FAQ_FAILURE
          )
        }
      )
    )
}
