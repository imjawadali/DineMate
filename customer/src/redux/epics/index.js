import { combineEpics } from 'redux-observable'
import { loginEpic } from './admin/loginEpic'
import { getAllRestaurantsEpic } from './admin/getAllRestaurantsEpic'
import { getRestaurantDetailsEpic } from './admin/getRestaurantDetailsEpic'
import { getMenuEpic } from './admin/getMenuEpic'

export const epics = combineEpics(
    loginEpic.login,
    getAllRestaurantsEpic.getAllRestaurants,
    getRestaurantDetailsEpic.getRestaurantDetails,
    getMenuEpic.getMenu
)
