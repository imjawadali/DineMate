import React, { useState, useEffect } from 'react'
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom'

import Header from './Header'
import Restaurants from '../Restaurants'
import Menu from '../MenuListing'
import NoRoute from '../NoRoute'
import Footer from './Footer'

import './styles.css'

function Admin(props) {

  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
  }, [])

  const openSidebar = () => {
      setSidebarOpen(true)
  }

  const closeSidebar = () => {
      setSidebarOpen(false)
  }

  let { path } = useRouteMatch()

  props.history.listen(() => closeSidebar())

  const CustomerLanding = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
          !customer ? 
          <Component {...props} /> : <Redirect to={{ pathname: '/customer/restaurants' }} />
      )} />
  )

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path={path}>
          <Redirect to={`${path}/restaurants`} />
        </Route>
        <Route exact path={`${path}/restaurants`} component={Restaurants} />
        <Route exact path={`${path}/:restaurantId/menu`} component={Menu} />
        <Route exact path={`${path}/:restaurantId/:tableId`} component={Menu} />
        <Route component={NoRoute} />
      </Switch>
      <Footer />
    </div>
  )
}

export default Admin
