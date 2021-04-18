
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import logo from '../../assets/logo.png';

const Header = props => {
    return (
        <div className="header">
            <div className="header-icon">
                <FontAwesomeIcon icon={faBars} size="2x" />
            </div>
            <div className="header-logo">
                <img src={logo} alt="Logo" />
            </div>
            <div className="header-searches">
            </div>
        </div>
    )
}

export default Header