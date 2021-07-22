import {
  GET_RESTAURANT_SCHEDULE, GET_RESTAURANT_SCHEDULE_SUCCESS, GET_RESTAURANT_SCHEDULE_FAILURE,
  UPDATE_RESTAURANT_SCHEDULE, UPDATE_RESTAURANT_SCHEDULE_FAILURE
} from '../../constants'
  
export default (state = { fetchingRestaurantSchedule: false, restaurantSchedule: [], updatingRestaurantSchedule: false }, { type, payload }) => {
  switch (type) {
    case GET_RESTAURANT_SCHEDULE:
      return { ...state, fetchingRestaurantSchedule: true, updatingRestaurantSchedule: false }
    case GET_RESTAURANT_SCHEDULE_SUCCESS:
      return { ...state, fetchingRestaurantSchedule: false, restaurantSchedule: payload }
    case GET_RESTAURANT_SCHEDULE_FAILURE:
      return { ...state, fetchingRestaurantSchedule: false }

    case UPDATE_RESTAURANT_SCHEDULE:
      return { ...state, updatingRestaurantSchedule: true }
    case UPDATE_RESTAURANT_SCHEDULE_FAILURE:
      return { ...state, updatingRestaurantSchedule: false }

    default:
      return state
  }
}