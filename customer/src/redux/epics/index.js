import { combineEpics } from 'redux-observable'
import { loginEpic } from './customer/loginEpic'
import { getAllRestaurantsEpic } from './customer/getAllRestaurantsEpic'
import { getRestaurantDetailsEpic } from './customer/getRestaurantDetailsEpic'
import { initializeOrderEpic } from './customer/initializeOrderEpic'
import { getMenuEpic } from './customer/getMenuEpic'
import { signUpEpic } from './customer/singUpEpic'
import { forgotPsswordEpic } from './customer/forgetPassword'
import { addOrderEpic } from './customer/addOrderEpic'
import { submitOrderEpic } from './customer/submitOrder'
import { callForServiceEpic } from './customer/callForServiceEpic'
import { getOrderItemEpic } from './customer/getOrderItem'
import { closeOrderViaCashEpic } from './customer/closeOrder'
import { takeAwayOrderEpic } from './customer/takeAwayOrder'
import { getOrderStatusEpic } from './customer/orderstatus'
import { getAllOrdersEpic } from './customer/getAllOrders'
import { searchResturantEpic } from './customer/searchResturant'
import { getTakeAwayOrderItemEpic } from './customer/getTakeOrderItem'
import { OrderDetailEpic } from './customer/getOrderDetailOrderEpic'
import { getGenericDataEpic } from './customer/getGenericData'
import { orderGetStatusEpic } from './customer/getOrderStatus'

export const epics = combineEpics(
    loginEpic.login,
    getAllRestaurantsEpic.getAllRestaurants,
    getGenericDataEpic.getGenericData,
    getRestaurantDetailsEpic.getRestaurantDetails,
    initializeOrderEpic.initializeOrder,
    getMenuEpic.getMenu,
    signUpEpic.signUp,
    signUpEpic.registerRestuarant,
    forgotPsswordEpic.forgetPassword,
    forgotPsswordEpic.setNewPassword,
    addOrderEpic.addOrder,
    addOrderEpic.editOrder,
    addOrderEpic.deleteOrder,
    addOrderEpic.deleteAllOrder,
    submitOrderEpic.submitOrder,
    loginEpic.getProfile,
    loginEpic.updateProfile,
    callForServiceEpic.addService,
    callForServiceEpic.doNotDisturb,
    getOrderItemEpic.getOrder,
    closeOrderViaCashEpic.closeOrderViaCash,
    closeOrderViaCashEpic.closeOrderViaStripe,
    takeAwayOrderEpic.takeAwayOrder,
    getOrderStatusEpic.getOrderStatus,
    getAllOrdersEpic.getAllOrders,
    searchResturantEpic.searchResturant,
    getTakeAwayOrderItemEpic.getTakeAwayOrder,
    OrderDetailEpic.OrderDetail,
    orderGetStatusEpic.getOrderStatus


)
