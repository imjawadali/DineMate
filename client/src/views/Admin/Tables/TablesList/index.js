import React from 'react'
import { useDispatch } from 'react-redux'

import { customisedAction } from '../../../../redux/actions'
import { RESTAURANT_CHANGED, SET_RESTAURANT } from '../../../../constants'

import { SmallButton } from '../../../../components'

function TablesList(props) {
  
  const { restaurantId, tables } = props
  const dispatch = useDispatch()

  return (
    <div className="HorizontalScrollContainer">
      <table>
        <thead>
          <tr>
            <th>Table No</th>
            <th>Table Name</th>
            <th>Check No</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tables && tables.length ?
            tables.map((table) => {
              const { id, tableName, value, active } = table
              const tableNumber = value.replace(`${restaurantId}/`, '')
              return (
                <tr key={id}>
                  <td>{tableNumber.length === 1 ? '0' : null}{tableNumber}</td>
                  <td>{tableName || '-'}</td>
                  <td>001</td>
                  <td>{active ? 'Open' : 'Close'}</td>
                  <td>
                    <SmallButton
                      style={{ width: '100%' }}
                      text="Details"
                      onClick={() => null}
                    />
                  </td>
                </tr>
              )
            }) : 
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>No Data Found!</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default TablesList
