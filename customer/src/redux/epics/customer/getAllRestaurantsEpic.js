import { switchMap, filter } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  GET_ALL_RESTAURANTS,
  GET_ALL_RESTAURANTS_SUCCESS,
  GET_ALL_RESTAURANTS_FAILURE,
  API_ENDPOINTS,
  SUBMIT_RATING_SUCCESS,
  SUBMIT_RATING,
  SUBMIT_RATING_FAILURE
} from '../../../constants'

export class getAllRestaurantsEpic {
  static getAllRestaurants = action$ =>
    action$.pipe(
      filter(({ type }) => {
        switch (type) {
          case GET_ALL_RESTAURANTS:
            return true;
          case SUBMIT_RATING_SUCCESS:
            return true;
          default:
            return false;
        }
      }),
      switchMap(
        async ({ payload: { pageNumber }, extras: { latitude, longitude, city } }) => {
          return generalizedEpic(
            'post',
            `${API_ENDPOINTS.customer.getAllRestaurants}`,
            { latitude, longitude, city, pageNumber },
            (resObj) => {
              return customisedAction(GET_ALL_RESTAURANTS_SUCCESS, resObj.body)
            },
            GET_ALL_RESTAURANTS_FAILURE
          )
        }
      )
    )

  static submitRating = action$ =>
    action$.pipe(
      ofType(SUBMIT_RATING),
      switchMap(
        async ({ payload: { restaurantId, orderNumber, rating }, extras: { latitude, longitude, city } }) => {
          return generalizedEpic(
            'post',
            API_ENDPOINTS.customer.submitRating,
            { restaurantId, orderNumber, rating },
            (resObj) => {
              return customisedAction(SUBMIT_RATING_SUCCESS, { message: resObj.message, type: 'success' }, { latitude, longitude, city })
            },
            SUBMIT_RATING_FAILURE
          )
        }
      )
    )
}
