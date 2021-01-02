import React, { useState } from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import SideBar from './SideBar'
import NavBar from './NavBar'

import Dashboard from './Dashboard'
import Others from './Others'
import NoRoute from '../NoRoute'

import './styles.css'

function Admin(props) {

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const openSidebar = () => {
      setSidebarOpen(true)
  }

  const closeSidebar = () => {
      setSidebarOpen(false)
  }

  let { path } = useRouteMatch();

  props.history.listen(() => closeSidebar())

  return (
    <div className="container">
      <SideBar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
      <NavBar openSidebar={openSidebar} />
      <main>
        <Switch>
          <Route exact path={path} component={Dashboard} />
          <Route path={`${path}/others`} component={Others} />
          <Route component={NoRoute} />
        </Switch>
      </main>
    </div>
  )
}

export default Admin
