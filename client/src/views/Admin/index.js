import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom'
import { customisedAction } from '../../redux/actions'
import { GET_CATEGORIES, GET_EXISTING_QRS, GET_KITCHEN_DASHBOARD, GET_MENU, GET_ORDERS, GET_RESTAURANT_DASHBOARD, GET_STAFF_ASSIGNED_TABLES, GET_USERS } from '../../constants'

import SideBar from './SideBar'
import NavBar from './NavBar'

import SuperAdmin from './Dashboard/SuperAdmin'
import Restaurant from './Dashboard/Restaurant'
import Kitchen from './Dashboard/Kitchen'
import TableOrders from './Dashboard/Restaurant/TableOrders'
import OrderItemDetails from './Dashboard/Restaurant/TableOrders/ItemDetails'
import Orders from './Orders'
import OrderDetails from './Orders/OrderDetails'
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
import Others from './Others'
import NoRoute from '../NoRoute'

import './styles.css'

function Admin(props) {

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const admin = useSelector(({ sessionReducer }) => sessionReducer.admin)
  const dispatch = useDispatch()

  const { restaurantId, role } = admin

  useEffect(() => {
    if (restaurantId) {
      if (role === 'Kitchen') {
        dispatch(customisedAction(GET_KITCHEN_DASHBOARD, { restaurantId }))
      } else if (role === 'Staff') {
        dispatch(customisedAction(GET_RESTAURANT_DASHBOARD, { restaurantId }))
        dispatch(customisedAction(GET_ORDERS, { restaurantId, status: 1, noToast: true }))
        dispatch(customisedAction(GET_STAFF_ASSIGNED_TABLES, { restaurantId, noToast: true }))
        dispatch(customisedAction(GET_USERS, { restaurantId, noToast: true }))
      } else {
        dispatch(customisedAction(GET_RESTAURANT_DASHBOARD, { restaurantId }))
        dispatch(customisedAction(GET_ORDERS, { restaurantId, status: 1, noToast: true }))
        dispatch(customisedAction(GET_STAFF_ASSIGNED_TABLES, { restaurantId, noToast: true }))
        dispatch(customisedAction(GET_EXISTING_QRS, { restaurantId, noToast: true }))
        dispatch(customisedAction(GET_MENU, { restaurantId, noToast: true }))
        dispatch(customisedAction(GET_USERS, { restaurantId, noToast: true }))
      }
      dispatch(customisedAction(GET_CATEGORIES, { restaurantId, noToast: true }))
    }
  }, [restaurantId])

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
        <NavBar role={role} openSidebar={openSidebar} { ...props } />
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
                <RestaurantAdminRoutes exact path={`${path}/ordersManagement`} component={Orders}/>
                <RestaurantAdminRoutes path={`${path}/ordersManagement/orderDetails`} component={OrderDetails} />
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
