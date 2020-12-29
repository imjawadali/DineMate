import React, { useState } from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import NavBar from './NavBar'
import SideBar from './SideBar'
import Dashboard from './Dashboard'
import Others from './Others'
import NoRoute from '../NoRoute'

function Admin(props) {

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const openSidebar = () => {
      setSidebarOpen(true)
  }

  const closeSidebar = () => {
      setSidebarOpen(false)
  }

  let { path } = useRouteMatch();

  return (
    <div className="container">
      <NavBar openSidebar={openSidebar} />
      <Switch>
        <Route exact path={path} component={Dashboard} />
        <Route path={`${path}/others`} component={Others} />
        <Route component={NoRoute} />
      </Switch>
      <SideBar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
    </div>
  )
}

export default Admin
