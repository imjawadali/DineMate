export const LOCAL_URL = 'http://localhost:8000/'
export const PUBLIC_URL = 'http://ec2-52-15-148-90.us-east-2.compute.amazonaws.com/dev/'
export const CUSTOMER_APP_URL = 'http://ec2-52-15-148-90.us-east-2.compute.amazonaws.com/'
export const BUCKET_URL = 'https://dinematebucket.s3.amazonaws.com/'
export const BUCKET_URL_2 = 'https://dinematebucket.s3.us-east-2.amazonaws.com/'
export const BASE_URL = '/dev/'

export const API_ENDPOINTS = {
    admin: {
        login: 'admin/login',
        forgotPassword: 'admin/forgotPassword',
        createPassword: 'admin/createPassword',
        addRestuarant: 'admin/addRestuarant',
        getRestaurantToEdit: 'admin/getRestaurantToEdit',
        updateRestaurant: 'admin/updateRestaurant',
        generateQrs: 'admin/generateQrs',
        getAllRestaurants: 'admin/getAllRestaurants',
        getExistingQrs: 'admin/getExistingQrs',
        setTableName: 'admin/setTableName',
        getSuperAdminDashboard: 'admin/getSuperAdminDashboard',
        getRestaurantDashboard: 'admin/getRestaurantDashboard',
        getKitchenDashboard: 'admin/getKitchenDashboard',
        markItemReady: 'admin/markItemReady',
        markOrderReady: 'admin/markOrderReady',
        getTableOrders: 'admin/getTableOrders',
        getOrderItemDetails: 'admin/getOrderItemDetails',
        closeOrder: 'admin/closeOrder',
        mergeTables: 'admin/mergeTables',
        unMergeTables: 'admin/unMergeTables',
        getServicesQue: 'admin/getServicesQue',
        addCategory: 'admin/addCategory',
        getCategories: 'admin/getCategories',
        updateCategory: 'admin/updateCategory',
        deleteCategory: 'admin/deleteCategory',
        addMenuItem: 'admin/addMenuItem',
        getMenuItems: 'admin/getMenuItems',
        updateMenuItem: 'admin/updateMenuItem',
        addAddOn: 'admin/addAddOn',
        updateAddOn: 'admin/updateAddOn',
        getAllUsers: 'admin/getAllUsers',
        getRestaurantUsers: 'admin/getRestaurantUsers',
        addUser: 'admin/addUser',
        updateUser: 'admin/updateUser',
        deleteUser: 'admin/deleteUser',
        getOpenOrders:'admin/getOpenOrders',
        uploadToS3:'admin/uploadToS3',
        deleteFromS3:'admin/deleteFromS3'
    }
}
