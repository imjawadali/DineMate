import React, { useState } from 'react'
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import "./styles.css"
import { HeaderButton, Logo, MenuIcon } from '../../components';

const Header = props => {

    const [items] = useState([
        {
            name: 'Burger',
            size: 'Medium',
            price: 1.79,
            quantity: 1
        },
        {
            name: 'Ice Cream',
            size: 'Small',
            price: 2.86,
            quantity: 3
        }
    ]);

    const toggleCartModal = () => {
        let cartModal = document.getElementById("cart_modal");
        let justificationDiv = document.getElementById("justification_div");
        if (cartModal.style.display == 'none' || !cartModal.style.display) {
            cartModal.style.display = 'block';
            justificationDiv.style.display = 'none';
        } else if (cartModal.style.display == 'block') {
            cartModal.style.display = 'none';
            justificationDiv.style.display = 'block';
        }
    }

    return (
        props && props.location && props.location.pathname !== '/' ?
            props.location.pathname.includes('/customer') ?
                <div className="HeaderContainer">
                    <div className="HeaderInnerContainer">
                        <div className="HeaderLeft">
                            <MenuIcon onClick={() => null} />
                            <Logo
                                src={require('../../assets/logo.png').default}
                                onClick={() => props.history.push('/')}
                            />
                            <div className="HeaderInputContainer">
                                <div className="HeaderLocationBarContainer">
                                    <img className="HeaderInputIcon" src={require('../../assets/marker.png').default} />
                                    <input
                                        className="HeaderInput"
                                        placeholder="Mississauga"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="HeaderRight">
                            <div className="HeaderInputContainer" style={{ justifyContent: 'flex-start' }}>
                                <div className="HeaderSearchBarContainer">
                                    <img className="HeaderInputIcon" src={require('../../assets/search_icon.png').default} />
                                    <input
                                        className="HeaderInput"
                                        placeholder="What are you craving?"
                                    />
                                </div>
                            </div>
                            <HeaderButton
                                red
                                src={require('../../assets/cart.png').default}
                                text="Cart"
                                itemCounts={0}
                                onClick={toggleCartModal}
                            />

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

                                        <div className="item-details">
                                            {
                                                items.map((item, i) => {
                                                    return (
                                                        <div className="details" key={i}>
                                                            <div>
                                                                <select className="selection-box" value={item.quantity}>
                                                                    <option value={1}>1</option>
                                                                    <option value={2}>2</option>
                                                                    <option value={3}>3</option>
                                                                </select>
                                                            </div>

                                                            <div className="item-description">
                                                                <div className="item-title">
                                                                    {item.name}
                                                                </div>

                                                                <div className="size-title">
                                                                    Size
                                                            </div>

                                                                <div className="size">
                                                                    {item.size}
                                                                </div>
                                                            </div>

                                                            <div className="amount">
                                                                ${item.price}
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>

                                    <div className="checkout-button">
                                        <span>
                                            {
                                                items.length > 0 ?
                                                    items.reduce((prevItem, currentItem) => prevItem.quantity + currentItem.quantity)
                                                    :
                                                    0
                                            }
                                        </span>

                                        <span>
                                            Next: Checkout
                                        </span>

                                        <span>
                                            ${
                                                items.length > 0 ?
                                                    items.reduce((prevItem, currentItem) => prevItem.price + currentItem.price)
                                                    :
                                                    0
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div id="justification_div"></div>
                        </div>
                    </div>
                </div>
                : <div className="HeaderContainer">
                    <MenuIcon onClick={() => null} />
                    <div className="HeaderLogoContainer">
                        <Logo
                            src={require('../../assets/logo.png').default}
                            onClick={() => props.history.push('/')}
                        />
                    </div>
                    <HeaderButton
                        src={require('../../assets/signin_icon.png').default}
                        text="Sign In"
                    />
                    <HeaderButton
                        red
                        text="Sign Up"
                    />
                </div>
            : null
    )
}

export default withRouter(Header)