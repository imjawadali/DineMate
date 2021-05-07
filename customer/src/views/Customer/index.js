import React, { useEffect } from 'react'
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom'

import Restaurants from './Restaurants'
import Menu from './Menu'
import NoRoute from '../NoRoute'

import './styles.css'

export default function Customer(props) {

  useEffect(() => {
  }, [])

  let { path } = useRouteMatch()

  const CustomerLanding = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
          !customer ? 
          <Component {...props} /> : <Redirect to={{ pathname: '/customer/restaurants' }} />
      )} />
  )

  return (
    <div>
      <Switch>
        <Route exact path={path}>
          <Redirect to={`${path}/restaurants`} />
        </Route>
        <Route exact path={`${path}/restaurants`} component={Restaurants} />
        <Route exact path={`${path}/:restaurantId/menu`} component={Menu} />
        <Route exact path={`${path}/:restaurantId/:tableId`} component={Menu} />
        <Route component={NoRoute} />
      </Switch>
    </div>
  )
}