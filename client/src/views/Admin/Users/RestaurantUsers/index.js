import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { customisedAction } from '../../../../redux/actions'
import { ADD_USER, GET_USERS, PER_PAGE_COUNTS, SET_TOAST, SET_TOAST_DISMISSING } from '../../../../constants'

import { Button, DropDown, Input, Pagination, SectionHeading, SmallTitle, TitleWithAction } from '../../../../components'

import UsersList from './UsersList'

function RestaurantUsers() {

  const [userDialogOpen, setuserDialogOpen] = useState(false)
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [role, setrole] = useState('')
  const [contactNumber, setcontactNumber] = useState('')
  const [filterKey, setfilterKey] = useState('')
  const [currentIndex, setcurrentIndex] = useState(1)

  const fetchingUsers = useSelector(({ usersReducer }) => usersReducer.fetchingUsers)
  const addingUser = useSelector(({ usersReducer }) => usersReducer.addingUser)
  const users = useSelector(({ usersReducer }) => usersReducer.users)
  const admin = useSelector(({ sessionReducer }) => sessionReducer.admin)
  const dispatch = useDispatch()

  const { id, restaurantId } = admin

  useEffect(() => {
    if (fetchingUsers) reset()
  }, [fetchingUsers])

  useEffect(() => {
    if (!fetchingUsers && !users) dispatch(customisedAction(GET_USERS))
  }, [])

  const reset = () => {
    setname('')
    setemail('')
    setrole('')
    setcontactNumber('')
    setuserDialogOpen(false)
  }

  const validate = () => {
    if (!name)
      return 'Name is required!'
    if (!role)
      return 'Role is required!'
    if (!email)
      return 'Email is required!'
    return false
  }

  const addUser = () => {
    dispatch(customisedAction(ADD_USER, { restaurantId, name, role, email, contactNumber }))
  }

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

  const paginate = (list) => {
    let paginatedList = list ? [...list] : list
    if (currentIndex && list && list.length) {
      paginatedList = paginatedList.slice(((currentIndex * PER_PAGE_COUNTS) - PER_PAGE_COUNTS), (currentIndex * PER_PAGE_COUNTS))
    }
    return paginatedList
  }

  return (
    <div className="Container">
      <TitleWithAction
        text="Users Management"
        noMargin
        button={<Button
          text={userDialogOpen ? 'Cancel' : 'Add Users'}
          light={userDialogOpen}
          lightAction={() => reset()}
          iconLeft={<i className={`fa fa-${userDialogOpen ? 'times-circle' : 'user-plus'}`} />}
          onClick={() => setuserDialogOpen(true)}
        />}
      />
      {userDialogOpen ?
        <div className="FormContainer" style={{ justifyContent: 'center' }}>
          <div className="FormInnerContainer">
            <SectionHeading text="User Details" />
            <div className="InputsContainer">
              <div className="InputsInnerContainer" style={{ flexDirection: 'row', paddingTop: '0px' }}>
                <div className="InputsInnerContainer" style={{ width: '50%', paddingRight: '7px' }}>
                  <SmallTitle text="Name" />
                  <Input
                    placeholder="John Doe"
                    value={name}
                    onChange={({ target: { value } }) => setname(value)}
                  />
                </div>
                <div className="InputsInnerContainer" style={{ width: '50%', paddingLeft: '7px' }}>
                  <SmallTitle text="Role" />
                  <DropDown
                    placeholder="Select role"
                    options={['Admin', 'Kitchen', 'Staff']}
                    value={role}
                    onChange={({ target: { value } }) => setrole(value)}
                  />
                </div>
              </div>
              <div className="InputsInnerContainer">
                <SmallTitle text="Email" />
                <Input
                  placeholder={`john.doe@${restaurantId}.com`}
                  value={email}
                  onChange={({ target: { value } }) => setemail(value)}
                />
              </div>
              <div className="InputsInnerContainer">
                <SmallTitle text="Contact Number (Optional)" />
                <Input
                  placeholder={`+1 315-8731014`}
                  type="number"
                  value={contactNumber}
                  onChange={({ target: { value } }) => setcontactNumber(value)}
                />
              </div>
              <div className="InputsInnerContainer">
                <Button
                  text={'Submit'}
                  light={!!validate() || addingUser}
                  lightAction={() => {
                    dispatch(customisedAction(SET_TOAST_DISMISSING))
                    dispatch(customisedAction(SET_TOAST, {
                      message: validate() || 'Adding user in progress',
                      type: validate() ? 'error' : 'success'
                    }))
                  }}
                  iconLeft={<i className={`fa fa-${addingUser ? 'refresh' : 'send'} ${addingUser ? 'fa-pulse' : ''}`} />}
                  onClick={() => addUser()}
                />
              </div>
            </div>
          </div>
        </div>
        : <>
          <div className="TabularContentContainer">
            <div className="TableTopContainer">
              <div className="TopLeftContainer" />
              <div className="TopRightContainer">
                <Input
                  style={{ border: 'none', borderBottom: '1px solid black', background: filterKey ? 'white' : 'transparent' }}
                  placeholder="Search Users (by Name, Role, Email)"
                  value={filterKey}
                  onChange={({ target: { value } }) => {
                    setfilterKey(value)
                    setcurrentIndex(1)
                  }}
                />
                <i
                  style={{ margin: '0px 10px', color: filterKey ? 'red' : '' }}
                  className={`fa fa-${filterKey ? 'times-circle' : fetchingUsers ? 'refresh fa-pulse' : 'refresh'} fa-lg`}
                  onClick={() => filterKey ? setfilterKey('') : dispatch(customisedAction(GET_USERS, { restaurantId }))} />
              </div>
            </div>
            <UsersList adminId={id} fetchingUsers={fetchingUsers} restaurantId={restaurantId} users={paginate(getFilteredList())} />
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
        </>}
    </div>
  )
}

export default RestaurantUsers
