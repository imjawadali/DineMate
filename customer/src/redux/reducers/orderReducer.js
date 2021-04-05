import {
    GET_ORDER,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILURE,
    
  } from '../../constants'
  
  export default (state = { 
    fetchingOrder: false,    
    order: null
  }, { type, payload }) => {
    switch (type) {
      case GET_ORDER:
        return { ...state, fetchingOrder: true}
      case GET_ORDER_SUCCESS:
        return { ...state, fetchingOrder: false, order: payload }
      case GET_ORDER_FAILURE:
        return { ...state, fetchingOrder: false, order: null }      
      default:
        return state
    }
  }
  