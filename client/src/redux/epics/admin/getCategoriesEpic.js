import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class getCategoriesEpic {
  static getCategories = action$ =>
    action$.pipe(
      ofType(GET_CATEGORIES),
      switchMap(
        async ({ payload: { restaurantId } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.getCategories,
            { restaurantId },
            (resObj) => {
              return customisedAction(GET_CATEGORIES_SUCCESS, resObj)
            },
            GET_CATEGORIES_FAILURE
          )
        }
      )
    )
}
