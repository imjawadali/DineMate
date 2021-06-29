import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  INITIALIZE_ORDER,
  SET_ORDER_ITEM,
  INITIALIZE_ORDER_FAILURE,
  API_ENDPOINTS,
  SET_ORDER_ITEM_FAILED,
  CALL_FOR_SERVICE,
  CALL_FOR_SERVICE_SUCCESS,
  CALL_FOR_SERVICE_FAILURE,
  DONOTDISTURB,
  DONOTDISTURB_SUCCESS,
  DONOTDISTURB_FAILURE
} from '../../../constants'
import { setItem } from '../../../helpers'

export class callForServiceEpic {
  static addService = action$ =>
    action$.pipe(
      ofType(CALL_FOR_SERVICE),
      switchMap(
        async ({ payload: obj }) => {
          return generalizedEpic(
            'post',
            API_ENDPOINTS.customer.callForService,
            obj,
            (resObj) => {
           
              return customisedAction(CALL_FOR_SERVICE_SUCCESS, { service: resObj.body, toast: { message: resObj.message, type: 'success' }, })
            },
            CALL_FOR_SERVICE_FAILURE
          )
        }
      )
    )


    static doNotDisturb = action$ =>
    action$.pipe(
      ofType(DONOTDISTURB),
      switchMap(
        async ({ payload: obj }) => {
          return generalizedEpic(
            'post',
            API_ENDPOINTS.customer.doNotDisturb,
            obj,
            (resObj) => {
           
              return customisedAction(DONOTDISTURB_SUCCESS, { service: resObj.body, toast: { message: resObj.message, type: 'success' }, })
            },
            DONOTDISTURB_FAILURE
          )
        }
      )
    )
}
