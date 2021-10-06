import { switchMap, filter } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  GET_STATUS,
  GET_STATUS_SUCCESS,
  GET_STATUS_FAILURE,
  API_ENDPOINTS,
  SET_ORDER,
  ORDER_CHECK_DONE,
  ORDER_CANCELLED,
  ORDER_CLOSED_BY_ADMIN,
  GET_STATUS_FAILURE_BCZ_CANCELLED
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
                } else {
                  removeItem('orderDetails')
                  return customisedAction(ORDER_CHECK_DONE)
                }
              } else if (storedOrderDetails && storedOrderDetails.type.toLowerCase() === 'take-away') {
                if (resObj.body && resObj.body.closeRequested) {
                  if (resObj.body && resObj.body.active) {
                    return customisedAction(SET_ORDER, { orderDetails: storedOrderDetails })
                  } else if (resObj.body) {
                    removeItem('orderDetails')
                    return customisedAction(ORDER_CHECK_DONE)
                  }
                }
                else {
                  if (window.location.pathname !== "/customer/checkout")
                    window.location.pathname = '/customer/checkout'
                  return customisedAction(SET_ORDER, { orderDetails: storedOrderDetails })
                }
              }
              else if (storedOrderDetails) {
                return customisedAction(GET_STATUS_SUCCESS, { status: resObj.body, toast: { message: resObj.message, type: 'success' } })
              }
            },
            GET_STATUS_FAILURE
          )
        }
      )
    )

  static removeOrder = action$ =>
    action$.pipe(
      filter(({ type }) => {
        switch (type) {
          case ORDER_CANCELLED:
            return true;
          case ORDER_CLOSED_BY_ADMIN:
            return true;
          case GET_STATUS_FAILURE_BCZ_CANCELLED:
            return true;
          default:
            return false;
        }
      }),
      switchMap(
        async ({ type }) => {
          removeItem('orderDetails')
          removeItem('cartMenu')
          removeItem('doNotDisturb')
          if (window.location.pathname === '/customer/checkout')
            window.location.pathname = '/'
          return customisedAction(ORDER_CHECK_DONE, {
            toast: type === GET_STATUS_FAILURE_BCZ_CANCELLED
              || type === ORDER_CANCELLED ?
              { message: 'Order has been cancelled by restaurant', type: 'error' }
            : type === ORDER_CLOSED_BY_ADMIN ?
              { message: 'Admin has closed your order', type: 'success' }
            : null }
          )
        }
      )
    )
}
