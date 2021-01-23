import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom'

import SideBar from './SideBar'
import NavBar from './NavBar'

import Dashboard from './Dashboard'
import AddRestaurant from './AddRestaurant'
import Restaurants from './Restaurants'
import EditRestaurant from './EditRestaurant'
import GenerateQrs from './GenerateQrs'
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
            <Route exact path={path} component={Dashboard} />
            <SuperAdminRoutes path={`${path}/addRestaurant`} component={AddRestaurant} />
            <SuperAdminRoutes exact path={`${path}/restaurants`} component={Restaurants} />
            <SuperAdminRoutes path={`${path}/editRestaurant`} component={EditRestaurant} />
            <SuperAdminRoutes path={`${path}/qrsManagement`} component={GenerateQrs} />
            <RestaurantAdminRoutes path={`${path}/others`} component={Others} />
            <RestaurantAdminRoutes component={NoRoute} />
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default Admin
