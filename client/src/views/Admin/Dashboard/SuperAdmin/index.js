import React from 'react'

import { DashboardBatches } from '../../../../components'

import '../styles.css'

function SuperAdmin(props) {
  return (
    <div className="Container">
      <h2>Dashboard</h2>
      <div className="DashBoardContainer">
        <div className="DashBoardSectionsContainer">
          <DashboardBatches
            text="200 Restaurants"
            iconName="fa fa-cutlery"
            onClick={() => null}
          />
          <DashboardBatches
            text="4000 Users"
            iconName="fa fa-users"
            onClick={() => null}
          />
        </div>
        <div className="DashBoardSectionsContainer">
          <DashboardBatches
            text="500 QR Codes"
            iconName="fa fa-qrcode"
            onClick={() => null}
          />
        </div>
      </div>
    </div>
  )
}

export default SuperAdmin
