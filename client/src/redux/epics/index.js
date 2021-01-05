import { combineEpics } from 'redux-observable'
import { loginEpic } from './admin/loginEpic'
import { getAllRestaurantsEpic } from './admin/getAllRestaurantsEpic'
import { generateQrsEpic } from './admin/generateQrsEpic'
import { getExistingQrsEpic } from './admin/getExistingQrsEpic'

export const epics = combineEpics(
    loginEpic.login,
    getAllRestaurantsEpic.getAllRestaurants,
    generateQrsEpic.generateQrs,
    getExistingQrsEpic.getExistingQrs
)
