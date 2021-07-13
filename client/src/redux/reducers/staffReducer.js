import {
  ASSIGN_TABLES_TO_STAFF, ASSIGN_TABLES_TO_STAFF_FAILURE,
  GET_STAFF_ASSIGNED_TABLES, GET_STAFF_ASSIGNED_TABLES_FAILURE, GET_STAFF_ASSIGNED_TABLES_SUCCESS,
  RESET_RESTAURANT
} from '../../constants'
  
export default (state = { fetchingStaffAssignedTables: false, staffAssignedTables: [], assigningTablesToStaff: false }, { type, payload }) => {
  switch (type) {
    case GET_STAFF_ASSIGNED_TABLES:
      return { ...state, fetchingStaffAssignedTables: true, assigningTablesToStaff: false }
    case GET_STAFF_ASSIGNED_TABLES_SUCCESS:
      return { ...state, fetchingStaffAssignedTables: false, staffAssignedTables: payload }
    case GET_STAFF_ASSIGNED_TABLES_FAILURE:
      return { ...state, fetchingStaffAssignedTables: false }
    
    case ASSIGN_TABLES_TO_STAFF:
      return { ...state, assigningTablesToStaff: true }
    case ASSIGN_TABLES_TO_STAFF_FAILURE:
      return { ...state, assigningTablesToStaff: false }
    
    case RESET_RESTAURANT:
      return { ...state, staffAssignedTables: null }
    default:
      return state
  }
}