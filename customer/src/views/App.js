import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { ToastProvider } from 'react-toast-notifications'

import { customisedAction } from '../redux/actions'
import { SESSION_CHECK_DONE, SET_SESSION } from '../constants'
import { RestClient } from '../services/network'
import { getItem } from '../helpers'

import Toaster from './Toaster'
import Admin from './Admin'
import AdminLogin from './AdminLogin'
import ForgotPassword from './ForgotPassword'
import CreatePassword from './CreatePassword'
import Restaurants from './Restaurants'
import Menu from './Menu'
import NoRoute from './NoRoute'

import logo from '../assets/logo.png'
import './styles.css'

export default function App(props) {

    const checkingSignIn = useSelector(({ sessionReducer }) => sessionReducer.checkingSignIn)
    const admin = useSelector(({ sessionReducer }) => sessionReducer.admin)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!admin) {
        const storedAdmin = getItem('admin')
        if (storedAdmin)
            setTimeout(() => {
                RestClient.setHeader('Authorization', storedAdmin.id)
                dispatch(customisedAction(SET_SESSION, { admin: storedAdmin }))
            }, 300)
        else
            setTimeout(() => dispatch(customisedAction(SESSION_CHECK_DONE)), 300)
        }
    }, [])

    const AdminLanding = ({ component: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
            !!admin ? 
            <Component {...props} /> : <Redirect to={{ pathname: '/customer/adminLogin', state: { from: props.location.pathname } }} />
        )} />
    )

    const CustomerLanding = ({ component: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
            !admin ? 
            <Component {...props} /> : <Redirect to={{ pathname: '/customer/admin' }} />
        )} />
    )

    return (!checkingSignIn ?
        <ToastProvider
            autoDismiss
            autoDismissTimeout={6000}>
            <Router>
                <Toaster />
                <Switch>
                    <Route exact path='/customer'>
                        <Redirect to='/customer/admin' />
                    </Route>
                    <AdminLanding path='/customer/admin' component={Admin} />
                    <CustomerLanding path='/restaurants' component={Restaurants} />
                    <CustomerLanding exact path='/restaurant/:restaurantId/menu/' component={Menu} />
                    <CustomerLanding exact path='/restaurant/:restaurantId/:tableId' component={Menu} />
                    <CustomerLanding path='/customer/adminLogin' component={AdminLogin} />
                    <CustomerLanding path='/customer/forgotPassword' component={ForgotPassword} />
                    <CustomerLanding path='/customer/createPassword/:restaurantId/:email/:hashString' component={CreatePassword} />
                    <Route component={NoRoute} />
                </Switch>
            </Router>
        </ToastProvider> :
        <div className="full-screen-container" style={{ background: '#b5c9bf'}}>
            <img src={logo} style={{ width: '120px' }} alt="logo" />
        </div>
    )
}