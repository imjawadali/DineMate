import {
  CLOSE_ORDER_SUCCESS, HIDE_RATING_DIALOG, SUBMIT_RATING
} from '../../constants'

export default (state = {
  showRating: false
}, { type, payload }) => {
  switch (type) {
    case CLOSE_ORDER_SUCCESS:
      return { ...state, showRating: true }
    case SUBMIT_RATING:
      return { ...state, showRating: false }
    case HIDE_RATING_DIALOG:
      return { ...state, showRating: false }
    default:
      return state
  }
}
