import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  GET_STATUS,
  GET_STATUS_SUCCESS,
  GET_STATUS_FAILURE,
  API_ENDPOINTS,
  SET_ORDER
} from '../../../constants'
import { getItem, removeItem } from '../../../helpers'

export class getOrderStatusEpic {
  static getOrderStatus = action$ =>
    action$.pipe(
      ofType(GET_STATUS),
      switchMap(
        async (obj) => {
          return generalizedEpic(
            'post',
            API_ENDPOINTS.customer.getOrderStatus,
            obj.payload,
            (resObj) => {
              const storedOrderDetails = getItem('orderDetails')
              if (storedOrderDetails && storedOrderDetails.type.toLowerCase() === 'dine-in') {
                if (resObj.body && resObj.body.active) {
                  return customisedAction(SET_ORDER, { orderDetails: storedOrderDetails })
                } else if (resObj.body && !resObj.body.active) {
                  removeItem('orderDetails')
                  return customisedAction(SET_ORDER, { orderDetails: storedOrderDetails })
                }
              } else if (storedOrderDetails && storedOrderDetails.type.toLowerCase() === 'take-away') {
                if (resObj.body && resObj.body.closeRequested) {
                  if (resObj.body && resObj.body.active) {
                    return customisedAction(SET_ORDER, { orderDetails: storedOrderDetails })
                  } else if (resObj.body) {
                    removeItem('orderDetails')
                    return customisedAction(SET_ORDER, { orderDetails: storedOrderDetails })
                  }
                }
                else if (resObj.body) {
                  if (window.location.pathname !== "/customer/checkout") {
                    window.location.pathname = '/customer/checkout'
                  }
                  return customisedAction(SET_ORDER, { orderDetails: storedOrderDetails })
                }
              }
              else if (storedOrderDetails) {
                // removeItem('orderDetails')
                // removeItem('cartMenu')
                return customisedAction(GET_STATUS_SUCCESS, { status: resObj.body, toast: { message: resObj.message, type: 'success' } })
              }
            },
            GET_STATUS_FAILURE
          )
        }
      )
    )
}
