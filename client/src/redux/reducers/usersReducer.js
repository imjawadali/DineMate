import {
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  ADD_USER,
  ADD_USER_FAILURE,
  UPDATE_USER,
  UPDATE_USER_FAILURE,
  DELETE_USER,
  DELETE_USER_FAILURE,
  SET_RESTAURANT,
  RESET_RESTAURANT
} from '../../constants'

export default (state = { 
  fetchingUsers: false,
  addingUser: false,
  updatingUser: false,
  deletingUser: false,
  users: null
}, { type, payload }) => {
  switch (type) {
    case GET_USERS:
      return { ...state, fetchingUsers: true, addingUser: false, updatingUser: false, deletingUser: false }
    case GET_USERS_SUCCESS:
      return { ...state, fetchingUsers: false, users: payload }
    case GET_USERS_FAILURE:
      return { ...state, fetchingUsers: false, users: null }
    
    case ADD_USER:
      return { ...state, addingUser: true }
    case ADD_USER_FAILURE:
      return { ...state, addingUser: false }
    
    case UPDATE_USER:
      return { ...state, updatingUser: true }
    case UPDATE_USER_FAILURE:
      return { ...state, updatingUser: false }
    
    case DELETE_USER:
      return { ...state, deletingUser: true }
    case DELETE_USER_FAILURE:
      return { ...state, deletingUser: false }
    
    case SET_RESTAURANT:
      return { ...state, users: null }
    
    case RESET_RESTAURANT:
      return { ...state, users: null }
    default:
      return state
  }
}
