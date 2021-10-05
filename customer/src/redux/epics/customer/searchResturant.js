import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { customisedAction } from '../../actions'
import { generalizedEpic } from '../generalizedEpic'
import {
  SET_ORDER,
  API_ENDPOINTS,
  SUBMIT_ORDER_ITEM,
  SUBMIT_ORDER_ITEM_FAILED,
  GET_ORDER_ITEMS,
  SET_ORDER_ITEM,
  GET_ORDER_ITEMS_SUCCESS,
  GET_ORDER_ITEMS_FAILURE,
  SEARCH_RESTURANT,
  SEARCH_RESTURANT_SUCCESS,
  SEARCH_RESTURANT_FAILURE
} from '../../../constants'
import { removeItem, setItem } from '../../../helpers'

export class searchResturantEpic {
  static searchResturant = action$ =>
    action$.pipe(
      ofType(SEARCH_RESTURANT),
      switchMap(
        async ({ payload: obj}) => {
          return generalizedEpic(
            'post', 
            API_ENDPOINTS.customer.searchResturant,
            obj,
            (resObj) => {
              return customisedAction(SEARCH_RESTURANT_SUCCESS, { restaurants: resObj.body, toast: { message: resObj.message, type: 'success' }})
            },
            SEARCH_RESTURANT_FAILURE
          )
        }
      )
    )
}
