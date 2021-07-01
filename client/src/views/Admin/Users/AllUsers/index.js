import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { customisedAction } from '../../../../redux/actions'
import { GET_USERS, PER_PAGE_COUNTS } from '../../../../constants'

import { Button, Input, Pagination } from '../../../../components'

import UsersList from './UsersList'

function AllUsers() {

  const [usersFetchCalled, setusersFetchCalled] = useState(false)
  const [filterKey, setfilterKey] = useState('')
  const [currentIndex, setcurrentIndex] = useState(1)

  const fetchingUsers = useSelector(({ usersReducer }) => usersReducer.fetchingUsers)
  const users = useSelector(({ usersReducer }) => usersReducer.users)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!usersFetchCalled && !fetchingUsers && !users) {
      setusersFetchCalled(true)
      dispatch(customisedAction(GET_USERS))
    }
  }, [])

  const getFilteredList = () => {
    let filteredUsers = users
    if (filterKey && filterKey.length && users) {
      filteredUsers = users.filter(
        (user) => user.name.toLowerCase().includes(filterKey.toLowerCase())
        || user.restaurantName.toLowerCase().includes(filterKey.toLowerCase())
        || user.role.toLowerCase().includes(filterKey.toLowerCase())
        || user.email.toLowerCase().includes(filterKey.toLowerCase())
      )
    }
    return filteredUsers
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
      <h2>Users Management</h2>
      <div className="TabularContentContainer">
        <div className="TableTopContainer">
          <div className="TopLeftContainer" />
          <div className="TopRightContainer">
            <Input 
              style={{ border: 'none', borderBottom: '1px solid black', background: filterKey ? 'white' : 'transparent' }}
              placeholder="Search Users (by Name, Restaurant Name, Role, Email)"
              value={filterKey}
              onChange={({ target: { value } }) => {
                setfilterKey(value)
                setcurrentIndex(1)
              }}
            />
            <i
              style={{ margin: '0px 10px', color: filterKey ? 'red' : '' }}
              className={`fa fa-${filterKey ? 'times-circle' : fetchingUsers ? 'refresh fa-pulse' : 'refresh'} fa-lg`}
              onClick={() => filterKey ? setfilterKey('') : dispatch(customisedAction(GET_USERS))}/>
          </div>
        </div>
      <UsersList fetchingUsers={fetchingUsers} users={paginate(getFilteredList())} />
      </div>
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
  )
}

export default AllUsers
