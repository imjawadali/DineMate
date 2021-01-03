import { combineReducers } from 'redux'
import sessionReducer from './sessionReducer'
import toastReducer from './toastReducer'

export default combineReducers({
    sessionReducer,
    toastReducer
})
