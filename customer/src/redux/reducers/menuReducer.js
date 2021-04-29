import { 
  GET_MENU,
  GET_MENU_SUCCESS,
  GET_MENU_FAILURE
} from '../../constants'

export default (state = { fetchingMenu: false, menu: null }, { type, payload }) => {
  switch (type) {
    case GET_MENU:
      return { ...state, fetchingMenu: true, menu: null }
    case GET_MENU_SUCCESS:
      return { ...state, fetchingMenu: false, menu: payload }
    case GET_MENU_FAILURE:
      return { ...state, fetchingMenu: false }
    default:
      return state
  }
}
