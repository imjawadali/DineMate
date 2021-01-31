import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  DELETE_CATEGORY,
  GET_CATEGORIES,
  DELETE_CATEGORY_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class deleteCategoryEpic {
  static deleteCategory = action$ =>
    action$.pipe(
      ofType(DELETE_CATEGORY),
      switchMap(
        async ({ payload: { id, restaurantId } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.deleteCategory,
            { id },
            () => {
              return customisedAction(GET_CATEGORIES, { restaurantId })
            },
            DELETE_CATEGORY_FAILURE
          )
        }
      )
    )
}
