import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  GET_RESTAURANT_DETAILS,
  GET_RESTAURANT_DETAILS_SUCCESS,
  GET_RESTAURANT_DETAILS_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class getRestaurantDetailsEpic {
  static getRestaurantDetails = action$ =>
    action$.pipe(
      ofType(GET_RESTAURANT_DETAILS),
      switchMap(
        async ({ payload: { restaurantId } }) => {
          return generalizedEpic(
            'post',
            API_ENDPOINTS.customer.getRestaurantDetails,
            { restaurantId },
            (resObj) => {
              return customisedAction(GET_RESTAURANT_DETAILS_SUCCESS, resObj.body)
            },
            GET_RESTAURANT_DETAILS_FAILURE
          )
        }
      )
    )
}
