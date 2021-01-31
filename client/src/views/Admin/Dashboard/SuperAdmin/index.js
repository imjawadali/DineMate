import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Button, DashboardBatches } from '../../../../components'
import { GET_SUPER_ADMIN_DASHBOARD } from '../../../../constants'
import { customisedAction } from '../../../../redux/actions'

import '../styles.css'

function SuperAdmin(props) {

  const fetchingDashboard = useSelector(({ sessionReducer }) => sessionReducer.fetchingDashboard)
  const adminDashboard = useSelector(({ sessionReducer }) => sessionReducer.adminDashboard)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!adminDashboard)
      dispatch(customisedAction(GET_SUPER_ADMIN_DASHBOARD))
  }, [])

  return (
    <div className="Container">
      <div className="PageTitleContainer">
        <h2>Dashboard</h2>
        <div className="PageTitleButtonContainer">
          <Button
            text="Refresh"
            light={fetchingDashboard}
            lightAction={() => null}
            iconLeft={<i className="fa fa-refresh" />}
            onClick={() => dispatch(customisedAction(GET_SUPER_ADMIN_DASHBOARD))} />
        </div>
      </div>
      <div className="DashBoardContainer">
        {fetchingDashboard ?
          <div className="loadingContainer">
            <p><i className="fa fa-refresh" style={{ paddingRight: '5px' }} />Fetching Dashboard Data . . .</p>
          </div> : null
        }
        {adminDashboard ? <>
          <div className="DashBoardSectionsContainer">
            <DashboardBatches
              text={`${adminDashboard.restaurants} Restaurants`}
              iconName="fa fa-cutlery"
              onClick={() => props.history.push('/admin/restaurants')}
            />
            <DashboardBatches
              text={`${adminDashboard.admins} Admins`}
              iconName="fa fa-user"
              onClick={() => null}
            />
          </div>
          <div className="DashBoardSectionsContainer">
            <DashboardBatches
              text={`${adminDashboard.qrs} QRs`}
              iconName="fa fa-qrcode"
              onClick={() => null}
            />
          </div>
        </> : null}
      </div>
    </div>
  )
}

export default SuperAdmin
