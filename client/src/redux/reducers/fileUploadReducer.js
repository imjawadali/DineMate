import {
  UPLOAD_TO_S3,
  UPLOAD_TO_S3_SUCCESS,
  UPLOAD_TO_S3_FAILURE,
  REMOVE_FILE
} from '../../constants'
  
export default (state = { uploading: false, imageUrl: null }, { type, payload }) => {
  switch (type) {
    case UPLOAD_TO_S3:
      return { ...state, uploading: true, imageUrl: null }
    case UPLOAD_TO_S3_SUCCESS:
      return { ...state, uploading: false, imageUrl: payload.imageUrl }
    case UPLOAD_TO_S3_FAILURE:
      return { ...state, uploading: false, imageUrl: null }
    case REMOVE_FILE:
      return { ...state, imageUrl: null }
    default:
      return state
  }
}