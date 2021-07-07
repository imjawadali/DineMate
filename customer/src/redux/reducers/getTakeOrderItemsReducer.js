import {
  GET_ALL_RESTAURANTS,
  GET_ALL_RESTAURANTS_SUCCESS,
  GET_TAKE_ORDER_ITEMS_FAILURE,
  GET_TAKE_ORDER_ITEMS,
  GET_TAKE_ORDER_ITEMS_SUCCESS,
} from '../../constants'

export default (state = { fetchingTakeOrderItems: false, takeOrderItems: null, orderNumber: null }, { type, payload }) => {
  switch (type) {
    case GET_TAKE_ORDER_ITEMS:
      console.log(payload, 'sss')
      return { ...state, fetchingTakeOrderItems: true, orderNumber: payload.orderNumber }
    case GET_TAKE_ORDER_ITEMS_SUCCESS:
      return { ...state, fetchingTakeOrderItems: false, takeOrderItems: payload.OrderItems }
    case GET_TAKE_ORDER_ITEMS_FAILURE:
      return { ...state, fetchingTakeOrderItems: false }
    default:
      return state
  }
}
