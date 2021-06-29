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
  SET_ORDER_ITEM_SUCCESS
} from '../../../constants'
import { setItem } from '../../../helpers'

export class addOrderEpic {
  static addOrder = action$ =>
    action$.pipe(
      ofType(SET_ORDER_ITEM),
      switchMap(
        async ({ payload: obj }) => {
          console.log('runn')
          let cartMenu = localStorage.getItem('cartMenu') ? localStorage.getItem('cartMenu') : '';
          let updatedCart = []
          if (cartMenu) {
            updatedCart = JSON.parse(cartMenu)
            console.log('NOT OKK')
            updatedCart.push(obj)
            console.log(updatedCart)
            localStorage.setItem('cartMenu', JSON.stringify(updatedCart))
          } else {
            console.log('OKK')
            let cart = JSON.stringify([obj])
            updatedCart = [obj]
            localStorage.setItem('cartMenu', cart)
          }
          return customisedAction(SET_ORDER_ITEM_SUCCESS, {cartMenu: updatedCart })
        }
      )
    )
}
