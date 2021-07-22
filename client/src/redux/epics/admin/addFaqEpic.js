import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  GET_GENERIC_DATA,
  API_ENDPOINTS,
  ADD_FAQ,
  ADD_FAQ_FAILURE
} from '../../../constants'

export class addFaqEpic {
  static addFaq = action$ =>
    action$.pipe(
      ofType(ADD_FAQ),
      switchMap(
        async ({ payload: { name, value } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.addFaq,
            { name, value },
            (resObj) => {
              return customisedAction(GET_GENERIC_DATA, { toast: { message: resObj.msg, type: 'success' }})
            },
            ADD_FAQ_FAILURE
          )
        }
      )
    )
}
