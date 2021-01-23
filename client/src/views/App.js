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

export default function App() {

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
    }, [dispatch])

    const AdminLanding = ({ component: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
            !!admin ? 
            <Component {...props} /> : <Redirect to={{ pathname: '/adminLogin', state: { from: props.location.pathname } }} />
        )} />
    )

    const CustomerLanding = ({ component: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
            !admin ? 
            <Component {...props} /> : <Redirect to={{ pathname: '/admin' }} />
        )} />
    )

    return (!checkingSignIn ?
        <ToastProvider
            autoDismiss
            autoDismissTimeout={6000}>
            <Router>
                <Toaster />
                <Switch>
                    <Route exact path='/'>
                        <Redirect to='/admin' />
                    </Route>
                    <AdminLanding path='/admin' component={Admin} />
                    <CustomerLanding path='/restaurants' component={Restaurants} />
                    <CustomerLanding exact path='/restaurant/:restaurantId/menu/' component={Menu} />
                    <CustomerLanding exact path='/restaurant/:restaurantId/:tableId' component={Menu} />
                    <CustomerLanding path='/adminLogin' component={AdminLogin} />
                    <CustomerLanding path='/forgotPassword' component={ForgotPassword} />
                    <CustomerLanding path='/createPassword/:restaurantId/:email/:hashString' component={CreatePassword} />
                    <Route component={NoRoute} />
                </Switch>
            </Router>
        </ToastProvider> :
        <div className="full-screen-container" style={{ background: 'rgba(62, 161, 117, 0.3)'}}>
            <img src={logo} style={{ width: '120px' }} alt="logo" />
        </div>
    )
}