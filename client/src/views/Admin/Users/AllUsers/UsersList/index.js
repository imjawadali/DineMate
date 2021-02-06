import React from 'react'
import { useDispatch } from 'react-redux'

import { customisedAction } from '../../../../../redux/actions'
import { UPDATE_USER } from '../../../../../constants'

import { SmallButton } from '../../../../../components'

function UsersList(props) {
  
  const { users } = props
  const dispatch = useDispatch()

  const enable_disable = (id, active) => {
    dispatch(customisedAction(UPDATE_USER, { id, userUpdatedData: { active }}))
  }

  return (
    <div className="HorizontalScrollContainer">
      <table>
        <thead>
          <tr>
            <th>Restaurant Name</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length ?
            users.map((user) => {
              const { id, name, email, contactNumber, role, restaurantName, active } = user
              return (
                <tr key={id}>
                  <td>{restaurantName}</td>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{contactNumber || '-'}</td>
                  <td>{role}</td>
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
                </tr>
              )
            }) : 
            <tr>
              <td colSpan="7" style={{ textAlign: 'center' }}>No Data Found!</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default UsersList
