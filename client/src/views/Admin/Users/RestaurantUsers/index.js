import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { customisedAction } from '../../../../redux/actions'
import { GET_USERS } from '../../../../constants'

import { Button, Input } from '../../../../components'

import UsersList from './UsersList'

function RestaurantUsers(props) {

  const [usersFetchCalled, setusersFetchCalled] = useState(false)
  const [filterKey, setfilterKey] = useState('')

  const fetchingUsers = useSelector(({ usersReducer }) => usersReducer.fetchingUsers)
  const users = useSelector(({ usersReducer }) => usersReducer.users)
  const admin = useSelector(({ sessionReducer }) => sessionReducer.admin)
  const dispatch = useDispatch()

  const { id, restaurantId } = admin

  useEffect(() => {
    if (!usersFetchCalled && !fetchingUsers && !users) {
      setusersFetchCalled(true)
      dispatch(customisedAction(GET_USERS, { restaurantId }))
    }
  }, [])

  const getFilteredList = () => {
    let filteredUsers = users
    if (filterKey && filterKey.length && users) {
      filteredUsers = users.filter(
        (user) => user.name.toLowerCase().includes(filterKey.toLowerCase())
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
            onClick={() => filterKey ? setfilterKey('') : dispatch(customisedAction(GET_USERS, { restaurantId }))} />
        </div>
      </div>
      {fetchingUsers && !users ?
        <div className="loadingContainer">
          <p><i className={`fa fa-refresh ${fetchingUsers ? 'fa-pulse' : ''}`} style={{ padding: '0px 5px' }} />Fetching / Syncing Users . . .</p>
        </div> : null
      }
      <UsersList adminId={id} restaurantId={restaurantId} users={getFilteredList()} />
    </div>
  )
}

export default RestaurantUsers
