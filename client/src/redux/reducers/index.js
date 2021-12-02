import { combineReducers } from 'redux'
import sessionReducer from './sessionReducer'
import restaurantsReducer from './restaurantsReducer'
import restaurantReducer from './restaurantReducer'
import dashboardReducer from './dashboardReducer'
import categoriesReducer from './categoriesReducer'
import menuReducer from './menuReducer'
import usersReducer from './usersReducer'
import ordersReducer from './ordersReducer'
import staffReducer from './staffReducer'
import feedbacksReducer from './feedbacksReducer'
import reservationsReducer from './reservationsReducer'
import genericDataReducer from './genericDataReducer'
import scheduleReducer from './scheduleReducer'
import fileUploadReducer from './fileUploadReducer'
import toastReducer from './toastReducer'

export default combineReducers({
    sessionReducer,
    restaurantsReducer,
    restaurantReducer,
    dashboardReducer,
    categoriesReducer,
    menuReducer,
    usersReducer,
    ordersReducer,
    staffReducer,
    feedbacksReducer,
    reservationsReducer,
    genericDataReducer,
    scheduleReducer,
    fileUploadReducer,
    toastReducer
})
