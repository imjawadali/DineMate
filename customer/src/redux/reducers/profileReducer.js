import { 
  GET_RPOFILE,
  GET_RPOFILE_FAILURE,
  GET_RPOFILE_SUCCESS,
} from '../../constants'

export default (state = { fetchingProfile: false, profile: null }, { type, payload }) => {
  switch (type) {
    case GET_RPOFILE:
      return { ...state, fetchingProfile: true }
      case GET_RPOFILE_SUCCESS:
        return { ...state, fetchingProfile: false, profile: payload }
    case GET_RPOFILE_FAILURE:
      return { ...state, fetchingProfile: false }
    default:
      return state
  }
}
