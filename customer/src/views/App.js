import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { ToastProvider } from 'react-toast-notifications'

import { customisedAction } from '../redux/actions'
import { SESSION_CHECK_DONE, SET_SESSION } from '../constants'
import { RestClient } from '../services/network'
import { getItem } from '../helpers'

import Toaster from './Toaster'
import Restaurants from './Restaurants'
import Menu from './Menu'
import NoRoute from './NoRoute'

import logo from '../assets/logo.png'
import './styles.css'

export default function App() {

    const checkingSignIn = useSelector(({ sessionReducer }) => sessionReducer.checkingSignIn)
    const customer = useSelector(({ sessionReducer }) => sessionReducer.customer)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!customer) {
        const storedCustomer = getItem('customer')
        if (storedCustomer)
            setTimeout(() => {
                RestClient.setHeader('Authorization', storedCustomer.id)
                dispatch(customisedAction(SET_SESSION, { customer: storedCustomer }))
            }, 300)
        else
            setTimeout(() => dispatch(customisedAction(SESSION_CHECK_DONE)), 300)
        }
    }, [])

    const CustomerLanding = ({ component: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
            !customer ? 
            <Component {...props} /> : <Redirect to={{ pathname: '/customer/restaurants' }} />
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
                        <Redirect to='/customer/restaurants' />
                    </Route>
                    <Route path='/customer/restaurants' component={Restaurants} />
                    <Route exact path='/customer/:restaurantId/menu/' component={Menu} />
                    <Route exact path='/customer/:restaurantId/:tableId' component={Menu} />
                    <Route component={NoRoute} />
                </Switch>
            </Router>
        </ToastProvider> :
        <div className="full-screen-container" style={{ background: '#b5c9bf'}}>
            <img src={logo} style={{ width: '120px' }} alt="logo" />
        </div>
    )
}