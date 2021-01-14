import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom'

import SideBar from './SideBar'
import NavBar from './NavBar'

import Dashboard from './Dashboard'
import Restaurants from './Restaurants'
import AddRestaurants from './AddRestaurants'
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

  return (
    <div className="container">
      <div className="sidebarContainer">
        <SideBar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
      </div>
      <div className="mainContainer">
        <NavBar openSidebar={openSidebar} />
        <div className="Main">
          <Switch>
            <Route exact path={path} component={Dashboard} />
            <SuperAdminRoutes path={`${path}/restaurants`} component={Restaurants} />
            <SuperAdminRoutes path={`${path}/addRestaurants`} component={AddRestaurants} />
            <SuperAdminRoutes path={`${path}/generateQrs`} component={GenerateQrs} />
            <Route path={`${path}/others`} component={Others} />
            <Route component={NoRoute} />
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default Admin
