import {
  ADD_FAQ,
  ADD_FAQ_FAILURE,
  GET_GENERIC_DATA, GET_GENERIC_DATA_FAILURE, GET_GENERIC_DATA_SUCCESS,
  UPDATE_GENERIC_DATA, UPDATE_GENERIC_DATA_FAILURE
} from '../../constants'
  
export default (state = { fetchingGenericData: false, updatingGenericData: false, addingFaq: false, genericData: {} }, { type, payload }) => {
  switch (type) {
    case GET_GENERIC_DATA:
      return { ...state, fetchingGenericData: true, updatingGenericData: false, addingFaq: false }
    case GET_GENERIC_DATA_SUCCESS:
      return { ...state, fetchingGenericData: false, genericData: payload }
    case GET_GENERIC_DATA_FAILURE:
      return { ...state, fetchingGenericData: false }

    case UPDATE_GENERIC_DATA:
      return { ...state, updatingGenericData: true }
    case UPDATE_GENERIC_DATA_FAILURE:
      return { ...state, updatingGenericData: false }

    case ADD_FAQ:
      return { ...state, addingFaq: true }
    case ADD_FAQ_FAILURE:
      return { ...state, addingFaq: false }

    default:
      return state
  }
}