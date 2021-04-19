
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import logo from '../../assets/logo.png';
import SearchBar from '../../components/SeachBar';

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
                <div className="header-search-location">
                    <SearchBar iconName={faMapMarkerAlt} iconSize="2x" text="Missigua, Ontario" />
                </div>
                <div className="header-search-user" style={{ paddingLeft: 35, paddingRight: 35 }}>
                    <SearchBar text="Rayan Levin" />
                </div>
                <div className="header-search-user" style={{ backgroundColor: 'orange', color: 'white', display: 'flex', justifyContent: 'center' }}>
                    <SearchBar cart text="CART" quantity="0" fontSize="24" fontSizeQuantity="32" />
                </div>
            </div>
        </div>
    )
}

export default Header