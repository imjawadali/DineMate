import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { customisedAction } from '../../../redux/actions'
import { ADMIN_LOGOUT, SESSION_CHECK_DONE } from '../../../constants'
import { removeItem } from '../../../helpers'

import avatar from '../../../assets/avatar.svg'
import './styles.css'

function NavBar(props) {

    const admin = useSelector(({ sessionReducer }) => sessionReducer.admin)
    const dispatch = useDispatch()

    let { openSidebar, location, history } = props
    const { restaurantName, role } = admin

    return (
        <nav className="navbar">
            <div className="nav_icon" onClick={() => openSidebar()}>
                <i style={{ display: role === "Kitchen" && location.pathname.includes('/dashboard') ? 'none' : '' }} className="fa fa-bars" />
            </div>
            <div className="navbar__left">
                <h3>{restaurantName || 'Welcome to Admin'}</h3>
            </div>
            <div className="navbar__right">
                <i className="fa fa-power-off" onClick={() => {
                    removeItem('admin')
                    dispatch(customisedAction(ADMIN_LOGOUT))
                    dispatch(customisedAction(SESSION_CHECK_DONE))
                }} />
                <img
                    src={avatar}
                    width="30"
                    alt="avatar"
                    onClick={() =>
                        history.push(
                            `/client/admin/${role !== 'SuperAdmin' ? 'restaurant/' : ''}updatePassword`
                        )
                    }
                />
            </div>
        </nav>
    )
}

export default NavBar
