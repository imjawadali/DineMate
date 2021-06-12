import React from 'react'

import { SmallButton } from '../../../../components'

function TablesList(props) {
  
  const { history, restaurantId, fetchingQrs, tables } = props

  return (
    <div className="TableDataContainer">
      <table>
        <thead>
          <tr>
            <th style={{ borderRight: 'none' }}>Manage</th>
            <th style={{ borderLeft: 'none' }}>Table No</th>
            <th>Table Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tables && tables.length ?
            tables.map((table) => {
              const { id, tableName, value, active } = table
              return (
                <tr key={id}>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'row'}}>
                      <TableActionicons
                        icon="fa-info-circle"
                        onClick={() => history.push({
                          pathname: `/client/admin/tablesManagement/tableDetails`, state: { table, restaurantId }
                        })}
                      />
                    </div>
                  </td>
                  <td>{value.length === 1 ? '0' : null}{value}</td>
                  <td>{tableName || '-'}</td>
                  <td>{active ? 'Active' : 'In-Active'}</td>
                </tr>
              )
            }) : 
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>{
                fetchingQrs ?
                  <p><i className={`fa fa-refresh ${fetchingQrs ? 'fa-pulse' : ''}`} style={{ padding: '0px 5px' }} />Fetching / Syncing Tables . . .</p>
                : 'No Data Found!'
              }</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default TablesList
