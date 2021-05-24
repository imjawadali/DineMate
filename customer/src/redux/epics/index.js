import { combineEpics } from 'redux-observable'
import { loginEpic } from './admin/loginEpic'
import { getAllRestaurantsEpic } from './admin/getAllRestaurantsEpic'
import { getRestaurantDetailsEpic } from './admin/getRestaurantDetailsEpic'
import { initializeOrderEpic } from './admin/initializeOrderEpic'
import { getMenuEpic } from './admin/getMenuEpic'

export const epics = combineEpics(
    loginEpic.login,
    getAllRestaurantsEpic.getAllRestaurants,
    getRestaurantDetailsEpic.getRestaurantDetails,
    initializeOrderEpic.initializeOrder,
    getMenuEpic.getMenu
)
