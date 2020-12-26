import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { ToastProvider } from 'react-toast-notifications';

import firebase from '../services/firebase'

import { customisedAction } from '../redux/actions'
import { SET_SESSION } from '../constants/App'

import Toaster from './Toaster'
import Admin from './Admin'
import AdminLogin from './AdminLogin'
import Restaurants from './Restaurants'
import NoRoute from './NoRoute'
import './styles.css'

export default function App() {

  const admin = useSelector(({ sessionReducer }) => sessionReducer.admin)
  const user = useSelector(({ sessionReducer }) => sessionReducer.user)
  const dispatch = useDispatch()

  useEffect(() => {
    firebase.isInitialized().then(() => {
        if (firebase.getCurrentUser())
            dispatch(customisedAction(SET_SESSION, firebase.getCurrentUser()))
    })
  }, [dispatch])

  const AdminLanding = ({ component: Component, ...rest }) => (
     <Route {...rest} render={(props) => (
        !!admin ? 
           <Component {...props} /> : <Redirect to={{ pathname: '/adminLogin', state: { from: props.location.pathname } }} />
     )} />
  );

    return (
        <ToastProvider
          autoDismiss
          autoDismissTimeout={6000}>
            <Router>
                <Toaster />
                <Switch>
                    <Route exact path='/' component={Restaurants} />
                    <AdminLanding path='/admin' component={Admin} />
                    <Route path='/adminLogin' component={AdminLogin} />
                    <Route component={NoRoute} />
                </Switch>
            </Router>
        </ToastProvider>
    )
}
