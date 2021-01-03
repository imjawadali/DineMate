import React from 'react'
import { useDispatch } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'

import { customisedAction } from '../../../redux/actions'
import { ADMIN_LOGOUT } from '../../../constants'
import { removeItem } from '../../../helpers'

import avatar from '../../../assets/avatar.svg'
import './styles.css'

function NavBar(props) {

    const dispatch = useDispatch()

    let { url } = useRouteMatch()
    let { openSidebar } = props

    return (
        <nav className="navbar">
            <div className="nav_icon" onClick={() => openSidebar()}>
                <i className="fa fa-bars" />
            </div>
            <div className="navbar__left">
                <p>Welcome to Admin</p>
            </div>
            <div className="navbar__right">
                <i className="fa fa-search" />
                <i className="fa fa-power-off" onClick={() => {
                    removeItem('admin')
                    dispatch(customisedAction(ADMIN_LOGOUT))
                }}/>
                <img src={avatar} width="30" alt="avatar" />
            </div>
        </nav>
    )
}

export default NavBar
