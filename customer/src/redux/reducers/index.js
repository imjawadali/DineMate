import { combineReducers } from 'redux'
import sessionReducer from './sessionReducer'
import restaurantsReducer from './restaurantsReducer'
import menuReducer from './menuReducer'
import orderReducer from './orderReducer'
import toastReducer from './toastReducer'

export default combineReducers({
    sessionReducer,
    restaurantsReducer,
    menuReducer,
    orderReducer,
    toastReducer
})
