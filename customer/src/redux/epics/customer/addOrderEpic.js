import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { generalizedEpic } from '../generalizedEpic'
import { customisedAction } from '../../actions'
import {
  SET_ORDER_ITEM,
  SET_ORDER_ITEM_SUCCESS,
  EDIT_ORDER_ITEM,
  DELETE_ORDER_ITEM,
  DELETE_ALL_ORDER_ITEM,
  GET_RE_ORDER_DETAILS,
  GET_RE_ORDER_DETAILS_FAILURE,
  GET_RE_ORDER_DETAILS_SUCCESS,
  API_ENDPOINTS
} from '../../../constants'
import { getItem, removeItem } from '../../../helpers'
import store from '../../store'

export class addOrderEpic {
  static addOrder = action$ =>
    action$.pipe(
      ofType(SET_ORDER_ITEM),
      switchMap(
        async ({ payload: obj }) => {
          let cartMenu = localStorage.getItem('cartMenu') ? localStorage.getItem('cartMenu') : '';
          let updatedCart = []
          if (cartMenu && JSON.parse(cartMenu).length === 0) {
            removeItem('cartMenu')
            cartMenu = false
          }
          if (cartMenu) {
            JSON.parse(cartMenu).map((a, i) => {
              let objMap = {}
              objMap = { ...a }
              let objData = { ...obj }
              delete objMap.quantity
              delete objData.quantity
              delete objData.totalPrice
              delete objMap.totalPrice

              if (JSON.stringify(objMap) === JSON.stringify(objData)) {

                let menu = JSON.parse(cartMenu)
                menu.splice(i, 1,
                  {
                    ...a,
                    quantity: a.quantity + obj.quantity,
                    totalPrice: a.totalPrice + obj.totalPrice
                  })
                updatedCart = menu
                localStorage.setItem('cartMenu', JSON.stringify(updatedCart))
              } else {
                updatedCart = JSON.parse(cartMenu)
                updatedCart.push(obj)
                localStorage.setItem('cartMenu', JSON.stringify(updatedCart))
              }
            })
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
          if (cartMenu) {
            let index = cartMenu.indexOf(cartMenu.filter((a, i) => i === obj.i)[0])
            cartMenu.splice(index, 1, obj.objItem)
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
        async ({ payload: iObj }) => {
          let cartMenu = getItem('cartMenu') ? getItem('cartMenu') : '';
          if (cartMenu) {
            let index = cartMenu.indexOf(cartMenu.filter((a, i) => i === iObj["i"])[0])
            cartMenu.splice(index, 1)
            localStorage.setItem('cartMenu', JSON.stringify(cartMenu))
          }
          return customisedAction(SET_ORDER_ITEM_SUCCESS, { cartMenu: cartMenu })
        }
      )
    )

  static deleteAllOrder = action$ =>
    action$.pipe(
      ofType(DELETE_ALL_ORDER_ITEM),
      switchMap(
        async () => {
          removeItem('cartMenu')
          return customisedAction(SET_ORDER_ITEM_SUCCESS, { cartMenu: [] })
        }
      )
    )

  static getReOrderDetails = action$ =>
    action$.pipe(
      ofType(GET_RE_ORDER_DETAILS),
      switchMap(
        async ({ payload: { restaurantId, orderNumber, type }, extras: { history } }) => {
          return generalizedEpic(
            'post',
            API_ENDPOINTS.customer.getReOrderDetails,
            { restaurantId, orderNumber, type },
            (resObj) => {
              console.log(resObj.body.items)
              if (history) {
                history.push(`/customer/${restaurantId}/menu`)
              }
              if (resObj.body.items && resObj.body.items.length) {
                resObj.body.items.forEach(item => {
                  if (item.addOns && item.addOns.length) {
                    item.addOnObj = {}
                    item.addOns.forEach(addOn => {
                      item.addOnObj[addOn.addOnName] = addOn
                    });
                  }
                  item.restaurantId = restaurantId
                  item.id = item.itemId
                  store.dispatch(customisedAction(SET_ORDER_ITEM, item))
                })
              }
              return customisedAction(GET_RE_ORDER_DETAILS_SUCCESS)
            },
            GET_RE_ORDER_DETAILS_FAILURE
          )
        }
      )
    )
}
