import {
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
  ADD_CATEGORY,
  ADD_CATEGORY_FAILURE,
  UPDATE_CATEGORY,
  UPDATE_CATEGORY_FAILURE,
  DELETE_CATEGORY,
  DELETE_CATEGORY_FAILURE,
  SET_RESTAURANT
} from '../../constants'

export default (state = { 
  fetchingCategories: false,
  addingCategory: false,
  updatingCategory: false,
  deletingCategory: false,
  categories: null
}, { type, payload }) => {
  switch (type) {
    case GET_CATEGORIES:
      return { ...state, fetchingCategories: true, addingCategory: false, updatingCategory: false, deletingCategory: false }
    case GET_CATEGORIES_SUCCESS:
      return { ...state, fetchingCategories: false, categories: payload }
    case GET_CATEGORIES_FAILURE:
      return { ...state, fetchingCategories: false }
    case ADD_CATEGORY:
      return { ...state, addingCategory: true }
    case ADD_CATEGORY_FAILURE:
      return { ...state, addingCategory: false }
    case UPDATE_CATEGORY:
      return { ...state, updatingCategory: true }
    case UPDATE_CATEGORY_FAILURE:
      return { ...state, updatingCategory: false }
    case DELETE_CATEGORY:
      return { ...state, deletingCategory: true }
    case DELETE_CATEGORY_FAILURE:
      return { ...state, deletingCategory: false }
    case SET_RESTAURANT:
      return { ...state, categories: null }
    default:
      return state
  }
}
