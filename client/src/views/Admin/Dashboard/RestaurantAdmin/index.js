import React from 'react'

import { DashboardBatches } from '../../../../components'

function RestaurantAdmin(props) {
  return (
    <div className="Container">
      <h2>Restaurant Dashboard</h2>
      <div className="DashBoardContainer">
        <div className="DashBoardSectionsContainer">
          <DashboardBatches
            text="10 Open Checks"
            iconName="fa fa-coffee"
            onClick={() => null}
          />
          <DashboardBatches
            text="100 Closed Checks"
            iconName="fa fa-ban"
            onClick={() => null}
          />
        </div>
        <div className="DashBoardSectionsContainer">
          <DashboardBatches
            text="10 Active Tables"
            iconName="fa fa-table"
            onClick={() => null}
          />
        </div>
      </div>
    </div>
  )
}

export default RestaurantAdmin
