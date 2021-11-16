import {
  GET_FEEDBACKS, GET_FEEDBACKS_SUCCESS, GET_FEEDBACKS_FAILURE,
  RESET_RESTAURANT
} from '../../constants'
  
export default (state = { fetchingFeedbacks: false, feedbacks: null }, { type, payload }) => {
  switch (type) {
    case GET_FEEDBACKS:
      return { ...state, fetchingFeedbacks: true }
    case GET_FEEDBACKS_SUCCESS:
      return { ...state, fetchingFeedbacks: false, feedbacks: payload }
    case GET_FEEDBACKS_FAILURE:
      return { ...state, fetchingFeedbacks: false, feedbacks: null }
    
    case RESET_RESTAURANT:
      return { ...state, feedbacks: null }
    default:
      return state
  }
}