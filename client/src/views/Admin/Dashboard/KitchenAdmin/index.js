import React from 'react'

import { Button } from '../../../../components'

function KitchenAdmin() {
  return (
    <div className="Container">
      <div className="PageTitleContainer">
        <h2>Kitchen Admin Dashboard</h2>
        <div className="PageTitleButtonContainer">
          <Button
            text={true ? "Syncing" : "Refresh"}
            iconLeft={<i className={`fa fa-refresh ${true ? 'fa-pulse' : ''}`} />}
            onClick={() => null} />
        </div>
      </div>
    </div>
  )
}

export default KitchenAdmin
