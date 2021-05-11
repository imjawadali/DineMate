import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  ADD_ADDON,
  ADD_ADDON_SUCCESS,
  ADD_ADDON_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class addAddOnEpic {
  static addAddOn = action$ =>
    action$.pipe(
      ofType(ADD_ADDON),
      switchMap(
        async ({ payload: { addOn, restaurantId, history } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.addAddOn,
            { addOn },
            (resObj) => {
              history.push('/client/admin/menuManagement')
              return customisedAction(ADD_ADDON_SUCCESS, { restaurantId, toast: { message: resObj.msg, type: 'success' }})
            },
            ADD_ADDON_FAILURE
          )
        }
      )
    )
}