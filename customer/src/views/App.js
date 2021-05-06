import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ToastProvider } from 'react-toast-notifications'

import { customisedAction } from '../redux/actions'
import { SESSION_CHECK_DONE, SET_SESSION } from '../constants'
import { RestClient } from '../services/network'
import { getItem } from '../helpers'

import ScrollToTop from './ScrollToTop'
import Toaster from './Toaster'
import Header from './Header'
import Customer from './Customer'
import Home from './Home'
import Others from './Others'
import Registration from './Registration'
import NoRoute from './NoRoute'
import Footer from './Footer'

import logo from '../assets/logo.png'
import './styles.css'

export default function App() {

    const [sidebarOpen, setSidebarOpen] = useState(false)

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

    const openSidebar = () => {
        setSidebarOpen(true)
    }
  
    const closeSidebar = () => {
        setSidebarOpen(false)
    }

    return (!checkingSignIn ?
        <ToastProvider
            autoDismiss
            autoDismissTimeout={6000}>
            <Router>
                <Toaster />
                <ScrollToTop closeSidebar={closeSidebar}>
                    <Header />
                    <Switch>
                        <Route exact path='/' openSidebar={openSidebar} component={Home} />
                        <Route path='/customer' openSidebar={openSidebar} component={Customer} />
                        <Route path='/registration' component={Registration} />
                        <Route path='/others' component={Others} />
                        <Route component={NoRoute} />
                    </Switch>
                    <Footer />
                </ScrollToTop>
            </Router>
        </ToastProvider> :
        <div className="full-screen-container" style={{ background: '#b5c9bf'}}>
            <img src={logo} style={{ width: '120px' }} alt="logo" />
        </div>
    )
}