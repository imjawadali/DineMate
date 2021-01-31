import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Button, DashboardBatches } from '../../../../components'
import { GET_CATEGORIES, GET_SUPER_ADMIN_DASHBOARD } from '../../../../constants'
import { customisedAction } from '../../../../redux/actions'

function RestaurantAdmin(props) {

  const fetchingDashboard = useSelector(({ sessionReducer }) => sessionReducer.fetchingDashboard)
  const restaurantDashboard = useSelector(({ sessionReducer }) => sessionReducer.restaurantDashboard)
  const admin = useSelector(({ sessionReducer }) => sessionReducer.admin)

  const fetchingCategories = useSelector(({ categoriesReducer }) => categoriesReducer.fetchingCategories)
  const categories = useSelector(({ categoriesReducer }) => categoriesReducer.categories)
  const dispatch = useDispatch()

  const { restaurantId } = admin

  useEffect(() => {
    // if (!restaurantDashboard)
    //   dispatch(customisedAction(GET_SUPER_ADMIN_DASHBOARD))
    if (fetchingCategories && !categories)
      dispatch(customisedAction(GET_CATEGORIES, { restaurantId }))
  }, [])

  return (
    <div className="Container">
      <div className="PageTitleContainer">
        <h2>Restaurant Dashboard</h2>
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
        {/* {restaurantDashboard ? <> */}
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
              onClick={() => props.history.push('/admin/tablesManagement')}
            />
          </div>
        {/* </> : null} */}
      </div>
    </div>
  )
}

export default RestaurantAdmin
