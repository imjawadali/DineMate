import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { customisedAction } from '../../../../redux/actions'
import { GET_USERS } from '../../../../constants'

import { Button, Input } from '../../../../components'

import UsersList from './UsersList'

function AllUsers(props) {

  const [usersFetchCalled, setusersFetchCalled] = useState(false)
  const [filterKey, setfilterKey] = useState('')

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

  return (
    <div className="Container">
      <h2>Users Management</h2>
      <div className="TopOptionsContainer">
        <div className="TopInputContainer">
          <Input 
            placeholder="Search Users (by Name, Restaurant Name, Role, Email)"
            value={filterKey}
            onChange={({ target: { value } }) => setfilterKey(value)}
          />
        </div>
        <div className="TopButtonContainer">
          <Button
            text={filterKey ? "Clear" : fetchingUsers ? "Syncing" : "Refresh"}
            light={fetchingUsers}
            lightAction={() => null}
            iconLeft={<i className={`fa fa-${filterKey ? 'times-circle' : fetchingUsers ? 'refresh fa-pulse' : 'refresh'}`} />}
            onClick={() => filterKey ? setfilterKey('') : dispatch(customisedAction(GET_USERS))} />
        </div>
      </div>
      <UsersList fetchingUsers={fetchingUsers} users={getFilteredList()} />
    </div>
  )
}

export default AllUsers
