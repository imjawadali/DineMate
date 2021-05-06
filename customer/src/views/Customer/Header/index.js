import React from 'react'
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSearch, faMapMarkerAlt, faTimes } from '@fortawesome/free-solid-svg-icons'

import logo from '../../../assets/logo.png';
import SearchBar from '../../../components/SeachBar';
import "./styles.css"

const Header = props => {

    const toggleCartModal = () => {
        let cartModal = document.getElementById("cart_modal");
        let justificationDiv = document.getElementById("justification_div");
        console.log(cartModal.style.display)
        if (cartModal.style.display == 'none' || !cartModal.style.display) {
            cartModal.style.display = 'block';
            justificationDiv.style.display = 'none';
        } else if (cartModal.style.display == 'block') {
            cartModal.style.display = 'none';
            justificationDiv.style.display = 'block';
        }
    }

    return (
        <div className="global-header">
            <div className="global-header-inner">
                <div className="global-header-left">
                    <div className="header-icon-logo-container">
                        <div className="header-icon">
                            <div className="sidebar-logo">
                                <img src={require("../../../assets/hamburger.png").default} alt="Logo" style={{ width: '100%', height: '100%' }} />
                            </div>
                        </div>
                        <div className="header-logo">
                            <img onClick={() => props.history.push('/')} src={logo} alt="Logo" />
                        </div>
                    </div>
                    <div className="global-header-search-user global-location-bar" >
                        <SearchBar NOW text="Missigua, Ontario" image={require("../../../assets/marker.png").default} />
                    </div>

                </div>
                <div className="global-header-right">
                    <div className="global-header-search-location">
                        <SearchBar iconName={faSearch} text="What are you craving?" image={""} />
                    </div>

                    <div
                        className="global-header-search-user"
                        style={{ backgroundColor: '#EA3936', color: 'white', display: 'flex', justifyContent: 'center', cursor: 'pointer' }}
                        onClick={toggleCartModal}
                    >
                        <SearchBar cart text="CART" white quantity="0" style={{ alignItem: 'center', justifyContent: 'center', color: 'white' }} />
                    </div>

                    <div className="cart" id="cart_modal">
                        <div className="cart-content">
                            <div className="cart-header">
                                <FontAwesomeIcon icon={faTimes} className="icon-starz" onClick={toggleCartModal} />
                            </div>

                            <div className="content">
                                <div className="your-order-title">Your Order</div>

                                <div className="restaurant-name-div">
                                    <span>From: </span>
                                    <span className="restaurant-title">Tim Hortons </span>
                                </div>

                                <div className="details">
                                    <div>
                                        <select className="selection-box">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                        </select>
                                    </div>

                                    <div className="item-description">
                                        <div className="item-title">
                                            Iced Cap
                                        </div>

                                        <div className="size-title">
                                            Size
                                        </div>

                                        <div className="size">
                                            Small
                                        </div>
                                    </div>

                                    <div className="amount">
                                        $1.79
                                    </div>
                                </div>
                            </div>

                            <div className="checkout-button">
                                <span>
                                    1
                                </span>

                                <span>
                                    Next: Checkout
                                </span>

                                <span>
                                    $1.79
                                </span>
                            </div>
                        </div>
                    </div>

                    <div id="justification_div"></div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Header)