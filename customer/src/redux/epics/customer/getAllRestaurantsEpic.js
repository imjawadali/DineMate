import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  GET_ALL_RESTAURANTS,
  GET_ALL_RESTAURANTS_SUCCESS,
  GET_ALL_RESTAURANTS_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class getAllRestaurantsEpic {
  static getAllRestaurants = action$ =>
    action$.pipe(
      ofType(GET_ALL_RESTAURANTS),
      switchMap(
        async () => {
          return generalizedEpic(
            'get', 
            API_ENDPOINTS.customer.getAllRestaurants,
            null,
            (resObj) => {
              return customisedAction(GET_ALL_RESTAURANTS_SUCCESS, resObj.body)
            },
            GET_ALL_RESTAURANTS_FAILURE
          )
        }
      )
    )
}
