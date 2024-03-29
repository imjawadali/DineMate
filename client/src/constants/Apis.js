export const LOCAL_URL = 'http://localhost:8000/'
export const PUBLIC_URL = 'http://ec2-52-15-148-90.us-east-2.compute.amazonaws.com/dev/'
export const CUSTOMER_APP_URL = 'http://ec2-52-15-148-90.us-east-2.compute.amazonaws.com/'
export const BUCKET_URL = 'https://dinematebucket.s3.amazonaws.com/'
export const BUCKET_URL_2 = 'https://dinematebucket.s3.us-east-2.amazonaws.com/'
export const BASE_URL = '/dev/'

export const API_ENDPOINTS = {
    admin: {
        login: 'admin/login',
        setFcmToken: 'admin/setFcmToken',
        checkPasswordExpiry: 'admin/checkPasswordExpiry',
        forgotPassword: 'admin/forgotPassword',
        createPassword: 'admin/createPassword',
        addRestuarant: 'admin/addRestuarant',
        getRestaurantToEdit: 'admin/getRestaurantToEdit',
        updateRestaurant: 'admin/updateRestaurant',
        generateQrs: 'admin/generateQrs',
        deleteQrs: 'admin/deleteQrs',
        getAllRestaurants: 'admin/getAllRestaurants',
        getExistingQrs: 'admin/getExistingQrs',
        setTableName: 'admin/setTableName',
        getGenericData: 'admin/getGenericData',
        updateGenericData: 'admin/updateGenericData',
        addFaq: 'admin/addFaq',
        deleteFaq: 'admin/deleteFaq',
        getSuperAdminDashboard: 'admin/getSuperAdminDashboard',
        getRestaurantDashboard: 'admin/getRestaurantDashboard',
        getKitchenDashboard: 'admin/getKitchenDashboard',
        getStaffDashboard: 'admin/getStaffDashboard',
        markItemReady: 'admin/markItemReady',
        markOrderReady: 'admin/markOrderReady',
        getTableOrders: 'admin/getTableOrders',
        getOrderItemDetails: 'admin/getOrderItemDetails',
        getOrders: 'admin/getOrders',
        getOrderDetails: 'admin/getOrderDetails',
        addItemsToOrder: 'admin/addItemsToOrder',
        submitNewOrder: 'admin/submitNewOrder',
        deleteItem: 'admin/deleteItem',
        editItem: 'admin/editItem',
        deleteOrder: 'admin/deleteOrder',
        applyDiscount: 'admin/applyDiscount',
        closeOrder: 'admin/closeOrder',
        itemSplit: 'admin/itemSplit',
        mergeTables: 'admin/mergeTables',
        unMergeTables: 'admin/unMergeTables',
        getServicesQue: 'admin/getServicesQue',
        getStaffAssignedTables: 'admin/getStaffAssignedTables',
        assignTablesToStaff: 'admin/assignTablesToStaff',
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
        getRestaurantSettings: 'admin/getRestaurantSettings',
        updateRestaurantSettings: 'admin/updateRestaurantSettings',
        getRestaurantSchedule: 'admin/getRestaurantSchedule',
        updateRestaurantSchedule: 'admin/updateRestaurantSchedule',
        uploadToS3: 'admin/uploadToS3',
        deleteFromS3: 'admin/deleteFromS3'
    }
}
