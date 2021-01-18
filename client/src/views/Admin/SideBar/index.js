import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

import { DineMateTitle } from '../../../components'

import logo from '../../../assets/logo.png'
import './styles.css'
import { ADMIN_SIGN_IN } from '../../../constants'

function SideBar(props) {

    let { url } = useRouteMatch()
    let { admin, sidebarOpen, closeSidebar } = props

    return (<div className={sidebarOpen ? "sidebar-responsive" : ""} id="sidebar">
        <div className="sidebar__title">
            <div className="sidebar__img">
                <img src={logo} alt="logo" />
                <DineMateTitle/>
            </div>
            <i className="fa fa-times" id="sidebarIcon" onClick={() => closeSidebar()}/>
        </div>

        <div className="sidebar__menu">
            <div className="sidebar__link active_menu_link">
                <i className="fa fa-home" onClick={() => null}/>
                <Link to={`${url}`}>Dashboard</Link>
            </div>
            {admin.role === "SuperAdmin" ? <h2>Super Admin</h2> : null}
            {admin.role === "SuperAdmin" ?
                <div className="sidebar__link">
                    <i className="fa fa-building-o" onClick={() => null}/>
                    <Link to={`${url}/restaurants`}>Restaurants Management</Link>
                </div>
                : null }
            <h2>LEAVE</h2>
            <div className="sidebar__link">
                <i className="fa fa-wrench" onClick={() => null}/>
                <Link to={`${url}/others`}>Company Management</Link>
            </div>
            <div className="sidebar__link">
                <i className="fa fa-user-secret" onClick={() => null}/>
                <Link to={`${url}/adc`}>Employee Management</Link>
            </div>
            <div className="sidebar__link">
                <i className="fa fa-archive" onClick={() => null}/>
                <Link to={`${url}/adc`}>Warehouse</Link>
            </div>
            <div className="sidebar__link">
                <i className="fa fa-handshake-o" onClick={() => null}/>
                <Link to={`${url}/adc`}>Contracts</Link>
            </div>
            <h2>PAYROLL</h2>
            <div className="sidebar__link">
                <i className="fa fa-question" onClick={() => null}/>
                <Link to={`${url}/adc`}>Requests</Link>
            </div>
            <div className="sidebar__link">
                <i className="fa fa-sign-out" onClick={() => null}/>
                <Link to={`${url}/adc`}>Leave Policy</Link>
            </div>
            <div className="sidebar__link">
                <i className="fa fa-files-o" onClick={() => null}/>
                <Link to={`${url}/adc`}>Apply for Leaves</Link>
            </div>
        </div>
    </div>)
}

export default SideBar
