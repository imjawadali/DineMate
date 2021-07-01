export const LOCAL_URL = 'http://localhost:8000/'
export const PUBLIC_URL = 'http://ec2-52-15-148-90.us-east-2.compute.amazonaws.com/dev/'
export const CUSTOMER_APP_URL = 'http://ec2-52-15-148-90.us-east-2.compute.amazonaws.com/'
export const BASE_URL = 'http://ec2-52-15-148-90.us-east-2.compute.amazonaws.com/dev/'

export const API_ENDPOINTS = {
    customer: {
        login: 'customer/login',
        getAllRestaurants: 'customer/getAllRestaurants',
        getRestaurantDetails: 'customer/getRestaurantDetails',
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
        takeAwayOrder: '/customer/takeAwayOrder',
        updateProfile: '/customer/updateProfile',
        setNewPassword: '/customer/setNewPassword',
        getOrderStatus: '/customer/getOrderStatus',
        getAllOrders: '/customer/getMyOrders',
        searchResturant: '/customer/searchRestaurants'

    }
}
