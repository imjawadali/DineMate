import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom'

import SignIn from './SignIn'
import SignUp from './SignUp'
import ForgotPassword from './forgot-password'
import Restaurants from './Restaurants'
import Menu from './Menu'
import NoRoute from '../NoRoute'

import './styles.css'
import CheckOut from './checkout/CheckOut'
import Profile from '../profile/Profile'
import SetPassword from './Set-Password'
import PastOrder from '../pastOrder/PastOrder'
import Detail from '../pastOrder/details'

export default function Customer(props) {

  const customer = useSelector(({ sessionReducer }) => sessionReducer.customer)

  useEffect(() => {
  }, [])

  let { path } = useRouteMatch()

  const CustomerLanding = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      !!customer ?
        <Component {...props} /> : <Redirect to={{ pathname: '/customer/signin', state: { from: props.location.pathname } }} />
    )} />
  )

  const NonCustomerLanding = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      !customer ?
        <Component {...props} /> : <Redirect to={{ pathname: '/' }} />
    )} />
  )

  return (
    <div>
      <Switch>
        <Route exact path={path}>
          <Redirect to={`${path}/restaurants`} />
        </Route>
        <Route path={`${path}/signin`} component={SignIn} />
        <NonCustomerLanding path={`${path}/signup`} component={SignUp} />
        <NonCustomerLanding path={`${path}/forgotPassword`} component={ForgotPassword} />
        <Route exact path={`${path}/restaurants`} component={Restaurants} />
        {/* <Route exact path={`${path}/restaurants`} component={Restaurants} /> */}
        <Route exact path={`${path}/:restaurantId/menu`} component={Menu} />
        <Route exact path={`${path}/checkout`} component={CheckOut} />
        <Route exact path={`${path}/profile`} component={Profile} />
        <Route exact path={`${path}/setNewPassword/:email/:hashString`} component={SetPassword} />
        <Route exact path={`${path}/pastOrder`} component={PastOrder} />
        <Route exact path={`${path}/pastOrder/orderDetails`} component={Detail} />

        <Route component={NoRoute} />
      </Switch>
    </div>
  )
}