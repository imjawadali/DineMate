import { 
  GET_ORDER_STATUS,
  GET_ORDER_STATUS_SUCCESS,
  GET_ORDER_STATUS_FAILURE,
} from '../../constants'

export default (state = { fetchingStatus: false, status: null }, { type, payload }) => {
  switch (type) {
    case GET_ORDER_STATUS:
      console.log(payload,'statusPayload')
      return { ...state, fetchingStatus: true }
    case GET_ORDER_STATUS_SUCCESS:
      return { ...state, fetchingStatus: false, status: payload.status }
    case GET_ORDER_STATUS_FAILURE:
      return { ...state, fetchingStatus: false }
    default:
      return state
  }
}
