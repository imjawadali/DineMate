import React from 'react'

import { SmallButton } from '../../../../components'

function TablesList(props) {
  
  const { history, restaurantId, tables } = props

  return (
    <div className="HorizontalScrollContainer">
      <table>
        <thead>
          <tr>
            <th>Table No</th>
            <th>Table Name</th>
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
                  <td>{active ? 'Active' : 'In-Active'}</td>
                  <td>
                    <SmallButton
                      style={{ width: '100%' }}
                      text="Details"
                      onClick={() => history.push({
                        pathname: `/admin/tablesManagement/tableDetails`, state: { table }
                      })}
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
