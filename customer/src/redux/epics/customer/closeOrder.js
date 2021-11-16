import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  CLOSE_ORDER,
  CLOSE_ORDER_SUCCESS,
  CLOSE_ORDER_FAILURE,
  API_ENDPOINTS,
  CLOSE_ORDER_VIA_STRIPE,
  GET_RPOFILE,
  APPLY_REWARD_POINTS,
  APPLY_REWARD_POINTS_SUCCESS,
  APPLY_REWARD_POINTS_FAILURE
} from '../../../constants'
import store from '../../store'

export class closeOrderViaCashEpic {
  static closeOrderViaCash = action$ =>
    action$.pipe(
      ofType(CLOSE_ORDER),
      switchMap(
        async ({ payload, extras: { history } }) => {
          return generalizedEpic(
            'post',
            API_ENDPOINTS.customer.closeOrderViaCash,
            payload,
            (resObj) => {
              if (resObj.body && resObj.body.pointsEarned)
                store.dispatch(customisedAction(GET_RPOFILE))
              if (history)
                setTimeout(() => {
                  history.push(`/customer/${payload.restaurantId}/menu`)
                }, 1000)
              return customisedAction(CLOSE_ORDER_SUCCESS, { reward: resObj.body, toast: { message: 'Please Wait Manager Will Respond You Soon', type: 'success' } })
            },
            CLOSE_ORDER_FAILURE
          )
        }
      )
    )

  static closeOrderViaStripe = action$ =>
    action$.pipe(
      ofType(CLOSE_ORDER_VIA_STRIPE),
      switchMap(
        async ({ payload, extras: { history } }) => {
          return generalizedEpic(
            'post',
            API_ENDPOINTS.customer.closeOrderViaStripe,
            payload,
            (resObj) => {
              if (resObj.body && resObj.body.pointsEarned)
                store.dispatch(customisedAction(GET_RPOFILE))
              setTimeout(() => {
                history.push(`/customer/restaurants`)
              }, 1000)
              return customisedAction(CLOSE_ORDER_SUCCESS, { reward: resObj.body, toast: { message: resObj.message, type: 'success' } })
            },
            CLOSE_ORDER_FAILURE
          )
        }
      )
    )

  static applyRewardPoints = action$ =>
    action$.pipe(
      ofType(APPLY_REWARD_POINTS),
      switchMap(
        async ({ payload: { restaurantId, orderNumber, pointsToRedeem, billAmount } }) => {
          return generalizedEpic(
            'post',
            API_ENDPOINTS.customer.applyRewardPoints,
            { restaurantId, orderNumber, pointsToRedeem, billAmount },
            (resObj) => {
              return customisedAction(APPLY_REWARD_POINTS_SUCCESS, { restaurantId, orderNumber, toast: { message: resObj.message, type: 'success' } })
            },
            APPLY_REWARD_POINTS_FAILURE
          )
        }
      )
    )
}
