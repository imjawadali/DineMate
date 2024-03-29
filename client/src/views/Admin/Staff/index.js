import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { customisedAction } from '../../../redux/actions'
import { GET_STAFF_ASSIGNED_TABLES, PER_PAGE_COUNTS } from '../../../constants'

import { Pagination, Input } from '../../../components'

import StaffList from './StaffList'

function Staff(props) {

  const [filterKey, setfilterKey] = useState('')
  const [currentIndex, setcurrentIndex] = useState(1)
  
  const fetchingStaffAssignedTables = useSelector(({ staffReducer }) => staffReducer.fetchingStaffAssignedTables)
  const staffAssignedTables = useSelector(({ staffReducer }) => staffReducer.staffAssignedTables)
  const admin = useSelector(({ sessionReducer }) => sessionReducer.admin)
  const dispatch = useDispatch()

  const { restaurantId } = admin

  useEffect(() => {
    if (!fetchingStaffAssignedTables && !staffAssignedTables) dispatch(customisedAction(GET_STAFF_ASSIGNED_TABLES, { restaurantId }))
  }, [])

  const getFilteredList = () => {
    let filteredQrs = staffAssignedTables
    if (filterKey && filterKey.length && staffAssignedTables) {
      filteredQrs = staffAssignedTables.filter(
        (staffAssignedTable) => staffAssignedTable.assignedTables.split(',').includes(filterKey)
      )
    }
    return filteredQrs
  }

  const paginate = (list) => {
    let paginatedList = list ? [ ...list ] : list
    if (currentIndex && list && list.length) {
      paginatedList = paginatedList.slice(((currentIndex * PER_PAGE_COUNTS) - PER_PAGE_COUNTS), (currentIndex * PER_PAGE_COUNTS))
    }
    return paginatedList
  }

  return (
    <div className="Container">
      <h2>Staff Management</h2>
      <div className="TabularContentContainer">
        <div className="TableTopContainer">
          <div className="TopLeftContainer">
          </div>
          <div className="TopRightContainer">
            <Input 
              style={{ border: 'none', borderBottom: '1px solid black', background: filterKey ? 'white' : 'transparent' }}
              placeholder="Search Table (by Name, Table #)"
              value={filterKey}
              onChange={({ target: { value } }) => {
                setfilterKey(value)
                setcurrentIndex(1)
              }}
            />
            <i
              style={{ margin: '0px 10px', color: filterKey ? 'red' : '' }}
              className={`fa fa-${filterKey ? 'times-circle' : fetchingStaffAssignedTables ? 'refresh fa-pulse' : 'refresh'} fa-lg`}
              onClick={() => filterKey ? setfilterKey('') : dispatch(customisedAction(GET_STAFF_ASSIGNED_TABLES, { restaurantId }))}/>
          </div>
        </div>
        <StaffList history={props.history} fetchingStaffAssignedTables={fetchingStaffAssignedTables} restaurantId={restaurantId} staffAssignedTables={paginate(getFilteredList())} />
        {getFilteredList() && getFilteredList().length && getFilteredList().length > PER_PAGE_COUNTS ? 
          <Pagination
            currentIndex={currentIndex}
            mappingCounts={Array(parseInt(getFilteredList().length / PER_PAGE_COUNTS) + 1).fill('0')}
            totalCounts={getFilteredList().length}
            perPageCounts={PER_PAGE_COUNTS}
            onClick={(index) => setcurrentIndex(index)}
          />
        : null}
      </div>
    </div>
  )
}

export default Staff
