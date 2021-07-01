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
import { getItem, removeItem, setItem } from '../../../helpers'

export class addOrderEpic {
  static addOrder = action$ =>
    action$.pipe(
      ofType(SET_ORDER_ITEM),
      switchMap(
        async ({ payload: obj }) => {
          let cartMenu = localStorage.getItem('cartMenu') ? localStorage.getItem('cartMenu') : '';
          // if(JSON.parse(cartMenu).length === 0){
          //   removeItem('cartMenu')
          // }
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

              console.log(a)
              console.log(objData, objMap)

              if (JSON.stringify(objMap) === JSON.stringify(objData)) {

                let menu = JSON.parse(cartMenu)
                menu.splice(i, 1,
                  {
                    ...a,
                    quantity: a.quantity + obj.quantity,
                    totalPrice: a.totalPrice + obj.totalPrice
                  })
                updatedCart = menu
                console.log(updatedCart)
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
          let updatedCart = []
          if (cartMenu) {
            let index = cartMenu.indexOf(cartMenu.filter((a, i) => i === obj.i)[0])
            cartMenu.splice(index, 1, obj.objItem)
            console.log(obj)
            // updatedCart = JSON.parse(cartMenu)
            // updatedCart.push(obj)
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
          let updatedCart = []
          if (cartMenu) {
            let index = cartMenu.indexOf(cartMenu.filter((a, i) => i === iObj["i"])[0])
            console.log(iObj["i"],index)
            cartMenu.splice(index, 1)
            // updatedCart = JSON.parse(cartMenu)
            // updatedCart.push(obj)
            // console.log(cartMenu)
            localStorage.setItem('cartMenu', JSON.stringify(cartMenu))
          }
          // setTimeout(()=>{
          // let cartMenu2 = getItem('cartMenu') ? getItem('cartMenu') : '';


          // },[200])
          return customisedAction(SET_ORDER_ITEM_SUCCESS, { cartMenu: cartMenu })
        }
      )
    )
}
