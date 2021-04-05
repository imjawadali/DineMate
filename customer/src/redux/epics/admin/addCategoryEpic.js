import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  ADD_CATEGORY,
  GET_CATEGORIES,
  ADD_CATEGORY_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class addCategoryEpic {
  static addCategory = action$ =>
    action$.pipe(
      ofType(ADD_CATEGORY),
      switchMap(
        async ({ payload: { name, restaurantId } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.addCategory,
            { name, restaurantId },
            () => {
              return customisedAction(GET_CATEGORIES, { restaurantId })
            },
            ADD_CATEGORY_FAILURE
          )
        }
      )
    )
}
