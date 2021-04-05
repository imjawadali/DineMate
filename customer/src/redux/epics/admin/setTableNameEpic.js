import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  SET_TABLE_NAME,
  GET_EXISTING_QRS,
  SET_TABLE_NAME_FAILURE,
  API_ENDPOINTS
} from '../../../constants'

export class setTableNameEpic {
  static setTableName = action$ =>
    action$.pipe(
      ofType(SET_TABLE_NAME),
      switchMap(
        async ({ payload: { id, tableName, restaurantId, history } }) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.admin.setTableName,
            { id, tableName },
            () => {
              history.goBack()
              return customisedAction(GET_EXISTING_QRS, { restaurantId })
            },
            SET_TABLE_NAME_FAILURE
          )
        }
      )
    )
}
