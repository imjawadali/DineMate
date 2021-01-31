import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  UPDATE_CATEGORY,
  GET_CATEGORIES,
  UPDATE_CATEGORY_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class updateCategoryEpic {
  static updateCategory = action$ =>
    action$.pipe(
      ofType(UPDATE_CATEGORY),
      switchMap(
        async ({ payload: { id, name, restaurantId } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.updateCategory,
            { id, name },
            () => {
              return customisedAction(GET_CATEGORIES, { restaurantId })
            },
            UPDATE_CATEGORY_FAILURE
          )
        }
      )
    )
}
