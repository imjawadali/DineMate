import { 
  UPDATE_RPOFILE,
  UPDATE_RPOFILE_FAILURE,
  UPDATE_RPOFILE_SUCCESS,
} from '../../constants'

export default (state = { fetchingUpdate: false, updateProfile: null }, { type, payload }) => {
  switch (type) {
    case UPDATE_RPOFILE:
      return { ...state, fetchingUpdate: true }
      case UPDATE_RPOFILE_SUCCESS:
        return { ...state, fetchingUpdate: false, updateProfile: payload }
    case UPDATE_RPOFILE_FAILURE:
      return { ...state, fetchingUpdate: false }
    default:
      return state
  }
}
