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
  SET_ORDER_ITEM_SUCCESS,
  EDIT_ORDER_ITEM,
  DELETE_ORDER_ITEM
} from '../../../constants'
import { getItem, setItem } from '../../../helpers'

export class addOrderEpic {
  static addOrder = action$ =>
    action$.pipe(
      ofType(SET_ORDER_ITEM),
      switchMap(
        async ({ payload: obj }) => {
          let cartMenu = localStorage.getItem('cartMenu') ? localStorage.getItem('cartMenu') : '';
          let updatedCart = []
          if (cartMenu) {
            updatedCart = JSON.parse(cartMenu)
            updatedCart.push(obj)
            localStorage.setItem('cartMenu', JSON.stringify(updatedCart))
          } else {
            let cart = JSON.stringify([obj])
            updatedCart = [obj]
            localStorage.setItem('cartMenu', cart)
          }
          return customisedAction(SET_ORDER_ITEM_SUCCESS, { cartMenu: updatedCart })
        }
      )
    )


  static editOrder = action$ =>
    action$.pipe(
      ofType(EDIT_ORDER_ITEM),
      switchMap(
        async ({ payload: obj }) => {
          let cartMenu = getItem('cartMenu') ? getItem('cartMenu') : '';
          let updatedCart = []
          if (cartMenu) {
            let index = cartMenu.indexOf(cartMenu.filter((a, i) => a.id === obj.id)[0])
             cartMenu.splice(index, 1, obj)
            // updatedCart = JSON.parse(cartMenu)
            // updatedCart.push(obj)
            console.log(cartMenu)
            localStorage.setItem('cartMenu', JSON.stringify(cartMenu))
          }
          return customisedAction(SET_ORDER_ITEM_SUCCESS, { cartMenu: cartMenu })
        }
      )
    )
    static deleteOrder = action$ =>
    action$.pipe(
      ofType(DELETE_ORDER_ITEM),
      switchMap(
        async ({ payload: obj }) => {
          let cartMenu = getItem('cartMenu') ? getItem('cartMenu') : '';
          let updatedCart = []
          if (cartMenu) {
            let index = cartMenu.indexOf(cartMenu.filter((a, i) => a.id === obj.id)[0])
            console.log(obj)
             cartMenu.splice(index, 1)
            // updatedCart = JSON.parse(cartMenu)
            // updatedCart.push(obj)
            // console.log(cartMenu)
            localStorage.setItem('cartMenu', JSON.stringify(cartMenu))
          }
          return customisedAction(SET_ORDER_ITEM_SUCCESS, { cartMenu: cartMenu })
        }
      )
    )
}
