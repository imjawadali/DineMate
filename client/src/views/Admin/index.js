import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom'

import { customisedAction } from '../../redux/actions'
import { GET_CATEGORIES, GET_EXISTING_QRS, GET_MENU } from '../../constants'

import SideBar from './SideBar'
import NavBar from './NavBar'

import SuperAdmin from './Dashboard/SuperAdmin'
import RestaurantAdmin from './Dashboard/RestaurantAdmin'
import AddRestaurant from './AddRestaurant'
import Restaurants from './Restaurants'
import GenerateQrs from './GenerateQrs'
import ViewQr from './GenerateQrs/ViewQr'
import Tables from './Tables'
import TableDetails from './Tables/TableDetails'
import Categories from './Categories'
import Menu from './Menu'
import ItemDetails from './Menu/ItemDetails'
import Others from './Others'
import NoRoute from '../NoRoute'

import './styles.css'

function Admin(props) {

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const admin = useSelector(({ sessionReducer }) => sessionReducer.admin)
  const fetchingQrs = useSelector(({ restaurantReducer }) => restaurantReducer.fetchingQrs)
  const qrs = useSelector(({ restaurantReducer }) => restaurantReducer.qrs)
  const fetchingCategories = useSelector(({ categoriesReducer }) => categoriesReducer.fetchingCategories)
  const categories = useSelector(({ categoriesReducer }) => categoriesReducer.categories)
  const fetchingMenu = useSelector(({ menuReducer }) => menuReducer.fetchingMenu)
  const menu = useSelector(({ menuReducer }) => menuReducer.menu)
  const dispatch = useDispatch()

  const { restaurantId } = admin

  useEffect(() => {
    if (restaurantId && !fetchingCategories && !categories) {
      if (!fetchingQrs && !qrs)
        dispatch(customisedAction(GET_EXISTING_QRS, { restaurantId, noToast: true }))
      if (!fetchingCategories && !categories)
        dispatch(customisedAction(GET_CATEGORIES, { restaurantId, noToast: true }))
      if (!fetchingMenu && !menu)
        dispatch(customisedAction(GET_MENU, { restaurantId, noToast: true }))
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
          admin.role === "SuperAdmin" ? 
          <Component {...props} /> : <Redirect to={{ pathname: '/admin', state: { from: props.location.pathname } }} />
      )} />
  )

  const RestaurantAdminRoutes = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
          restaurantId ? 
          <Component {...props} /> : <Redirect to={{ pathname: '/admin', state: { from: props.location.pathname } }} />
      )} />
  )

  return (
    <div className="container">
      <div className="sidebarContainer">
        <SideBar admin={admin} sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
      </div>
      <div className="mainContainer">
        <NavBar openSidebar={openSidebar} />
        <div className="Main">
          <Switch>
            <Route exact path={path}>
              <Redirect to={restaurantId ? `${path}/dashboard/restaurantAdmin` : `${path}/dashboard/superAdmin`} />
            </Route>
            <Route path={`${path}/dashboard`}>
              <Switch>
                <Route exact path={`${path}/dashboard`}>
                  <Redirect to={restaurantId ? `${path}/dashboard/restaurantAdmin` : `${path}/dashboard/superAdmin`} />
                </Route>
                <SuperAdminRoutes path={`${path}/dashboard/superAdmin`} component={SuperAdmin} />
                <RestaurantAdminRoutes path={`${path}/dashboard/restaurantAdmin`} component={RestaurantAdmin} />
              </Switch>
            </Route>
            <SuperAdminRoutes path={`${path}/addRestaurant`} component={AddRestaurant} />
            <SuperAdminRoutes path={`${path}/restaurants`} component={Restaurants} />
            <Route path={`${path}/qrsManagement`}>
              <Switch>
                <SuperAdminRoutes exact path={`${path}/qrsManagement`} component={GenerateQrs} />
                <SuperAdminRoutes path={`${path}/qrsManagement/viewQr`} component={ViewQr} />
              </Switch>
            </Route>
            <SuperAdminRoutes path={`${path}/editRestaurant`} component={AddRestaurant} />
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
                <RestaurantAdminRoutes path={`${path}/menuManagement/addFoodItem`} component={AddRestaurant} />
              </Switch>
            </Route>
            <RestaurantAdminRoutes path={`${path}/others`} component={Others} />
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
