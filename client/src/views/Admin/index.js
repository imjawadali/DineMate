import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import SideBar from './SideBar'
import Dashboard from './Dashboard'
import Others from './Others'
import NoRoute from '../NoRoute'

function Admin(props) {

  let { path } = useRouteMatch();

  return (
    <div>
      <SideBar />
      <Switch>
        <Route exact path={path} component={Dashboard} />
        <Route path={`${path}/others`} component={Others} />
        <Route component={NoRoute} />
      </Switch>
    </div>
  )
}

export default Admin
