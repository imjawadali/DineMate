
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSearch, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import logo from '../../assets/logo.png';
import SearchBar from '../../components/SeachBar';

const Header = props => {
    return (
        <div className="header">
            <div className="header-icon-logo-container">
                <div className="header-icon">
                    <FontAwesomeIcon className="header-icon-style menu-icon" icon={faBars} style={{ fontSize: 36 }} />
                </div>
                <div className="header-logo">
                    <img src={logo} alt="Logo" />
                </div>
            </div>

            <div className="header-searches">
                <div className="header-search-user location-bar" >
                    {/* <SearchBar text="Rayan Levin" /> */}
                    <SearchBar iconName={faMapMarkerAlt} NOW text="Missigua, Ontario" />
                </div>

                <div className="header-search-location">
                    <SearchBar iconName={faSearch} text="What are you craving?" />
                    {/* <SearchBar iconName={faMapMarkerAlt} NOW text="Missigua, Ontario" /> */}
                </div>

                <div className="header-search-user" style={{ backgroundColor: '#EA3936', color: 'white', display: 'flex', justifyContent: 'center' }}>
                    <SearchBar cart text="CART" white quantity="0" style={{ alignItem: 'center', justifyContent: 'center', color: 'white' }} />
                </div>
            </div>
        </div>
    )
}

export default Header