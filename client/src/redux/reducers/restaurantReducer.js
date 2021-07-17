import {
  GET_EXISTING_QRS,
  GET_EXISTING_QRS_SUCCESS,
  GET_EXISTING_QRS_FAILURE,
  RESTAURANT_CHANGED,
  RESET_RESTAURANT,
  GENERATE_QRS,
  GENERATE_QRS_SUCCESS,
  GENERATE_QRS_FAILURE,
  SET_TABLE_NAME,
  SET_TABLE_NAME_FAILURE,
  GET_RESTAURANT_SETTINGS,
  GET_RESTAURANT_SETTINGS_SUCCESS,
  GET_RESTAURANT_SETTINGS_FAILURE,
  UPDATE_RESTAURANT_SETTINGS,
  UPDATE_RESTAURANT_SETTINGS_FAILURE
} from '../../constants'

export default (state = {
    fetchingQrs: false,
    generatingQrs: false, qrs: null,
    settingTableName: false,
    fetchingRestaurantSettings: false, restaurantSettings: {},
    updatingRestaurantSettings: false
  }, { type, payload }) => {
  switch (type) {
    case GET_EXISTING_QRS:
      return { ...state, fetchingQrs: true, settingTableName: false }
    case GET_EXISTING_QRS_SUCCESS:
      return { ...state, fetchingQrs: false, qrs: payload }
    case GET_EXISTING_QRS_FAILURE:
      return { ...state, fetchingQrs: false }
    
    case GENERATE_QRS:
      return { ...state, generatingQrs: true }
    case GENERATE_QRS_SUCCESS:
      return { ...state, generatingQrs: false, fetchingQrs: true }
    case GENERATE_QRS_FAILURE:
      return { ...state, generatingQrs: false }
    
    case SET_TABLE_NAME:
      return { ...state, settingTableName: true }
    case SET_TABLE_NAME_FAILURE:
      return { ...state, settingTableName: false }
    
    case GET_RESTAURANT_SETTINGS:
      return { ...state, fetchingRestaurantSettings: true, updatingRestaurantSettings: false }
    case GET_RESTAURANT_SETTINGS_SUCCESS:
      return { ...state, fetchingRestaurantSettings: false, restaurantSettings: payload }
    case GET_RESTAURANT_SETTINGS_FAILURE:
      return { ...state, fetchingRestaurantSettings: false }
    
    case UPDATE_RESTAURANT_SETTINGS:
      return { ...state, updatingRestaurantSettings: true }
    case UPDATE_RESTAURANT_SETTINGS_FAILURE:
      return { ...state, updatingRestaurantSettings: false }
    
    case RESTAURANT_CHANGED:
      return { ...state, qrs: null }
    case RESET_RESTAURANT:
      return { ...state, qrs: null }
    default:
      return state
  }
}
