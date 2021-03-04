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
    getMenuEpic.getMenu
)
