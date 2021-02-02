import React from 'react'

import { Button } from '../../../../components'

function KitchenAdmin() {
  return (
    <div className="Container">
      <div className="PageTitleContainer">
        <h2>Kitchen Admin Dashboard</h2>
        <div className="PageTitleButtonContainer">
          <Button
            text="Refresh"
            iconLeft={<i className="fa fa-refresh" />}
            onClick={() => null} />
        </div>
      </div>
    </div>
  )
}

export default KitchenAdmin
