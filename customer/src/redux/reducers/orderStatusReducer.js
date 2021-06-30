import { 
  GET_STATUS,
  GET_STATUS_SUCCESS,
  GET_STATUS_FAILURE,
} from '../../constants'

export default (state = { fetchingStatus: false, status: null }, { type, payload }) => {
  switch (type) {
    case GET_STATUS:
      return { ...state, fetchingStatus: true }
    case GET_STATUS_SUCCESS:
      return { ...state, fetchingStatus: false, status: payload.status }
    case GET_STATUS_FAILURE:
      return { ...state, fetchingStatus: false }
    default:
      return state
  }
}
