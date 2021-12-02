import {
  GET_RESERVATIONS, GET_RESERVATIONS_SUCCESS, GET_RESERVATIONS_FAILURE,
  UPDATE_RESERVATION, UPDATE_RESERVATION_FAILURE,
  RESET_RESTAURANT
} from '../../constants'

export default (state = { fetchingReservations: false, updatingReservation: false, reservations: null }, { type, payload }) => {
  switch (type) {
    case GET_RESERVATIONS:
      return { ...state, fetchingReservations: true, updatingReservation: false }
    case GET_RESERVATIONS_SUCCESS:
      return { ...state, fetchingReservations: false, reservations: payload }
    case GET_RESERVATIONS_FAILURE:
      return { ...state, fetchingReservations: false, reservations: null }

    case UPDATE_RESERVATION:
      return { ...state, updatingReservation: true }
    case UPDATE_RESERVATION_FAILURE:
      return { ...state, updatingReservation: false }

    case RESET_RESTAURANT:
      return { ...state, fetchingReservations: false, updatingReservation: false, reservations: null }
    default:
      return state
  }
}