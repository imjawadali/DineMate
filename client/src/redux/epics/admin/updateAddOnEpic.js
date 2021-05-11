import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  UPDATE_ADDON,
  UPDATE_ADDON_SUCCESS,
  UPDATE_ADDON_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class updateAddOnEpic {
  static updateAddOn = action$ =>
    action$.pipe(
      ofType(UPDATE_ADDON),
      switchMap(
        async ({ payload: { updatedAddOn, id, restaurantId, history } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.updateAddOn,
            { id, updatedAddOn },
            (resObj) => {
              history.push('/client/admin/menuManagement')
              return customisedAction(UPDATE_ADDON_SUCCESS, { restaurantId, toast: { message: resObj.msg, type: 'success' }})
            },
            UPDATE_ADDON_FAILURE
          )
        }
      )
    )
}