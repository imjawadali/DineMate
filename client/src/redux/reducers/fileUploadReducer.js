import {
  UPLOAD_TO_S3,
  UPLOAD_TO_S3_SUCCESS,
  UPLOAD_TO_S3_FAILURE,
  DELETE_FROM_S3_SUCCESS,
  ADD_MENU_SUCCESS
} from '../../constants'
  
export default (state = { imageUrl: null, uploading: false }, { type, payload }) => {
  switch (type) {
    case UPLOAD_TO_S3:
      return { ...state, uploading: true }
    case UPLOAD_TO_S3_SUCCESS:
      return { ...state, uploading: false, imageUrl: payload.imageUrl }
    case UPLOAD_TO_S3_FAILURE:
      return { ...state, uploading: false }
    
    case DELETE_FROM_S3_SUCCESS:
      return { ...state, imageUrl: null }
    
    case ADD_MENU_SUCCESS:
      return { ...state, imageUrl: null }
    default:
      return state
  }
}