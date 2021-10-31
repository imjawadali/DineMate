import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  API_ENDPOINTS,
  SEARCH_RESTURANT,
  SEARCH_RESTURANT_SUCCESS,
  SEARCH_RESTURANT_FAILURE
} from '../../../constants'

export class searchResturantEpic {
  static searchResturant = action$ =>
    action$.pipe(
      ofType(SEARCH_RESTURANT),
      switchMap(
        async ({ payload: { searchBy, pageNumber }, extras: { latitude, longitude, city }}) => {
          return generalizedEpic(
            'post', 
            `${API_ENDPOINTS.customer.searchResturant}`,
            { searchBy, latitude, longitude, city, pageNumber },
            (resObj) => {
              return customisedAction(SEARCH_RESTURANT_SUCCESS, resObj.body)
            },
            SEARCH_RESTURANT_FAILURE
          )
        }
      )
    )
}
