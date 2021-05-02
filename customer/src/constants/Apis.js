export const LOCAL_URL = 'http://localhost:8000/'
export const PUBLIC_URL = 'http://ec2-52-15-148-90.us-east-2.compute.amazonaws.com/dev/'
export const CUSTOMER_APP_URL = 'http://ec2-52-15-148-90.us-east-2.compute.amazonaws.com/'
export const BASE_URL = PUBLIC_URL

export const API_ENDPOINTS = {
    customer: {
        login: 'customer/login',
        getAllRestaurants: 'customer/getAllRestaurants',
        getRestaurantDetails: 'customer/getRestaurantDetails',
        getMenuItems: 'customer/getMenuItems'
    }
}
