import React from 'react'

function StaffList(props) {
  
  const { fetchingStaffAssignedTables, staffAssignedTables } = props

  return (
    <div className="TableDataContainer">
      <table>
        <thead>
          <tr>
            <th>Staff Name</th>
            <th>Table(s) Assigned</th>
          </tr>
        </thead>
        <tbody>
          {staffAssignedTables && staffAssignedTables.length ?
            staffAssignedTables.map((staffAssignedTable) => {
              const { id, name, assignedTables } = staffAssignedTable
              return (
                <tr key={id}>
                  <td>{name}</td>
                  <td style={{ width: '60vw'}}>{assignedTables}</td>
                </tr>
              )
            }) : 
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>{
                fetchingStaffAssignedTables ?
                  <p><i className="fa fa-refresh fa-pulse" style={{ padding: '0px 5px' }} />Fetching / Syncing Tables . . .</p>
                : 'No Data Found!'
              }</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default StaffList
