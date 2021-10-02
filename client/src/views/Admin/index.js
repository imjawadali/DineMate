import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom'
import { customisedAction } from '../../redux/actions'
import { CHECK_PASSWORD_EXPIRY, GET_CATEGORIES, GET_EXISTING_QRS, GET_GENERIC_DATA, GET_KITCHEN_DASHBOARD, GET_MENU, GET_ORDERS, GET_ORDER_DETAILS, GET_RESTAURANT_DASHBOARD, GET_RESTAURANT_SCHEDULE, GET_RESTAURANT_SETTINGS, GET_STAFF_ASSIGNED_TABLES, GET_TABLE_ORDERS, GET_USERS, SET_FCM_TOKEN, SET_TOAST } from '../../constants'

import firebase from '../../services/firebase'

import SideBar from './SideBar'
import NavBar from './NavBar'

import SuperAdmin from './Dashboard/SuperAdmin'
import Restaurant from './Dashboard/Restaurant'
import Kitchen from './Dashboard/Kitchen'
import TableOrders from './Dashboard/Restaurant/TableOrders'
import OrderItemDetails from './Dashboard/Restaurant/TableOrders/ItemDetails'
import ItemSplit from './Dashboard/Restaurant/ItemSplit'
import Orders from './Orders'
import OrderDetails from './Orders/OrderDetails'
import NewOrder from './Orders/NewOrder'
import AddRestaurant from './AddRestaurant'
import EditRestaurant from './EditRestaurant'
import Restaurants from './Restaurants'
import GenerateQrs from './GenerateQrs'
import AllUsers from './Users/AllUsers'
import Staff from './Staff'
import Tables from './Tables'
import TableDetails from './Tables/TableDetails'
import Categories from './Categories'
import Menu from './Menu'
import ItemDetails from './Menu/ItemDetails'
import AddMenuItem from './AddMenuItem'
import RestaurantUsers from './Users/RestaurantUsers'
import Faqs from './Faqs'
import SuperAdminSettings from './Settings/SuperAdmin'
import RestaurantSettings from './Settings/Restaurant'
import UpdatePassword from './UpdatePassword'
import Schedule from './Schedule'
import Others from './Others'
import NoRoute from '../NoRoute'

import './styles.css'

function Admin(props) {

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const admin = useSelector(({ sessionReducer }) => sessionReducer.admin)
  const tableId = useSelector(({ ordersReducer }) => ordersReducer.tableId)
  const dispatch = useDispatch()

  const messaging = firebase.messaging()

  const { restaurantId, role } = admin

  useEffect(() => {
    if (restaurantId) {
      if (role === 'Kitchen') {
        dispatch(customisedAction(GET_KITCHEN_DASHBOARD, { restaurantId }))
      } else if (role === 'Staff') {
        dispatch(customisedAction(GET_RESTAURANT_DASHBOARD, { restaurantId }))
        dispatch(customisedAction(GET_ORDERS, { restaurantId, status: 1, noToast: true }))
        dispatch(customisedAction(GET_STAFF_ASSIGNED_TABLES, { restaurantId, noToast: true }))
        dispatch(customisedAction(GET_MENU, { restaurantId, noToast: true }))
        dispatch(customisedAction(GET_USERS, { restaurantId, noToast: true }))
      } else {
        dispatch(customisedAction(GET_RESTAURANT_DASHBOARD, { restaurantId }))
        dispatch(customisedAction(GET_ORDERS, { restaurantId, status: 1, noToast: true }))
        dispatch(customisedAction(GET_STAFF_ASSIGNED_TABLES, { restaurantId, noToast: true }))
        dispatch(customisedAction(GET_EXISTING_QRS, { restaurantId, noToast: true }))
        dispatch(customisedAction(GET_MENU, { restaurantId, noToast: true }))
        dispatch(customisedAction(GET_USERS, { restaurantId, noToast: true }))
        dispatch(customisedAction(GET_RESTAURANT_SCHEDULE, { restaurantId, noToast: true }))
      }
      dispatch(customisedAction(GET_CATEGORIES, { restaurantId, noToast: true }))
      dispatch(customisedAction(GET_RESTAURANT_SETTINGS, { restaurantId, noToast: true }))
    }
  }, [restaurantId])

  useEffect(() => {
    dispatch(customisedAction(CHECK_PASSWORD_EXPIRY, { noToast: true }))

    if (role === 'SuperAdmin')
      dispatch(customisedAction(GET_GENERIC_DATA, { noToast: true }))

    if (role !== 'SuperAdmin') {
      messaging.getToken()
        .then(fcmToken => dispatch(customisedAction(SET_FCM_TOKEN, { fcmToken })))
        .catch(error => console.log(error))
  
      messaging.onMessage(({ notification, data }) => {
        console.log(data)
        if (notification)
          dispatch(customisedAction(SET_TOAST, { message: notification.body, type: 'success' }))
        else if (data) {
          try {
            let res = JSON.parse(data.body)
            if (res.roles && res.roles.length && location.pathname.includes('/admin')) {
              const { roles, type, restaurantId: restId, orderNumber } = res
              if (restId && restId === restaurantId, roles.includes(role)) {
                if (type === 'DASHBOARD') {
                  if (role === 'Kitchen')
                    dispatch(customisedAction(GET_KITCHEN_DASHBOARD, { restaurantId }))
                  else {
                    dispatch(customisedAction(GET_RESTAURANT_DASHBOARD, { restaurantId }))
                    console.log(tableId)
                    if (orderNumber && location.pathname.includes('/orderDetails'))
                      dispatch(customisedAction(GET_ORDER_DETAILS, { restaurantId, orderNumber }))
                    else if ((location.pathname.includes('/tableOrders') || location.pathname.includes('/itemSplit')) && tableId)
                      dispatch(customisedAction(GET_TABLE_ORDERS, { restaurantId, tableId }))
                    dispatch(customisedAction(GET_ORDERS, { restaurantId, status: 1, noToast: true }))
                  }
                } else dispatch(customisedAction(type, { restaurantId, noToast: true }))
              }
            }
          } catch (error) {
            console.log("error", error)
            console.log("data", data)
          }
        }
      })
    }

    return () => messaging.onMessage(() => null)
  }, [])

  const openSidebar = () => {
    setSidebarOpen(true)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  let { path } = useRouteMatch()

  props.history.listen(() => closeSidebar())

  const SuperAdminRoutes = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      role === "SuperAdmin" ?
        <Component {...props} /> : <Redirect to={{ pathname: path, state: { from: props.location.pathname } }} />
    )} />
  )

  const RestaurantAdminRoutes = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      restaurantId && (role === "Admin" || role === "SuperAdmin") ?
        <Component {...props} /> : <Redirect to={{ pathname: path, state: { from: props.location.pathname } }} />
    )} />
  )

  const OthersRoutes = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      restaurantId && (role !== "Kitchen") ?
        <Component {...props} /> : <Redirect to={{ pathname: path, state: { from: props.location.pathname } }} />
    )} />
  )

  const KitchenAdminRoutes = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      restaurantId && (role === "Kitchen") ?
        <Component {...props} /> : <Redirect to={{ pathname: path, state: { from: props.location.pathname } }} />
    )} />
  )

  return (
    <div className="container">
      <div className="sidebarContainer" style={{ display: role === "Kitchen" && props.location.pathname.includes('/dashboard') ? 'none' : '' }}>
        <SideBar admin={admin} sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
      </div>
      <div className="mainContainer" style={{ width: role === "Kitchen" && props.location.pathname.includes('/dashboard') ? '100%' : '' }}>
        <NavBar openSidebar={openSidebar} {...props} />
        <div className="Main">
          <Switch>
            <Route exact path={path}>
              <Redirect to={`${path}/dashboard`} />
            </Route>
            <Route path={`${path}/dashboard`}>
              <Switch>
                <Route exact path={`${path}/dashboard`}>
                  <Redirect to={restaurantId ?
                    role !== "Kitchen" ? `${path}/dashboard/restaurant`
                      : `${path}/dashboard/kitchen`
                    : `${path}/dashboard/superAdmin`} />
                </Route>
                <SuperAdminRoutes path={`${path}/dashboard/superAdmin`} component={SuperAdmin} />
                <Route path={`${path}/dashboard/restaurant`}>
                  <Switch>
                    <OthersRoutes exact path={`${path}/dashboard/restaurant`} component={Restaurant} />
                    <OthersRoutes path={`${path}/dashboard/restaurant/itemSplit`} component={ItemSplit} />
                    <Route path={`${path}/dashboard/restaurant/tableOrders`}>
                      <Switch>
                        <OthersRoutes exact path={`${path}/dashboard/restaurant/tableOrders`} component={TableOrders} />
                        <OthersRoutes path={`${path}/dashboard/restaurant/tableOrders/itemDetails`} component={OrderItemDetails} />
                      </Switch>
                    </Route>
                  </Switch>
                </Route>
                <KitchenAdminRoutes path={`${path}/dashboard/kitchen`} component={Kitchen} />
              </Switch>
            </Route>
            <SuperAdminRoutes path={`${path}/addRestaurant`} component={AddRestaurant} />
            <SuperAdminRoutes path={`${path}/editRestaurant`} component={EditRestaurant} />
            <SuperAdminRoutes path={`${path}/restaurants`} component={Restaurants} />
            <Route path={`${path}/usersManagement`}>
              <Switch>
                <Route exact path={`${path}/usersManagement`}>
                  <Redirect to={restaurantId ?
                    role !== "Kitchen" && role !== "Staff" ? `${path}/usersManagement/restaurantUsers`
                      : `${path}`
                    : `${path}/usersManagement/allUsers`} />
                </Route>
                <SuperAdminRoutes path={`${path}/usersManagement/allUsers`} component={AllUsers} />
                <RestaurantAdminRoutes path={`${path}/usersManagement/restaurantUsers`} component={RestaurantUsers} />
              </Switch>
            </Route>
            <Route path={`${path}/ordersManagement`}>
              <Switch>
                <OthersRoutes exact path={`${path}/ordersManagement`} component={Orders} />
                <OthersRoutes path={`${path}/ordersManagement/orderDetails`} component={OrderDetails} />
                <OthersRoutes path={`${path}/ordersManagement/newOrder`} component={NewOrder} />
              </Switch>
            </Route>
            <OthersRoutes path={`${path}/staffManagement`} component={Staff} />
            <SuperAdminRoutes exact path={`${path}/qrsManagement`} component={GenerateQrs} />
            <Route path={`${path}/tablesManagement`}>
              <Switch>
                <RestaurantAdminRoutes exact path={`${path}/tablesManagement`} component={Tables} />
                <RestaurantAdminRoutes path={`${path}/tablesManagement/tableDetails`} component={TableDetails} />
              </Switch>
            </Route>
            <RestaurantAdminRoutes path={`${path}/categoriesManagement`} component={Categories} />
            <Route path={`${path}/menuManagement`}>
              <Switch>
                <RestaurantAdminRoutes exact path={`${path}/menuManagement`} component={Menu} />
                <RestaurantAdminRoutes path={`${path}/menuManagement/itemDetails`} component={ItemDetails} />
              </Switch>
            </Route>
            <RestaurantAdminRoutes path={`${path}/addFoodItem`} component={AddMenuItem} />
            <SuperAdminRoutes exact path={`${path}/faqsManagement`} component={Faqs} />
            <Route path={`${path}/settings`}>
              <Switch>
                <Route exact path={`${path}/settings`}>
                  <Redirect to={restaurantId ?
                    `${path}/settings/restaurant`
                    : `${path}/settings/superAdmin`} />
                </Route>
                <SuperAdminRoutes path={`${path}/settings/superAdmin`} component={SuperAdminSettings} />
                <RestaurantAdminRoutes path={`${path}/settings/restaurant`} component={RestaurantSettings} />
              </Switch>
            </Route>
            <SuperAdminRoutes path={`${path}/updatePassword`} component={UpdatePassword} />
            <Route path={`${path}/restaurant/updatePassword`} component={UpdatePassword} />
            <RestaurantAdminRoutes path={`${path}/scheduleManagement`} component={Schedule} />
            <KitchenAdminRoutes path={`${path}/others`} component={Others} />
            {restaurantId ?
              <SuperAdminRoutes component={NoRoute} />
              : <RestaurantAdminRoutes component={NoRoute} />
            }
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default Admin
