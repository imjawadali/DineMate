import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom'

import SideBar from './SideBar'
import NavBar from './NavBar'

import SuperAdmin from './Dashboard/SuperAdmin'
import RestaurantAdmin from './Dashboard/RestaurantAdmin'
import AddRestaurant from './AddRestaurant'
import Restaurants from './Restaurants'
import GenerateQrs from './GenerateQrs'
import ViewQr from './ViewQr'
import EditRestaurant from './EditRestaurant'
import Tables from './Tables'
import TableDetails from './TableDetails'
import Others from './Others'
import NoRoute from '../NoRoute'

import './styles.css'

function Admin(props) {

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const admin = useSelector(({ sessionReducer }) => sessionReducer.admin)

  const openSidebar = () => {
      setSidebarOpen(true)
  }

  const closeSidebar = () => {
      setSidebarOpen(false)
  }

  let { path } = useRouteMatch()

  props.history.listen(() => closeSidebar())

  const SuperAdminRoutes = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
          admin.role === "SuperAdmin" ? 
          <Component {...props} /> : <Redirect to={{ pathname: '/admin', state: { from: props.location.pathname } }} />
      )} />
  )

  const RestaurantAdminRoutes = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
          admin.restaurantId ? 
          <Component {...props} /> : <Redirect to={{ pathname: '/admin', state: { from: props.location.pathname } }} />
      )} />
  )

  return (
    <div className="container">
      <div className="sidebarContainer">
        <SideBar admin={admin} sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
      </div>
      <div className="mainContainer">
        <NavBar openSidebar={openSidebar} />
        <div className="Main">
          <Switch>
            <Route exact path={path}>
              <Redirect to={admin.restaurantId ? `${path}/dashboard/restaurantAdmin` : `${path}/dashboard/superAdmin`} />
            </Route>
            <Route path={`${path}/dashboard`}>
              <Switch>
                <SuperAdminRoutes path={`${path}/dashboard/superAdmin`} component={SuperAdmin} />
                <RestaurantAdminRoutes path={`${path}/dashboard/restaurantAdmin`} component={RestaurantAdmin} />
              </Switch>
            </Route>
            <SuperAdminRoutes path={`${path}/addRestaurant`} component={AddRestaurant} />
            <SuperAdminRoutes exact path={`${path}/restaurants`} component={Restaurants} />
            <Route path={`${path}/qrsManagement`}>
              <Switch>
                <SuperAdminRoutes exact path={`${path}/qrsManagement`} component={GenerateQrs} />
                <SuperAdminRoutes path={`${path}/qrsManagement/viewQr`} component={ViewQr} />
              </Switch>
            </Route>
            <SuperAdminRoutes path={`${path}/editRestaurant`} component={EditRestaurant} />
            <Route path={`${path}/tablesManagement`}>
              <Switch>
                <RestaurantAdminRoutes exact path={`${path}/tablesManagement`} component={Tables} />
                <RestaurantAdminRoutes path={`${path}/tablesManagement/tableDetails`} component={TableDetails} />
              </Switch>
            </Route>
            <RestaurantAdminRoutes path={`${path}/others`} component={Others} />
            {admin.restaurantId ?
              <SuperAdminRoutes component={NoRoute} />
              : <RestaurantAdminRoutes component={NoRoute} />
            }
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default Admin
