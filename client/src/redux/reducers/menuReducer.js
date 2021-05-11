import {
  GET_MENU,
  GET_MENU_SUCCESS,
  GET_MENU_FAILURE,
  ADD_MENU,
  ADD_MENU_SUCCESS,
  ADD_MENU_FAILURE,
  RESET_RESTAURANT,
  UPDATE_MENU,
  UPDATE_MENU_SUCCESS,
  UPDATE_MENU_FAILURE,
  UPDATE_ADDON,
  UPDATE_ADDON_SUCCESS,
  UPDATE_ADDON_FAILURE,
  ADD_ADDON,
  ADD_ADDON_SUCCESS,
  ADD_ADDON_FAILURE
} from '../../constants'

export default (state = { 
  fetchingMenu: false,
  addingMenu: false,
  updatingMenu: false,
  processingAddOn: false,
  menu: null
}, { type, payload }) => {
  switch (type) {
    case GET_MENU:
      return { ...state, fetchingMenu: true, addingMenu: false, updatingMenu: false, processingAddOn: false }
    case GET_MENU_SUCCESS:
      return { ...state, fetchingMenu: false, menu: payload }
    case GET_MENU_FAILURE:
      return { ...state, fetchingMenu: false, menu: null }
    case ADD_MENU:
      return { ...state, addingMenu: true }
    case ADD_MENU_SUCCESS:
      return { ...state, addingMenu: false }
    case ADD_MENU_FAILURE:
      return { ...state, addingMenu: false }
    case UPDATE_MENU:
      return { ...state, updatingMenu: true }
    case UPDATE_MENU_SUCCESS:
      return { ...state, updatingMenu: false }
    case UPDATE_MENU_FAILURE:
      return { ...state, updatingMenu: false }
    case ADD_ADDON:
      return { ...state, processingAddOn: true }
    case ADD_ADDON_SUCCESS:
      return { ...state, processingAddOn: false }
    case ADD_ADDON_FAILURE:
      return { ...state, processingAddOn: false }
    case UPDATE_ADDON:
      return { ...state, processingAddOn: true }
    case UPDATE_ADDON_SUCCESS:
      return { ...state, processingAddOn: false }
    case UPDATE_ADDON_FAILURE:
      return { ...state, processingAddOn: false }
    case RESET_RESTAURANT:
      return { ...state, menu: null }
    default:
      return state
  }
}
