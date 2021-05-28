import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom'

import SignIn from './SignIn'
import SignUp from './SignUp'
import Restaurants from './Restaurants'
import Menu from './Menu'
import NoRoute from '../NoRoute'

import './styles.css'

export default function Customer(props) {

  const customer = useSelector(({ sessionReducer }) => sessionReducer.customer)

  useEffect(() => {
  }, [])

  let { path } = useRouteMatch()

  const CustomerLanding = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
          !!customer ? 
          <Component {...props} /> : <Redirect to={{ pathname: '/customer/signin', state: { from: props.location.pathname }}} />
      )} />
  )

  const NonCustomerLanding = ({ component: Component, ...rest }) => (
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
        <NonCustomerLanding path={`${path}/signin`} component={SignIn} />
        <NonCustomerLanding path={`${path}/signup`} component={SignUp} />
        <Route exact path={`${path}/restaurants`} component={Restaurants} />
        <Route exact path={`${path}/:restaurantId/menu`} component={Menu} />
        <Route exact path={`${path}/:restaurantId/:tableId`} component={Menu} />
        <Route component={NoRoute} />
      </Switch>
    </div>
  )
}