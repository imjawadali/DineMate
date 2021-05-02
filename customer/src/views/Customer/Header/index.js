import React from 'react'
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSearch, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

import logo from '../../../assets/logo.png';
import SearchBar from '../../../components/SeachBar';
import "./styles.css"

const Header = props => {
    return (
        <div className="global-header">
            <div className="global-header-inner">
                <div className="global-header-left">
                    <div className="header-icon-logo-container">
                        <div className="header-icon">
                            <div className="sidebar-logo">
                                <img src={require("../../../assets/hamburger.png").default} alt="Logo" style={{width:'100%',height:'100%'}} />
                            </div>
                        </div>
                        <div className="header-logo">
                            <img onClick={() => props.history.push('/')} src={logo} alt="Logo" />
                        </div>
                    </div>
                    <div className="global-header-search-user global-location-bar" >
                        <SearchBar  NOW text="Missigua, Ontario" image={require("../../../assets/marker.png").default} />
                    </div>

                </div>
                <div className="global-header-right">
                    <div className="global-header-search-location">
                        <SearchBar iconName={faSearch} text="What are you craving?" image={""} />
                    </div>

                    <div className="global-header-search-user" style={{ backgroundColor: '#EA3936', color: 'white', display: 'flex', justifyContent: 'center' }}>
                        <SearchBar cart text="CART"  white quantity="0" style={{ alignItem: 'center', justifyContent: 'center', color: 'white' }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Header)