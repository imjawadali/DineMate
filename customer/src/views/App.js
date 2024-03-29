import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, useRouteMatch } from 'react-router-dom'
import { ToastProvider } from 'react-toast-notifications'

import { customisedAction } from '../redux/actions'
import { SESSION_CHECK_DONE, SET_ORDER, SET_SESSION, ORDER_CHECK_DONE, GET_STATUS } from '../constants'
import { RestClient } from '../services/network'
import { getItem, removeItem } from '../helpers'

import ScrollToTop from './ScrollToTop'
import Toaster from './Toaster'
import SideNav from './Sidenav'
import Header from './Header'
import Customer from './Customer'
import Home from './Home'
import ContinueWith from './ContinueWithNew'
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
    const checkingOrder = useSelector(({ orderReducer }) => orderReducer.checkingOrder)
    const orderDetails = useSelector(({ orderReducer }) => orderReducer.orderDetails)
    const orderStatusDetails = useSelector(({ orderStatusReducer }) => orderStatusReducer.status)
    const closeOrder = useSelector(({ closeOrderReducer }) => closeOrderReducer.closeOrder)
    const dispatch = useDispatch()



    useEffect(() => {
        if (!customer || !orderDetails) {
            const storedCustomer = getItem('customer')
            const storedOrderDetails = getItem('orderDetails')
            if (storedCustomer && !customer)
                setTimeout(() => {
                    RestClient.setHeader('Authorization', storedCustomer.id)
                    dispatch(customisedAction(SET_SESSION, { customer: storedCustomer }))
                }, 300)
            else
                setTimeout(() => dispatch(customisedAction(SESSION_CHECK_DONE)), 300)

            if (storedOrderDetails && !orderDetails)
                setTimeout(() => {
                    let obj = {
                        "restaurantId": storedOrderDetails.restaurantId,
                        "orderNumber": storedOrderDetails.orderNumber
                    }
                    dispatch(customisedAction(GET_STATUS, obj))
                }, 300)
            else
                setTimeout(() => dispatch(customisedAction(ORDER_CHECK_DONE)), 300)
        }
    }, [closeOrder])

    const openSidebar = () => {
        setSidebarOpen(true)
    }

    const closeSidebar = () => {
        setSidebarOpen(false)
    }

    // useEffect(()=>{
    //     console.log = function() {}
    //     console.warn = function() {}
    //     console.error = function() {}
    // },[])

    return (!checkingSignIn && !checkingOrder ?
        <ToastProvider
            autoDismiss
            autoDismissTimeout={6000}>
            <Router>
                <Toaster />
                <ScrollToTop closeSidebar={closeSidebar}>
                    <SideNav sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
                    <Header openSidebar={openSidebar} />
                    <Switch>
                        <Route exact path='/'>
                            <Home openSidebar={openSidebar} />
                        </Route>
                        <Route path='/customer' component={Customer} />
                        <Route exact path='/:restaurantId/:tableId' component={ContinueWith} />
                        <Route path='/registration' component={Registration} />
                        <Route path='/others' component={Others} />
                        <Route component={NoRoute} />
                    </Switch>
                    <Footer />
                </ScrollToTop>
            </Router>
        </ToastProvider> :
        <div className="full-screen-container" style={{ background: '#b5c9bf' }}>
            <img src={logo} style={{ width: '120px' }} alt="logo" />
        </div>
    )
}