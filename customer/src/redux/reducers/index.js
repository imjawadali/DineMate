import { combineReducers } from 'redux'
import sessionReducer from './sessionReducer'
import restaurantsReducer from './restaurantsReducer'
import menuReducer from './menuReducer'
import orderReducer from './orderReducer'
import toastReducer from './toastReducer'
import profileReducer from './profileReducer'
import serviceReducer from './serviceReducer'
import getOrderItemsReducer from './getOrderItemsReducer'




export default combineReducers({
    sessionReducer,
    restaurantsReducer,
    menuReducer,
    orderReducer,
    toastReducer,
    profileReducer,
    serviceReducer,
    getOrderItemsReducer

})
