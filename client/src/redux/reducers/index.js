import { combineReducers } from 'redux'
import sessionReducer from './sessionReducer'
import restaurantsReducer from './restaurantsReducer'
import restaurantReducer from './restaurantReducer'
import categoriesReducer from './categoriesReducer'
import toastReducer from './toastReducer'

export default combineReducers({
    sessionReducer,
    restaurantsReducer,
    restaurantReducer,
    categoriesReducer,
    toastReducer
})
