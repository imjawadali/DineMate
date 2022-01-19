import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ToastProvider } from 'react-toast-notifications'

import { messaging } from '../services/firebase'
import { getToken, onMessage } from "firebase/messaging"

import { customisedAction } from '../redux/actions'
import { SESSION_CHECK_DONE, SET_SESSION, ORDER_CHECK_DONE, GET_STATUS, SET_TOAST, SET_FCM_TOKEN, SET_LOCATION, LOCATION_REQUIRED } from '../constants'
import { RestClient } from '../services/network'
import { getItem } from '../helpers'

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
import Reservation from './Reservation'
import RewardPoints from './Customer/RewardPoints'

import logo from '../assets/logo.png'
import './styles.css'

export default function App() {

    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [isReservationModalVisible, setisReservationModalVisible] = useState(false)

    const checkingSignIn = useSelector(({ sessionReducer }) => sessionReducer.checkingSignIn)
    const customer = useSelector(({ sessionReducer }) => sessionReducer.customer)
    const checkingOrder = useSelector(({ orderReducer }) => orderReducer.checkingOrder)
    const orderDetails = useSelector(({ orderReducer }) => orderReducer.orderDetails)
    const city = useSelector(({ restaurantsReducer }) => restaurantsReducer.city)
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

            if (storedOrderDetails && !orderDetails) {
                const { restaurantId, orderNumber } = storedOrderDetails
                setTimeout(() => {
                    dispatch(customisedAction(GET_STATUS, { restaurantId, orderNumber }))
                }, 300)
            } else
                setTimeout(() => dispatch(customisedAction(ORDER_CHECK_DONE)), 300)
        }

        if (!city) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    if (position && position.coords) {
                        const { latitude, longitude } = position.coords
                        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE_MAP_KEY}`)
                            .then(r => r.json().then(data => ({ status: r.status, body: data })))
                            .then(response => {
                                if (response.status === 200 && response.body && response.body.plus_code && response.body.plus_code.compound_code) {
                                    const { compound_code } = response.body.plus_code
                                    console.log("compound_code", compound_code)
                                    let city = compound_code.split(',')[1].trim()
                                    let country = compound_code.split(',')[2].trim()
                                    if (city.length === 2)
                                        city = (compound_code.split(',')[0].trim()).split(' ')[1]
                                    dispatch(customisedAction(SET_LOCATION, { latitude, longitude, city, country }))
                                } else {
                                    console.log(response)
                                    dispatch(customisedAction(LOCATION_REQUIRED))
                                }
                            })
                    } else dispatch(customisedAction(LOCATION_REQUIRED))
                },
                () => dispatch(customisedAction(LOCATION_REQUIRED))
            )
        }
    }, [])

    useEffect(() => {
        if (customer) {
            getToken(messaging, { vapidKey: "BPoOOkLxrmaJtxzYlo-ApajCHnlPXQ0HIIEjwzqcnrrdvyOB32Aq1YZhsoi1H45yResfQj-kiaLpNNZWXvNWJ1Y" })
                .then(fcmToken => dispatch(customisedAction(SET_FCM_TOKEN, { fcmToken })))
                .catch(error => console.log(error))

            onMessage(messaging, ({ notification, data }) => {
                console.log("notification", notification)
                console.log("data", data)
                if (notification)
                    dispatch(customisedAction(SET_TOAST, { message: notification.body, type: 'success' }))
                if (data) {
                    try {
                        let res = JSON.parse(data.body)
                        const { customerId, typeArray, restaurantId, orderNumber, tableId } = res
                        if (customerId && customerId === customer.id && typeArray.length && restaurantId && orderNumber) {
                            typeArray.forEach(type => {
                                dispatch(customisedAction(type, { restaurantId, orderNumber, tableId }))
                            });
                        }
                    } catch (error) { console.log("error", error) }
                }
            })
        } else onMessage(() => null)
    }, [customer])

    const openSidebar = () => {
        setSidebarOpen(true)
    }

    const closeSidebar = () => {
        setSidebarOpen(false)
    }

    return (!checkingSignIn && !checkingOrder ?
        <ToastProvider
            autoDismiss
            autoDismissTimeout={6000}>
            <Router>
                <Toaster />
                <ScrollToTop closeSidebar={closeSidebar}>
                    <SideNav sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
                    <Header openSidebar={openSidebar} />
                    <RewardPoints />
                    <Reservation
                        isReservationModalVisible={isReservationModalVisible}
                        closeReservationModal={() => setisReservationModalVisible(false)}
                    />
                    <Switch>
                        <Route exact path='/'>
                            <Home
                                openSidebar={openSidebar}
                                openReservationModal={() => setisReservationModalVisible(true)}
                            />
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