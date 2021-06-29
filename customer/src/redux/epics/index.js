import { combineEpics } from 'redux-observable'
import { loginEpic } from './admin/loginEpic'
import { getAllRestaurantsEpic } from './admin/getAllRestaurantsEpic'
import { getRestaurantDetailsEpic } from './admin/getRestaurantDetailsEpic'
import { initializeOrderEpic } from './admin/initializeOrderEpic'
import { getMenuEpic } from './admin/getMenuEpic'
import { signUpEpic } from './admin/singUpEpic'
import { forgotPsswordEpic } from './admin/forgetPassword'
import { addOrderEpic } from './admin/addOrderEpic'
import { submitOrderEpic } from './admin/submitOrder'
import { callForServiceEpic } from './admin/callForServiceEpic'
import { getOrderItemEpic } from './admin/getOrderItem'

export const epics = combineEpics(
    loginEpic.login,
    getAllRestaurantsEpic.getAllRestaurants,
    getRestaurantDetailsEpic.getRestaurantDetails,
    initializeOrderEpic.initializeOrder,
    getMenuEpic.getMenu,
    signUpEpic.signUp,
    forgotPsswordEpic.forgetPassword,
    addOrderEpic.addOrder,
    submitOrderEpic.submitOrder,
    loginEpic.getProfile,
    callForServiceEpic.addService,
    callForServiceEpic.doNotDisturb,
    getOrderItemEpic.getOrder

)
