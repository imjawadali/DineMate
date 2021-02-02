import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  GET_MENU,
  GET_MENU_SUCCESS,
  GET_MENU_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class getMenuEpic {
  static getMenu = action$ =>
    action$.pipe(
      ofType(GET_MENU),
      switchMap(
        async ({ payload: { restaurantId, noToast } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.getMenuItems,
            { restaurantId },
            (resObj) => {
              return customisedAction(GET_MENU_SUCCESS, resObj)
            },
            GET_MENU_FAILURE,
            noToast
          )
        }
      )
    )
}
