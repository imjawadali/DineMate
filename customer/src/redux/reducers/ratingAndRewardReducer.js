import {
  APPLY_REWARD_POINTS_SUCCESS,
  CLOSE_ORDER_SUCCESS, HIDE_RATING_DIALOG, HIDE_REWARD_DIALOG, SHOW_REWARD_DIALOG, SUBMIT_RATING
} from '../../constants'

export default (state = {
  showRatingDialog: false, showRewardDialog: false, reward: {}
}, { type, payload }) => {
  switch (type) {
    case CLOSE_ORDER_SUCCESS:
      return { ...state, showRatingDialog: true, reward: payload.reward }
    case SUBMIT_RATING:
      return { ...state, showRatingDialog: false, reward: {} }
    case HIDE_RATING_DIALOG:
      return { ...state, showRatingDialog: false, reward: {} }

    case SHOW_REWARD_DIALOG:
      return { ...state, showRewardDialog: true, reward: payload }
    case HIDE_REWARD_DIALOG:
      return { ...state, showRewardDialog: false, reward: {} }
    case APPLY_REWARD_POINTS_SUCCESS:
      return { ...state, showRewardDialog: false, reward: {} }
    default:
      return state
  }
}
