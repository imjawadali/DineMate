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
                <DineMateTitle />
            </div>
            <i className="fa fa-times" id="sidebarIcon" onClick={() => closeSidebar()} />
        </div>

        <div className="sidebar__menu">
            <div className={`sidebar__link ${pathname.includes('/dashboard') ? 'active_menu_link' : null}`}>
                <i style={{ width: '20px' }} className="fa fa-home" />
                <Link to={`${url}`}>Dashboard</Link>
            </div>
            {!restaurantId ?
                <>
                    <h2>Super Admin</h2>
                    <div className={`sidebar__link ${pathname.includes('/addRestaurant') ? 'active_menu_link' : null}`}>
                        <i style={{ width: '20px' }} className="fa fa-plus" />
                        <Link to={`${url}/addRestaurant`}>Add Restaurant</Link>
                    </div>
                    <div className={`sidebar__link ${pathname.includes('/restaurants') ? 'active_menu_link' : null}`}>
                        <i style={{ width: '20px' }} className="fa fa-cutlery" />
                        <Link to={`${url}/restaurants`}>Restaurants Management</Link>
                    </div>
                    {pathname.includes('/qrsManagement') ?
                        <div className={`sidebar__link ${pathname.includes('/qrsManagement') ? 'active_menu_link' : null}`}>
                            <i style={{ width: '20px' }} className="fa fa-qrcode" />
                            <Link to={pathname}>QRs Management</Link>
                        </div>
                        : null}
                    {pathname.includes('/editRestaurant') ?
                        <div className={`sidebar__link ${pathname.includes('/editRestaurant') ? 'active_menu_link' : null}`}>
                            <i style={{ width: '20px' }} className="fa fa-edit" />
                            <Link to={pathname}>Edit Restaurant</Link>
                        </div>
                        : null}
                    <div className={`sidebar__link ${pathname.includes('/usersManagement') ? 'active_menu_link' : null}`}>
                        <i style={{ width: '20px' }} className="fa fa-users" />
                        <Link to={`${url}/usersManagement`}>User Management</Link>
                    </div>
                    <div className={`sidebar__link ${pathname.includes('/updatePassword') ? 'active_menu_link' : null}`}>
                        <i style={{ width: '20px' }} className="fa fa-cogs" />
                        <Link to={`${url}/updatePassword`}>Update Password</Link>
                    </div>
                    <div className={`sidebar__link ${pathname.includes('/faqsManagement') ? 'active_menu_link' : null}`}>
                        <i style={{ width: '20px' }} className="fa fa-question" />
                        <Link to={`${url}/faqsManagement`}>Faqs Management</Link>
                    </div>
                    <div className={`sidebar__link ${pathname.includes('/settings') ? 'active_menu_link' : null}`}>
                        <i style={{ width: '20px' }} className="fa fa-wrench" />
                        <Link to={`${url}/settings`}>Settings</Link>
                    </div>
                </> :
                <>
                    {role === "SuperAdmin" || role === "Admin" ? <>
                        <h2>Restaurant Admin</h2>
                        <div className={`sidebar__link ${pathname.includes('/ordersManagement') ? 'active_menu_link' : null}`}>
                            <i style={{ width: '20px' }} className="fa fa-archive" />
                            <Link to={`${url}/ordersManagement`}>Order Management</Link>
                        </div>
                        <div className={`sidebar__link ${pathname.includes('/reservations') ? 'active_menu_link' : null}`}>
                            <i style={{ width: '20px' }} className="fa fa-book" />
                            <Link to={`${url}/reservations`}>Reservations</Link>
                        </div>
                        <div className={`sidebar__link ${pathname.includes('/staffManagement') ? 'active_menu_link' : null}`}>
                            <i style={{ width: '20px' }} className="fa fa-user" />
                            <Link to={`${url}/staffManagement`}>Staff Management</Link>
                        </div>
                        <div className={`sidebar__link ${pathname.includes('/tablesManagement') ? 'active_menu_link' : null}`}>
                            <i style={{ width: '20px' }} className="fa fa-building-o" />
                            <Link to={`${url}/tablesManagement`}>Table Management</Link>
                        </div>
                        <div className={`sidebar__link ${pathname.includes('/categoriesManagement') ? 'active_menu_link' : null}`}>
                            <i style={{ width: '20px' }} className="fa fa-list" />
                            <Link to={`${url}/categoriesManagement`}>Category Management</Link>
                        </div>
                        <div className={`sidebar__link ${pathname.includes('/menuManagement') ? 'active_menu_link' : null}`}>
                            <i style={{ width: '20px' }} className="fa fa-cutlery" />
                            <Link to={`${url}/menuManagement`}>Menu Management</Link>
                        </div>
                        <div className={`sidebar__link ${pathname.includes('/addFoodItem') ? 'active_menu_link' : null}`}>
                            <i style={{ width: '20px' }} className="fa fa-plus" />
                            <Link to={`${url}/addFoodItem`}>Add Food Item</Link>
                        </div>
                        <div className={`sidebar__link ${pathname.includes('/usersManagement') ? 'active_menu_link' : null}`}>
                            <i style={{ width: '20px' }} className="fa fa-users" />
                            <Link to={`${url}/usersManagement`}>User Management</Link>
                        </div>
                        <div className={`sidebar__link ${pathname.includes('/updatePassword') ? 'active_menu_link' : null}`}>
                            <i style={{ width: '20px' }} className="fa fa-cogs" />
                            <Link to={`${url}/restaurant/updatePassword`}>Update Password</Link>
                        </div>
                        <div className={`sidebar__link ${pathname.includes('/settings') ? 'active_menu_link' : null}`}>
                            <i style={{ width: '20px' }} className="fa fa-wrench" />
                            <Link to={`${url}/settings`}>Restaurant Settings</Link>
                        </div>
                        <div className={`sidebar__link ${pathname.includes('/scheduleManagement') ? 'active_menu_link' : null}`}>
                            <i style={{ width: '20px' }} className="fa fa-clock-o" />
                            <Link to={`${url}/scheduleManagement`}>Schedule Management</Link>
                        </div>
                        <div className={`sidebar__link ${pathname.includes('/feedbacks') ? 'active_menu_link' : null}`}>
                            <i style={{ width: '20px' }} className="fa fa-comments" />
                            <Link to={`${url}/feedbacks`}>Feedbacks</Link>
                        </div>
                    </> : role === 'Staff' ?
                        <>
                            <h2>Staff</h2>
                            <div className={`sidebar__link ${pathname.includes('/ordersManagement') ? 'active_menu_link' : null}`}>
                                <i style={{ width: '20px' }} className="fa fa-archive" />
                                <Link to={`${url}/ordersManagement`}>Order Management</Link>
                            </div>
                            <div className={`sidebar__link ${pathname.includes('/staffManagement') ? 'active_menu_link' : null}`}>
                                <i style={{ width: '20px' }} className="fa fa-user" />
                                <Link to={`${url}/staffManagement`}>Staff Management</Link>
                            </div>
                            <div className={`sidebar__link ${pathname.includes('/updatePassword') ? 'active_menu_link' : null}`}>
                                <i style={{ width: '20px' }} className="fa fa-cogs" />
                                <Link to={`${url}/restaurant/updatePassword`}>Update Password</Link>
                            </div>
                        </>
                        : <>
                            <h2>Kitchen Admin</h2>
                            <div className={`sidebar__link ${pathname.includes('/updatePassword') ? 'active_menu_link' : null}`}>
                                <i style={{ width: '20px' }} className="fa fa-cogs" />
                                <Link to={`${url}/restaurant/updatePassword`}>Update Password</Link>
                            </div>
                        </>
                    }
                    {admin.role === "SuperAdmin" ?
                        <div className="LeaveButtonContainer">
                            <SmallButtonRed
                                text="Leave Restaurant"
                                iconLeft={<i className="fa fa-backward" />}
                                onClick={() => {
                                    dispatch(customisedAction(RESET_RESTAURANT))
                                    props.history.push(`${url}`)
                                }} />
                        </div>
                        : null
                    }
                </>
            }
        </div>
    </div>)
}

export default withRouter(SideBar)
