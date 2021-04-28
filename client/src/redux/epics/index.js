import { combineEpics } from 'redux-observable'
import { loginEpic } from './admin/loginEpic'
import { forgotPasswordEpic } from './admin/forgotPasswordEpic'
import { createPasswordEpic } from './admin/createPasswordEpic'
import { getAllRestaurantsEpic } from './admin/getAllRestaurantsEpic'
import { addRestaurantEpic } from './admin/addRestaurantEpic'
import { generateQrsEpic } from './admin/generateQrsEpic'
import { getExistingQrsEpic } from './admin/getExistingQrsEpic'
import { setTableNameEpic } from './admin/setTableNameEpic'
import { getSuperAdminDashboardEpic } from './admin/getSuperAdminDashboardEpic'
import { getRestaurantDashboardEpic } from './admin/getRestaurantDashboardEpic'
import { getTableOrdersEpic } from './admin/getTableOrdersEpic'
import { getOrderItemDetailsEpic } from './admin/getOrderItemDetailsEpic'
import { closeOrderEpic } from './admin/closeOrderEpic'
import { mergeTablesEpic } from './admin/mergeTablesEpic'
import { unMergeTablesEpic } from './admin/unMergeTablesEpic'
import { getServicesQueEpic } from './admin/getServicesQueEpic'
import { getCategoriesEpic } from './admin/getCategoriesEpic'
import { addCategoryEpic } from './admin/addCategoryEpic'
import { updateCategoryEpic } from './admin/updateCategoryEpic'
import { deleteCategoryEpic } from './admin/deleteCategoryEpic'
import { getUsersEpic } from './admin/getUsersEpic'
import { updateUserEpic } from './admin/updateUserEpic'
import { deleteUserEpic } from './admin/deleteUserEpic'
import { getMenuEpic } from './admin/getMenuEpic'
import { addMenuItemEpic } from './admin/addMenuItemEpic'
import { uploadToS3Epic } from './admin/uploadToS3Epic'
import { deleteFromS3Epic } from './admin/deleteFromS3Epic'
import { getOpenOrdersEpic } from './admin/getOpenOrdersEpic'
export const epics = combineEpics(
    loginEpic.login,
    forgotPasswordEpic.forgotPassword,
    createPasswordEpic.createPassword,
    getAllRestaurantsEpic.getAllRestaurants,
    addRestaurantEpic.addRestaurant,
    generateQrsEpic.generateQrs,
    getExistingQrsEpic.getExistingQrs,
    setTableNameEpic.setTableName,
    getSuperAdminDashboardEpic.getSuperAdminDashboard,
    getRestaurantDashboardEpic.getRestaurantDashboard,
    getTableOrdersEpic.getTableOrders,
    getOrderItemDetailsEpic.getOrderItemDetails,
    closeOrderEpic.closeOrder,
    mergeTablesEpic.mergeTables,
    unMergeTablesEpic.unMergeTables,
    getServicesQueEpic.getServicesQue,
    getCategoriesEpic.getCategories,
    addCategoryEpic.addCategory,
    updateCategoryEpic.updateCategory,
    deleteCategoryEpic.deleteCategory,
    getUsersEpic.getUsers,
    updateUserEpic.updateUser,
    deleteUserEpic.deleteUser,
    getMenuEpic.getMenu,
    addMenuItemEpic.addMenuItem,
    uploadToS3Epic.uploadToS3,
    deleteFromS3Epic.deleteFromS3,
    getOpenOrdersEpic.getOpenOrders
)
