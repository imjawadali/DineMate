import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { ToastProvider } from 'react-toast-notifications';

import { customisedAction } from '../redux/actions'
import { SESSION_CHECK_DONE, SET_SESSION } from '../constants/App'
import { getItem } from '../helpers';

import Toaster from './Toaster'
import Admin from './Admin'
import AdminLogin from './AdminLogin'
import Restaurants from './Restaurants'
import NoRoute from './NoRoute'

import logo from '../assets/logo.png';

export default function App() {

    const checkingSignIn = useSelector(({ sessionReducer }) => sessionReducer.checkingSignIn)
    const admin = useSelector(({ sessionReducer }) => sessionReducer.admin)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!admin) {
        const storedAdmin = getItem('admin');
        if (storedAdmin)
            setTimeout(() =>
                dispatch(customisedAction(SET_SESSION, { admin: storedAdmin })),
                500
            )
        else
            setTimeout(() =>
                dispatch(customisedAction(SESSION_CHECK_DONE)),
                500
            )
        }
    }, [dispatch])

    const AdminLanding = ({ component: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
            !!admin ? 
            <Component {...props} /> : <Redirect to={{ pathname: '/adminLogin', state: { from: props.location.pathname } }} />
        )} />
    );

    const CustomerLanding = ({ component: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
            !admin ? 
            <Component {...props} /> : <Redirect to={{ pathname: '/admin' }} />
        )} />
    );

    return (!checkingSignIn ?
        <ToastProvider
            autoDismiss
            autoDismissTimeout={6000}>
            <Router>
                <Toaster />
                <Switch>
                    <CustomerLanding exact path='/' component={Restaurants} />
                    <AdminLanding path='/admin' component={Admin} />
                    <CustomerLanding exact path='/restaurant' component={Restaurants} />
                    <Route path='/adminLogin' component={AdminLogin} />
                    <Route component={NoRoute} />
                </Switch>
            </Router>
        </ToastProvider> :
        <div style={styles.loaderContainer}>
            <img src={logo} style={{ width: '100px', height: '100px' }} alt="logo" />
        </div>
    )
}

const styles = {
    loaderContainer: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}