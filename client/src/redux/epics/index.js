import { combineEpics } from 'redux-observable'
import { loginEpic } from './admin/loginEpic'
import { setFcmTokenEpic } from './admin/setFcmTokenEpic'
import { checkPasswordExpiryEpic } from './admin/checkPasswordExpiryEpic'
import { forgotPasswordEpic } from './admin/forgotPasswordEpic'
import { createPasswordEpic } from './admin/createPasswordEpic'
import { getAllRestaurantsEpic } from './admin/getAllRestaurantsEpic'
import { addRestaurantEpic } from './admin/addRestaurantEpic'
import { getRestaurantToEditEpic } from './admin/getRestaurantToEditEpic'
import { updateRestaurantEpic } from './admin/updateRestaurantEpic'
import { QrsEpic } from './admin/QrsEpic'
import { getExistingQrsEpic } from './admin/getExistingQrsEpic'
import { setTableNameEpic } from './admin/setTableNameEpic'
import { getGenericDataEpic } from './admin/getGenericDataEpic'
import { updateGenericDataEpic } from './admin/updateGenericDataEpic'
import { addFaqEpic } from './admin/addFaqEpic'
import { deleteFaqEpic } from './admin/deleteFaqEpic'
import { getSuperAdminDashboardEpic } from './admin/getSuperAdminDashboardEpic'
import { getRestaurantDashboardEpic } from './admin/getRestaurantDashboardEpic'
import { getKitchenDashboardEpic } from './admin/getKitchenDashboardEpic'
import { markItemReadyEpic } from './admin/markItemReadyEpic'
import { markOrderReadyEpic } from './admin/markOrderReadyEpic'
import { getTableOrdersEpic } from './admin/getTableOrdersEpic'
import { getOrderItemDetailsEpic } from './admin/getOrderItemDetailsEpic'
import { submitNewOrderEpic } from './admin/submitNewOrderEpic'
import { addItemsToOrderEpic } from './admin/addItemsToOrderEpic'
import { deleteItemEpic } from './admin/deleteItemEpic'
import { editItemEpic } from './admin/editItemEpic'
import { deleteOrderEpic } from './admin/deleteOrderEpic'
import { applyDiscountEpic } from './admin/applyDiscountEpic'
import { closeOrderEpic } from './admin/closeOrderEpic'
import { getOrdersEpic } from './admin/getOrdersEpic'
import { getOrderDetailsEpic } from './admin/getOrderDetailsEpic'
import { splitItemEpic } from './admin/splitItemEpic'
import { mergeTablesEpic } from './admin/mergeTablesEpic'
import { unMergeTablesEpic } from './admin/unMergeTablesEpic'
import { getServicesQueEpic } from './admin/getServicesQueEpic'
import { getStaffAssignedTablesEpic } from './admin/getStaffAssignedTablesEpic'
import { assignTablesToStaffEpic } from './admin/assignTablesToStaffEpic'
import { getCategoriesEpic } from './admin/getCategoriesEpic'
import { addCategoryEpic } from './admin/addCategoryEpic'
import { updateCategoryEpic } from './admin/updateCategoryEpic'
import { deleteCategoryEpic } from './admin/deleteCategoryEpic'
import { getUsersEpic } from './admin/getUsersEpic'
import { addUserEpic } from './admin/addUserEpic'
import { updateUserEpic } from './admin/updateUserEpic'
import { deleteUserEpic } from './admin/deleteUserEpic'
import { getMenuEpic } from './admin/getMenuEpic'
import { addMenuItemEpic } from './admin/addMenuItemEpic'
import { updateMenuItemEpic } from './admin/updateMenuItemEpic'
import { updateAddOnEpic } from './admin/updateAddOnEpic'
import { addAddOnEpic } from './admin/addAddOnEpic'
import { getRestaurantSettingsEpic } from './admin/getRestaurantSettingsEpic'
import { updateRestaurantSettingsEpic } from './admin/updateRestaurantSettingsEpic'
import { getRestaurantScheduleEpic } from './admin/getRestaurantScheduleEpic'
import { updateRestaurantScheduleEpic } from './admin/updateRestaurantScheduleEpic'
import { uploadToS3Epic } from './admin/uploadToS3Epic'
import { deleteFromS3Epic } from './admin/deleteFromS3Epic'
export const epics = combineEpics(
    loginEpic.login,
    setFcmTokenEpic.setFcmToken,
    checkPasswordExpiryEpic.checkPasswordExpiry,
    forgotPasswordEpic.forgotPassword,
    createPasswordEpic.createPassword,
    getAllRestaurantsEpic.getAllRestaurants,
    addRestaurantEpic.addRestaurant,
    getRestaurantToEditEpic.getRestaurantToEdit,
    updateRestaurantEpic.updateRestaurant,
    QrsEpic.generateQrs,
    QrsEpic.deleteQrs,
    getExistingQrsEpic.getExistingQrs,
    setTableNameEpic.setTableName,
    getGenericDataEpic.getGenericData,
    updateGenericDataEpic.updateGenericData,
    addFaqEpic.addFaq,
    deleteFaqEpic.deleteFaq,
    getSuperAdminDashboardEpic.getSuperAdminDashboard,
    getRestaurantDashboardEpic.getRestaurantDashboard,
    getKitchenDashboardEpic.getKitchenDashboard,
    markItemReadyEpic.markItemReady,
    markOrderReadyEpic.markOrderReady,
    getTableOrdersEpic.getTableOrders,
    getOrderItemDetailsEpic.getOrderItemDetails,
    submitNewOrderEpic.submitNewOrder,
    addItemsToOrderEpic.addItemsToOrder,
    deleteItemEpic.deleteItem,
    editItemEpic.editItem,
    deleteOrderEpic.deleteOrder,
    applyDiscountEpic.applyDiscount,
    getOrdersEpic.getOrders,
    getOrderDetailsEpic.getOrderDetails,
    closeOrderEpic.closeOrder,
    splitItemEpic.splitItem,
    mergeTablesEpic.mergeTables,
    unMergeTablesEpic.unMergeTables,
    getServicesQueEpic.getServicesQue,
    getStaffAssignedTablesEpic.getStaffAssignedTables,
    assignTablesToStaffEpic.assignTablesToStaff,
    getCategoriesEpic.getCategories,
    addCategoryEpic.addCategory,
    updateCategoryEpic.updateCategory,
    deleteCategoryEpic.deleteCategory,
    getUsersEpic.getUsers,
    addUserEpic.addUser,
    updateUserEpic.updateUser,
    deleteUserEpic.deleteUser,
    getMenuEpic.getMenu,
    addMenuItemEpic.addMenuItem,
    updateMenuItemEpic.updateMenuItem,
    updateAddOnEpic.updateAddOn,
    addAddOnEpic.addAddOn,
    getRestaurantSettingsEpic.getRestaurantSettings,
    updateRestaurantSettingsEpic.updateRestaurantSettings,
    getRestaurantScheduleEpic.getRestaurantSchedule,
    updateRestaurantScheduleEpic.updateRestaurantSchedule,
    uploadToS3Epic.uploadToS3,
    deleteFromS3Epic.deleteFromS3
)
