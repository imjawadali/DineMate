import {
  SET_TOAST, RESET_TOAST, SET_TOAST_DISMISSING,
  GET_ALL_RESTAURANTS_FAILURE,
  GET_MENU_FAILURE,
  GET_RESTAURANT_DETAILS,
  GET_RESTAURANT_DETAILS_SUCCESS,
  GET_RESTAURANT_DETAILS_FAILURE,
  SET_ORDER,
  INITIALIZE_ORDER_FAILURE,
  SIGN_IN,
  SET_SESSION,
  SIGN_IN_FAILURE,
  SIGN_UP,
  ALREADY_IN_CART,
  CALL_FOR_SERVICE,
  CALL_FOR_SERVICE_SUCCESS,
  CALL_FOR_SERVICE_FAILURE,
  DONOTDISTURB,
  DONOTDISTURB_SUCCESS,
  DONOTDISTURB_FAILURE,
  CLOSE_ORDER,
  CLOSE_ORDER_SUCCESS,
  CLOSE_ORDER_FAILURE,
  UPDATE_RPOFILE_SUCCESS,
  CANT_SIGN_OUT,
  CANT_PAY,
  SIGN_UP_FAILURE,
  TAKIE_AWAY_ORDER_FAILED,
  REGISTER_RESTURENT,
  CLOSE_ORDER_VIA_STRIPE,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  SET_NEW_PASSWORD_SUCCESS,
  SET_NEW_PASSWORD_FAILURE,
  SET_FCM_TOKEN_FAILURE,
  ORDER_CHECK_DONE,
  SUBMIT_RATING,
  SUBMIT_RATING_FAILURE,
  SUBMIT_RATING_SUCCESS,
  APPLY_REWARD_POINTS_SUCCESS,
  APPLY_REWARD_POINTS,
  APPLY_REWARD_POINTS_FAILURE,
  SEARCH_RESTURANT_FAILURE,
  RESERVATION,
  RESERVATION_SUCCESS,
  RESERVATION_FAILURE
} from '../../constants'

export default (state = { toast: null, toastSetDismiss: false }, { type, payload }) => {
  switch (type) {
    case SET_TOAST:
      return { ...state, toast: payload }
    case RESET_TOAST:
      return { ...state, toast: null }
    case SET_TOAST_DISMISSING:
      return { ...state, toastSetDismiss: payload }
    case SIGN_IN:
      return { ...state, toastSetDismiss: true, toast: { message: 'Singing You In!' } }
    case SIGN_UP:
      return { ...state, toastSetDismiss: true, toast: { message: 'Singing Up' } }
    case REGISTER_RESTURENT:
      return { ...state, toastSetDismiss: true, toast: { message: 'Requesting admin to resgistered Your Resturent!' } }
    case SET_SESSION:
      return { ...state, toastSetDismiss: true }
    case ORDER_CHECK_DONE:
      return { ...state, toastSetDismiss: true, toast: payload.toast }
    case SIGN_IN_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }
    case SET_FCM_TOKEN_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }
    case GET_ALL_RESTAURANTS_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }
    case SEARCH_RESTURANT_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }
    case GET_MENU_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }
    case GET_RESTAURANT_DETAILS:
      return { ...state, toastSetDismiss: true, toast: { message: 'Fetching restaurant data' } }
    case GET_RESTAURANT_DETAILS_SUCCESS:
      return { ...state, toastSetDismiss: true }
    case GET_RESTAURANT_DETAILS_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }
    case SET_ORDER:
      return { ...state, toast: payload.toast }
    case ALREADY_IN_CART:
      return { ...state, toast: payload }
    case CALL_FOR_SERVICE:
      return { ...state, toastSetDismiss: true, toast: payload.toast }
    case CALL_FOR_SERVICE_SUCCESS:
      return { ...state, toastSetDismiss: true, toast: payload.toast }
    case CALL_FOR_SERVICE_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload.toast }
    case DONOTDISTURB:
      return { ...state, toastSetDismiss: true, toast: payload.toast }
    case DONOTDISTURB_SUCCESS:
      return { ...state, toastSetDismiss: true, toast: payload.toast }
    case DONOTDISTURB_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload.toast }
    case CLOSE_ORDER:
      return { ...state, toastSetDismiss: true, toast: { message: "Closing your order" } }
    case CLOSE_ORDER_VIA_STRIPE:
      return { ...state, toastSetDismiss: true, toast: { message: "Closing your order" } }
    case CLOSE_ORDER_SUCCESS:
      return { ...state, toastSetDismiss: true, toast: payload.toast }
    case CLOSE_ORDER_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }
    case UPDATE_RPOFILE_SUCCESS:
      return { ...state, toastSetDismiss: true, toast: payload.toast }
    case TAKIE_AWAY_ORDER_FAILED:
      console.log(payload)
      return { ...state, toastSetDismiss: true, toast: payload }
    case CANT_SIGN_OUT:
      return { ...state, toastSetDismiss: true, toast: { message: "You Can't Sign Out The Cart Need To Be Clear", type: 'error' } }
    case CANT_PAY:
      return { ...state, toastSetDismiss: true, toast: { message: "Submit Order From Cart Before Pay", type: 'error' } }
    case SIGN_UP_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }
    case INITIALIZE_ORDER_FAILURE:
      return { ...state, toast: payload }
    case FORGOT_PASSWORD_SUCCESS:
      return { ...state, toast: payload }
    case FORGOT_PASSWORD_FAILURE:
      return { ...state, toast: payload }
    case SET_NEW_PASSWORD_SUCCESS:
      return { ...state, toast: payload }
    case SET_NEW_PASSWORD_FAILURE:
      return { ...state, toast: payload }
    case SUBMIT_RATING:
      return { ...state, toast: { message: "Submitting Rating" } }
    case SUBMIT_RATING_SUCCESS:
      return { ...state, toastSetDismiss: true, toast: payload }
    case SUBMIT_RATING_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }

    case APPLY_REWARD_POINTS:
      return { ...state, toast: { message: "Applying Reward Points" } }
    case APPLY_REWARD_POINTS_SUCCESS:
      return { ...state, toastSetDismiss: true, toast: payload.toast }
    case APPLY_REWARD_POINTS_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }

    case RESERVATION:
      return { ...state, toast: { message: "Requesting Reservation" } }
    case RESERVATION_SUCCESS:
    case RESERVATION_FAILURE:
      return { ...state, toastSetDismiss: true, toast: payload }

    default:
      return state
  }
}
