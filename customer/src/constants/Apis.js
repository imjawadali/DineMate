export const LOCAL_URL = 'http://localhost:8000/'
export const PUBLIC_URL = 'https://dinemate.com/dev/'
export const CUSTOMER_APP_URL = 'https://dinemate.com/'
export const BASE_URL = PUBLIC_URL

export const API_ENDPOINTS = {
    customer: {
        login: 'customer/login',
        setFcmToken: 'customer/setFcmToken',
        registerRestuarant: 'customer/registerRestuarant',
        getAllRestaurants: 'customer/getAllRestaurants',
        getGenericData: 'customer/getGenericData',
        getRestaurantDetails: 'customer/getRestaurantDetails',
        submitRating: 'customer/submitRating',
        initializeOrder: 'customer/initializeOrder',
        getMenuItems: 'customer/getMenuItems',
        signUp: 'customer/signUp',
        forgetPassword: '/customer/forgotPassword',
        addSingleItem: '/customer/addSingleItem',
        submitOrder: '/customer/submitOrder',
        getProfile: '/customer/getProfile',
        callForService: '/customer/requestService',
        doNotDisturb: '/customer/doNotDisturb',
        getOrderItem: '/customer/getOrderItems',
        closeOrderViaCash: '/customer/closeOrderViaCash',
        closeOrderViaStripe: '/customer/closeOrderViaStripe',
        takeAwayOrder: '/customer/takeAwayOrder',
        updateProfile: '/customer/updateProfile',
        setNewPassword: '/customer/setNewPassword',
        getOrderStatus: '/customer/getOrderStatus',
        getMyOrders: '/customer/getMyOrders',
        getReOrderDetails: '/customer/getReOrderDetails',
        searchResturant: '/customer/searchRestaurants',
        applyRewardPoints: '/customer/applyRewardPoints',
        reservation: '/customer/reservation'
    }
}
