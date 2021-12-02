import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  API_ENDPOINTS, GET_RESERVATIONS, GET_RESERVATIONS_FAILURE, GET_RESERVATIONS_SUCCESS, UPDATE_RESERVATION, UPDATE_RESERVATION_FAILURE
} from '../../../constants'

export class ReservationsEpic {
  static getReservations = action$ =>
    action$.pipe(
      ofType(GET_RESERVATIONS),
      switchMap(
        async ({ payload: { restaurantId, noToast } }) => {
          return generalizedEpic(
            'post',
            API_ENDPOINTS.admin.getReservations,
            { restaurantId },
            (resObj) => {
              return customisedAction(GET_RESERVATIONS_SUCCESS, resObj)
            },
            GET_RESERVATIONS_FAILURE,
            noToast
          )
        }
      )
    )

  static updateReservation = action$ =>
    action$.pipe(
      ofType(UPDATE_RESERVATION),
      switchMap(
        async ({ payload: { id, status, customerId, restaurantId } }) => {
          return generalizedEpic(
            'post',
            API_ENDPOINTS.admin.updateReservation,
            { id, status, customerId },
            (resObj) => {
              return customisedAction(GET_RESERVATIONS, { restaurantId, toast: { message: resObj.msg, type: 'success'}})
            },
            UPDATE_RESERVATION_FAILURE
          )
        }
      )
    )
}
