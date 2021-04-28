import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  ADD_MENU,
  ADD_MENU_SUCCESS,
  ADD_MENU_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class addMenuItemEpic {
  static addMenuItem = action$ =>
    action$.pipe(
      ofType(ADD_MENU),
      switchMap(
        async ({ payload, extras: { history, restaurantId } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.addMenuItem,
            payload,
            (resObj) => {
              history.push('/client/admin/menuManagement')
              return customisedAction(ADD_MENU_SUCCESS, { restaurantId, toast: { message: resObj.msg, type: 'success' }})
            },
            ADD_MENU_FAILURE
          )
        }
      )
    )
}