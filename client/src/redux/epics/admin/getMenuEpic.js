import { switchMap, filter } from 'rxjs/operators'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  GET_MENU,
  ADD_MENU_SUCCESS,
  GET_MENU_SUCCESS,
  GET_MENU_FAILURE,
  API_ENDPOINTS,
  UPDATE_MENU_SUCCESS,
  UPDATE_ADDON_SUCCESS,
  ADD_ADDON_SUCCESS
} from '../../../constants'

export class getMenuEpic {
  static getMenu = action$ =>
    action$.pipe(
      filter(({ type }) => {
        switch (type) {
          case GET_MENU:
            return true;
          case ADD_MENU_SUCCESS:
            return true;
          case UPDATE_MENU_SUCCESS:
            return true;
          case ADD_ADDON_SUCCESS:
            return true;
          case UPDATE_ADDON_SUCCESS:
            return true;
          default:
            return false;
        }
      }),
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
