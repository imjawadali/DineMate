import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  API_ENDPOINTS, GET_FEEDBACKS, GET_FEEDBACKS_FAILURE, GET_FEEDBACKS_SUCCESS
} from '../../../constants'

export class getFeedbacksEpic {
  static getFeedbacks = action$ =>
    action$.pipe(
      ofType(GET_FEEDBACKS),
      switchMap(
        async ({ payload: { restaurantId, noToast } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.getFeedbacks,
            { restaurantId },
            (resObj) => {
              return customisedAction(GET_FEEDBACKS_SUCCESS, resObj)
            },
            GET_FEEDBACKS_FAILURE,
            noToast
          )
        }
      )
    )
}
