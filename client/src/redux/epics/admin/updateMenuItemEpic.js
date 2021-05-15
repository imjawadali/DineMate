import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  UPDATE_MENU,
  UPDATE_MENU_SUCCESS,
  UPDATE_MENU_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class updateMenuItemEpic {
  static updateMenuItem = action$ =>
    action$.pipe(
      ofType(UPDATE_MENU),
      switchMap(
        async ({ payload: { updatedData, id, restaurantId, history } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.updateMenuItem,
            { id, updatedData },
            (resObj) => {
              history.push('/client/admin/menuManagement')
              return customisedAction(UPDATE_MENU_SUCCESS, { restaurantId, toast: { message: resObj.msg, type: 'success' }})
            },
            UPDATE_MENU_FAILURE
          )
        }
      )
    )
}