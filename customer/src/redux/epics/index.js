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
import { closeOrderViaCashEpic } from './admin/closeOrder'
import { takeAwayOrderEpic } from './admin/takeAwayOrder'
import { getOrderStatusEpic } from './admin/orderstatus'
import { getAllOrdersEpic } from './admin/getAllOrders'
import { searchResturantEpic } from './admin/searchResturant'
import { getTakeAwayOrderItemEpic } from './admin/getTakeOrderItem'
import { OrderDetailEpic } from './admin/getOrderDetailOrderEpic'

export const epics = combineEpics(
    loginEpic.login,
    getAllRestaurantsEpic.getAllRestaurants,
    getRestaurantDetailsEpic.getRestaurantDetails,
    initializeOrderEpic.initializeOrder,
    getMenuEpic.getMenu,
    signUpEpic.signUp,
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
    takeAwayOrderEpic.takeAwayOrder,
    getOrderStatusEpic.getOrderStatus,
    getAllOrdersEpic.getAllOrders,
    searchResturantEpic.searchResturant,
    getTakeAwayOrderItemEpic.getTakeAwayOrder,
    OrderDetailEpic.OrderDetail


)
