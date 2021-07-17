import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, DropDown, Input, SectionHeading, SmallTitle, TitleWithAction } from '../../../components'
import { GET_USERS, UPDATE_USER } from '../../../constants'
import { customisedAction } from '../../../redux/actions'

function UpdatePassword() {

  const [ownPassword, setownPassword] = useState(false)
  const [id, setid] = useState(false)
  const [password, setpassword] = useState(false)

  const admin = useSelector(({ sessionReducer }) => sessionReducer.admin)
  const fetchingUsers = useSelector(({ usersReducer }) => usersReducer.fetchingUsers)
  const updatingUser = useSelector(({ usersReducer }) => usersReducer.updatingUser)
  const users = useSelector(({ usersReducer }) => usersReducer.users)
  const dispatch = useDispatch()

  const { restaurantId } = admin

  useEffect(() => {
    setownPassword(true)
    setid(admin.id)
  }, [admin.id])

  const setUserAndId = (userId) => {
    setid(userId)
  }

  return (
    <div className="Container">
      <TitleWithAction
        text="Update Password"
        button={
          <Button
            text={fetchingUsers || updatingUser ? "Syncing" : "Refresh"}
            light={fetchingUsers || updatingUser}
            lightAction={() => null}
            iconLeft={<i className={`fa fa-refresh ${fetchingUsers || updatingUser ? 'fa-pulse' : ''}`} />}
            onClick={() => dispatch(customisedAction(GET_USERS, { restaurantId }))}
          />
        }
      />
      <div style={{ width: '100%', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
        <div className="TableButtons TableButtonGreen"
          style={{ opacity: ownPassword ? 0.5 : '' }}
          onClick={() => {
            setid(admin.id)
            setownPassword(true)
          }}>
          <p>Own Password</p>
        </div>
        <div className="TableButtons TableButtonGreen"
          style={{ opacity: !ownPassword ? 0.5 : '' }}
          onClick={() => {
            setid(null)
            setownPassword(false)
          }}>
          <p>Others Password</p>
        </div>
      </div>
      <div className="FormContainer" style={{ paddingTop: '0px', justifyContent: 'center' }}>
        <div className="FormInnerContainer">
          <div className="InputsContainer">
            {!ownPassword ? <div className="InputsInnerContainer">
              <SmallTitle text="Select User" />
              <DropDown
                placeholder="Select user"
                options={users ? users.filter(user => user.id !== admin.id).map(user => {
                  return {
                    label: user.name,
                    value: user.id
                  }
                }) : []}
                value={id}
                onChange={({ target: { value } }) => setUserAndId(value)}
              />
            </div> : null}
            <div className="InputsInnerContainer">
              <SmallTitle text="Password" />
              <Input
                placeholder="Enter password"
                type="password"
                value={null}
                onChange={({ target: { value } }) => setpassword(value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="ButtonContainer">
        <Button
          text="Submit"
          light={fetchingUsers || updatingUser || !id || !password}
          lightAction={() => null}
          iconLeft={<i className="fa fa-paper-plane" />}
          onClick={() => dispatch(customisedAction(UPDATE_USER, { id, userUpdatedData: { password }, restaurantId }))}
        />
      </div>
    </div>
  )
}

export default UpdatePassword
