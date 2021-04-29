import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useRouteMatch, withRouter } from 'react-router-dom'

import { DineMateTitle, SmallButtonRed } from '../../../components'

import logo from '../../../assets/logo.png'
import './styles.css'
import { customisedAction } from '../../../redux/actions'
import { RESET_RESTAURANT } from '../../../constants'

function SideBar(props) {
    
    const dispatch = useDispatch()
    let { url } = useRouteMatch()
    const { admin, sidebarOpen, closeSidebar, location } = props
    const { pathname } = location

    const { restaurantId, role } = admin

    return (<div className={sidebarOpen ? "sidebar-responsive" : ""} id="sidebar">
        <div className="sidebar__title">
            <div className="sidebar__img">
                <img src={logo} alt="logo" />
                <DineMateTitle/>
            </div>
            <i className="fa fa-times" id="sidebarIcon" onClick={() => closeSidebar()}/>
        </div>

        <div className="sidebar__menu">
            <div className={`sidebar__link ${pathname.includes('/dashboard') ? 'active_menu_link' : null}`}>
                <i className="fa fa-home"/>
                <Link to={`${url}`}>Dashboard</Link>
            </div>
            {!restaurantId ?
                <>
                    <h2>Super Admin</h2>
                    <div className={`sidebar__link ${pathname.includes('/addRestaurant') ? 'active_menu_link' : null}`}>
                        <i className="fa fa-plus"/>
                        <Link to={`${url}/addRestaurant`}>Add Restaurants</Link>
                    </div>
                    <div className={`sidebar__link ${pathname.includes('/restaurants') ? 'active_menu_link' : null}`}>
                        <i className="fa fa-cutlery"/>
                        <Link to={`${url}/restaurants`}>Restaurants Management</Link>
                    </div>
                    <div className={`sidebar__link ${pathname.includes('/usersManagement') ? 'active_menu_link' : null}`}>
                        <i className="fa fa-user" />
                        <Link to={`${url}/usersManagement`}>Users Management</Link>
                    </div>
                    <div className={`sidebar__link sidebar_disabled_link ${pathname.includes('/qrsManagement') ? 'active_menu_link' : null}`}>
                        <i className="fa fa-qrcode"/>
                        <Link to={pathname}>QRs Management</Link>
                    </div>
                    <div className="sidebar__link sidebar_disabled_link">
                        <i className="fa fa-files-o" />
                        <Link to={pathname}>Registration Requests</Link>
                    </div>
                </> :
                <>
                    {role === "SuperAdmin" || role === "Admin" ? <>
                        <h2>Restaurant Admin</h2>
                        <div className={`sidebar__link ${pathname.includes('/tablesManagement') ? 'active_menu_link' : null}`}>
                            <i className="fa fa-building-o" />
                            <Link to={`${url}/tablesManagement`}>Tables Management</Link>
                        </div>
                        <div className={`sidebar__link ${pathname.includes('/categoriesManagement') ? 'active_menu_link' : null}`}>
                            <i className="fa fa-list" />
                            <Link to={`${url}/categoriesManagement`}>Categories Management</Link>
                        </div>
                        <div className={`sidebar__link ${pathname.includes('/menuManagement') ? 'active_menu_link' : null}`}>
                            <i className="fa fa-cutlery" />
                            <Link to={`${url}/menuManagement`}>Menu Management</Link>
                        </div>
                        <div className={`sidebar__link ${pathname.includes('/addFoodItem') ? 'active_menu_link' : null}`}>
                            <i className="fa fa-plus" />
                            <Link to={`${url}/addFoodItem`}>Add Food Item</Link>
                        </div>
                        <div className={`sidebar__link ${pathname.includes('/usersManagement') ? 'active_menu_link' : null}`}>
                            <i className="fa fa-users" />
                            <Link to={`${url}/usersManagement`}>Users Management</Link>
                        </div>
                        <div className="sidebar__link sidebar_disabled_link">
                            <i className="fa fa-list" />
                            <Link to={`${pathname}`}>Schedule Management</Link>
                        </div>
                        <div className={`sidebar__link sidebar_disabled_link`}>
                            <i className="fa fa-wrench" />
                            <Link to={pathname}>Settings</Link>
                        </div>
                        </> : null // <h2>Kitchen Admin</h2>
                    }
                    {/* <div className="sidebar__link">
                        <i className="fa fa-archive" />
                        <Link to={`${url}/orderManagement`}>Orders Management</Link>
                    </div>
                    <div className="sidebar__link">
                        <i className="fa fa-handshake-o" />
                        <Link to={`/customer/`} target="_blank">Contracts</Link>
                    </div>
                    <div className="sidebar__link">
                        <i className="fa fa-question" />
                        <Link to={`${url}/adc`}>Requests</Link>
                    </div>
                    <div className="sidebar__link">
                        <i className="fa fa-files-o" />
                        <Link to={`${url}/adc`}>Apply for Leaves</Link>
                    </div>
                    <div className={`sidebar__link ${pathname.includes('/others') ? 'active_menu_link' : null}`}>
                        <i className="fa fa-wrench" />
                        <Link to={`${url}/others`}>Settings</Link>
                    </div> */}
                    {admin.role === "SuperAdmin" ?
                        <div className="LeaveButtonContainer">
                            <SmallButtonRed
                                text="Leave Restaurant"
                                iconLeft={<i className="fa fa-backward" />}
                                onClick={() => {
                                    dispatch(customisedAction(RESET_RESTAURANT))
                                    props.history.push(`${url}`)
                                }}/>
                        </div>
                    : null}
                </>
            }
        </div>
    </div>)
}

export default withRouter(SideBar)
