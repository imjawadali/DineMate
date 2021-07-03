import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  SET_ORDER,
  API_ENDPOINTS,
  SUBMIT_ORDER_ITEM,
  SUBMIT_ORDER_ITEM_FAILED,
  SET_ORDER_ITEM_SUCCESS,
  TAKIE_AWAY_ORDER,
  TAKIE_AWAY_ORDER_FAILED,
  SET_TAKE_ORDER_ITEM_SUCCESS,
  GET_TAKE_ORDER_ITEMS
} from '../../../constants'
import { removeItem, setItem } from '../../../helpers'

export class takeAwayOrderEpic {
  static takeAwayOrder = action$ =>
    action$.pipe(
      ofType(TAKIE_AWAY_ORDER),
      switchMap(
        async ({ payload: obj }) => {
          return generalizedEpic(
            'post',
            API_ENDPOINTS.customer.takeAwayOrder,
            obj,
            (resObj) => {
              let arr = []
              obj.items && obj.items.map((a, i) => {
                arr.push({
                  ...a,
                  status: 'locked'
                })
              })
              // setItem('cartMenu', arr)
              setItem('orderDetails', resObj.body)
              removeItem('cartMenu')
              console.log(resObj,obj,"abcdefg")

              // return customisedAction(SET_TAKE_ORDER_ITEM_SUCCESS, resObj.body)
              return customisedAction(GET_TAKE_ORDER_ITEMS, {orderNumber: resObj.body.orderNumber, restaurantId: resObj.body.restaurantId})

            },
            TAKIE_AWAY_ORDER_FAILED
          )
        }
      )
    )
}
