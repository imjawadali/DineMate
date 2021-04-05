import { switchMap, filter } from 'rxjs/operators'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  GET_SERVICES_QUE, GET_SERVICES_QUE_SUCCESS, GET_SERVICES_QUE_FAILURE,
  API_ENDPOINTS,
  GET_RESTAURANT_DASHBOARD
} from '../../../constants'

export class getServicesQueEpic {
  static getServicesQue = action$ =>
    action$.pipe(
      filter(({ type }) => {
        switch (type) {
          case GET_SERVICES_QUE:
            return true;
          case GET_RESTAURANT_DASHBOARD:
            return true;
          default:
            return false;
        }
      }),
      switchMap(
        async ({ payload: { restaurantId } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.getServicesQue,
            { restaurantId },
            (resObj) => {
              return customisedAction(GET_SERVICES_QUE_SUCCESS, resObj)
            },
            GET_SERVICES_QUE_FAILURE
          )
        }
      )
    )
}
