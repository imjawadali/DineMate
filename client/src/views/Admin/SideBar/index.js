import React, { useEffect } from 'react'
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

    useEffect(() => {}, [admin])

    return (<div className={sidebarOpen ? "sidebar-responsive" : ""} id="sidebar">
        <div className="sidebar__title">
            <div className="sidebar__img">
                <img src={logo} alt="logo" />
                <DineMateTitle/>
            </div>
            <i className="fa fa-times" id="sidebarIcon" onClick={() => closeSidebar()}/>
        </div>

        <div className="sidebar__menu">
            <div className={`sidebar__link ${pathname === '/admin' ? 'active_menu_link' : null}`}>
                <i className="fa fa-home"/>
                <Link to={`${url}`}>Dashboard</Link>
            </div>
            {!admin.restaurantId ?
                <>
                    <h2>Super Admin</h2>
                    <div className={`sidebar__link ${pathname.includes('/addRestaurant') ? 'active_menu_link' : null}`}>
                        <i className="fa fa-plus"/>
                        <Link to={`${url}/addRestaurant`}>Add Restaurants</Link>
                    </div>
                    <div className={`sidebar__link ${pathname.includes('/restaurants') ? 'active_menu_link' : null}`}>
                        <i className="fa fa-building-o"/>
                        <Link to={`${url}/restaurants`}>Restaurants Management</Link>
                    </div>
                    <div className={`sidebar__link sidebar_disabled_link ${pathname.includes('/editRestaurant') ? 'active_menu_link' : null}`}>
                        <i className="fa fa-edit"/>
                        <Link to={pathname}>Edit Restaurant</Link>
                    </div>
                    <div className={`sidebar__link sidebar_disabled_link ${pathname.includes('/qrsManagement') ? 'active_menu_link' : null}`}>
                        <i className="fa fa-qrcode"/>
                        <Link to={pathname}>QRs Management</Link>
                    </div>
                </> :
                <>
                    <h2>Restaurant Admin</h2>
                    <div className={`sidebar__link ${pathname.includes('/others') ? 'active_menu_link' : null}`}>
                        <i className="fa fa-wrench" />
                        <Link to={`${url}/others`}>Company Management</Link>
                    </div>
                    <div className="sidebar__link">
                        <i className="fa fa-user-secret" />
                        <Link to={`${url}/adc`}>Employee Management</Link>
                    </div>
                    <div className="sidebar__link">
                        <i className="fa fa-archive" />
                        <Link to={`${url}/adc`}>Warehouse</Link>
                    </div>
                    <div className="sidebar__link">
                        <i className="fa fa-handshake-o" />
                        <Link to={`${url}/adc`}>Contracts</Link>
                    </div>
                    <div className="sidebar__link">
                        <i className="fa fa-question" />
                        <Link to={`${url}/adc`}>Requests</Link>
                    </div>
                    <div className="sidebar__link">
                        <i className="fa fa-sign-out" />
                        <Link to={`${url}/adc`}>Leave Policy</Link>
                    </div>
                    <div className="sidebar__link">
                        <i className="fa fa-files-o" />
                        <Link to={`${url}/adc`}>Apply for Leaves</Link>
                    </div>
                    {admin.role === "SuperAdmin" ?
                        <div className="LeaveButtonContainer">
                            <SmallButtonRed
                                text="Leave Restaurant"
                                onClick={() => {
                                    dispatch(customisedAction(RESET_RESTAURANT))
                                    props.history.push('/admin')
                                }}/>
                        </div>
                    : null}
                </>
            }
        </div>
    </div>)
}

export default withRouter(SideBar)
