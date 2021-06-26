import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  INITIALIZE_ORDER,
  SET_ORDER_ITEM,
  INITIALIZE_ORDER_FAILURE,
  API_ENDPOINTS,
  SET_ORDER_ITEM_FAILED
} from '../../../constants'
import { setItem } from '../../../helpers'

export class addOrderEpic {
  static addOrder = action$ =>
    action$.pipe(
      ofType(SET_ORDER_ITEM),
      switchMap(
        async ({ payload: obj }) => {
          console.log('runn')
          return generalizedEpic(
            'post',
            API_ENDPOINTS.customer.addSingleItem,
            obj,
            (resObj) => {
              let cartMenu = localStorage.getItem('cartMenu') ? localStorage.getItem('cartMenu') : '';
              let updatedCart = JSON.parse(cartMenu)
              if (cartMenu) {
                updatedCart.push(obj)
                console.log(updatedCart)
                localStorage.setItem('cartMenu', JSON.stringify(updatedCart))
              } else {
                let cart = JSON.stringify([obj])
                localStorage.setItem('cartMenu', cart)
              }
              return customisedAction(SET_ORDER_ITEM, { orderDetails: resObj.body, toast: { message: resObj.message, type: 'success' }, cartMenu: updatedCart })
            },
            SET_ORDER_ITEM_FAILED
          )
        }
      )
    )
}
