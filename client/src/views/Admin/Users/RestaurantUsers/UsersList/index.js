import React from 'react'
import { useDispatch } from 'react-redux'

import { customisedAction } from '../../../../../redux/actions'
import { DELETE_USER, SET_TOAST, UPDATE_USER } from '../../../../../constants'

import { TableActionicons } from '../../../../../components'

function UsersList(props) {

  const { adminId, restaurantId, fetchingUsers, users } = props
  const dispatch = useDispatch()

  const enable_disable = (id, active) => {
    dispatch(customisedAction(UPDATE_USER, { id, userUpdatedData: { active }, restaurantId }))
  }

  return (
    <div className="TableDataContainer">
      <table>
        <thead>
          <tr>
            <th>Manage</th>
            <th>Name</th>
            <th>Role</th>
            <th>Level</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length ?
            users.map((user) => {
              const { id, name, email, contactNumber, role, primaryContactId, secondaryContactId, active } = user
              return (
                <tr key={id}>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                      <TableActionicons
                        icon={`fa fa-${active ? 'ban' : 'thumbs-up'}`}
                        onClick={() => enable_disable(id, !active)}
                      />
                      <TableActionicons
                        style={{ color: id === adminId ? 'rgba(0, 0, 0, 0.2)' : '' }}
                        icon={`fa fa-trash`}
                        onClick={() => id !== adminId ?
                          dispatch(customisedAction(DELETE_USER, { id, restaurantId }))
                          : null
                        }
                      />
                    </div>
                  </td>
                  <td>{name}</td>
                  <td>{role}</td>
                  <td>{primaryContactId === id ? 'Primary' : secondaryContactId === id ? 'Secondary' : '-'}</td>
                  <td>{email}</td>
                  <td>{contactNumber || '-'}</td>
                  <td>{active ? 'Active' : 'In-Active'}</td>
                </tr>
              )
            }) :
            <tr>
              <td colSpan="8" style={{ textAlign: 'center' }}>{
                fetchingUsers ?
                  <p><i className={`fa fa-refresh ${fetchingUsers ? 'fa-pulse' : ''}`} style={{ padding: '0px 5px' }} />Fetching / Syncing Users . . .</p>
                  : 'No Data Found!'
              }</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default UsersList
