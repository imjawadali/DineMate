import React from 'react'
import { useDispatch } from 'react-redux'

import { customisedAction } from '../../../../../redux/actions'
import { DELETE_USER, SET_TOAST, UPDATE_USER } from '../../../../../constants'

import { SmallButton, SmallButtonRed } from '../../../../../components'

function UsersList(props) {
  
  const { adminId, restaurantId, users } = props
  const dispatch = useDispatch()

  const enable_disable = (id, active) => {
    dispatch(customisedAction(UPDATE_USER, { id, userUpdatedData: { active }, restaurantId }))
  }

  return (
    <div className="HorizontalScrollContainer">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Role</th>
            <th>Level</th>
            <th>Status</th>
            <th>Action</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length ?
            users.map((user) => {
              const { id, name, email, contactNumber, role, primaryContactId, secondaryContactId, active } = user
              return (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{contactNumber || '-'}</td>
                  <td>{role}</td>
                  <td>{primaryContactId === id ? 'Primary' : secondaryContactId === id ? 'Secondary' : '-'}</td>
                  <td>{active ? 'Active' : 'In-Active'}</td>
                  <td>
                    <SmallButton
                      style={{ width: '100%' }}
                      text={active ? "Disable" : "Enable"}
                      light={active}
                      lightAction={() => enable_disable(id, !active)}
                      iconLeft={<i className={`fa fa-${active ? 'ban' : 'thumbs-up'}`} />}
                      onClick={() => enable_disable(id, !active)}
                    />
                  </td>
                  <td>
                    <SmallButtonRed
                      style={{ width: '100%' }}
                      text="Delete"
                      light={adminId === id}
                      lightAction={() => dispatch(customisedAction(SET_TOAST, { message: 'Can\'t delete own account!', type: 'warning'}))}
                      iconLeft={<i className="fa fa-trash" />}
                      onClick={() => dispatch(customisedAction(DELETE_USER, { id, restaurantId }))}
                    />
                  </td>
                </tr>
              )
            }) : 
            <tr>
              <td colSpan="8" style={{ textAlign: 'center' }}>No Data Found!</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default UsersList
