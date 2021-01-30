export const LOCAL_URL = 'http://localhost:8000/'
export const PUBLIC_URL = 'http://ec2-52-15-148-90.us-east-2.compute.amazonaws.com/dev/'
export const CUSTOMER_APP_URL = 'http://ec2-52-15-148-90.us-east-2.compute.amazonaws.com/'
export const BASE_URL = '/dev/'

export const API_ENDPOINTS = {
    admin: {
        login: 'admin/login',
        forgotPassword: 'admin/forgotPassword',
        createPassword: 'admin/createPassword',
        addRestuarant: 'admin/addRestuarant',
        generateQrs: 'admin/generateQrs',
        getAllRestaurants: 'admin/getAllRestaurants',
        getExistingQrs: 'admin/getExistingQrs',
        setTableName: '/admin/setTableName',
        getSuperAdminDashboard: 'admin/getSuperAdminDashboard'
    }
}
