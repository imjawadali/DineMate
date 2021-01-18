import { switchMap, filter } from 'rxjs/operators'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  GET_ALL_RESTAURANTS,
  GENERATE_QRS_SUCCESS,
  ADD_RESTAURANT_SUCCESS,
  GET_ALL_RESTAURANTS_SUCCESS,
  GET_ALL_RESTAURANTS_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class getAllRestaurantsEpic {
  static getAllRestaurants = action$ =>
    action$.pipe(
      filter(({ type }) => {
        switch (type) {
          case GET_ALL_RESTAURANTS:
            return true;
          case GENERATE_QRS_SUCCESS:
            return true;
          case ADD_RESTAURANT_SUCCESS:
            return true;
          default:
            return false;
        }
      }),
      switchMap(
        async () => {
          return generalizedEpic(
            'get', 
            API_ENDPOINTS.admin.getAllRestaurants,
            null,
            (resObj) => {
              return customisedAction(GET_ALL_RESTAURANTS_SUCCESS, { restaurants: resObj })
            },
            GET_ALL_RESTAURANTS_FAILURE
          )
        }
      )
    )
}
