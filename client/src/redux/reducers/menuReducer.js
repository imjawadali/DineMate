import {
  GET_MENU,
  GET_MENU_SUCCESS,
  GET_MENU_FAILURE,
  ADD_MENU,
  ADD_MENU_FAILURE,
  SET_RESTAURANT
} from '../../constants'

export default (state = { 
  fetchingMenu: false,
  addingMenu: false,
  menu: null
}, { type, payload }) => {
  switch (type) {
    case GET_MENU:
      return { ...state, fetchingMenu: true, addingMenu: false }
    case GET_MENU_SUCCESS:
      return { ...state, fetchingMenu: false, menu: payload }
    case GET_MENU_FAILURE:
      return { ...state, fetchingMenu: false, menu: null }
    case ADD_MENU:
      return { ...state, addingMenu: true }
    case ADD_MENU_FAILURE:
      return { ...state, addingMenu: false }
    case SET_RESTAURANT:
      return { ...state, menu: null }
    default:
      return state
  }
}
