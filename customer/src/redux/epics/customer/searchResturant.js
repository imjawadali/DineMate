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
        async ({ payload: { searchBy }, extras: { latitude, longitude }}) => {
          return generalizedEpic(
            'post', 
            `${API_ENDPOINTS.customer.searchResturant}?latitude=${latitude}&longitude=${longitude}`,
            { searchBy },
            (resObj) => {
              return customisedAction(SEARCH_RESTURANT_SUCCESS, { restaurants: resObj.body, toast: { message: resObj.message, type: 'success' }})
            },
            SEARCH_RESTURANT_FAILURE
          )
        }
      )
    )
}
