import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import "./styles.css"
import { HeaderButton, Logo, MenuIcon } from '../../components';
import { useEffect } from 'react';

const Header = props => {

    const customer = useSelector(({ sessionReducer }) => sessionReducer.customer)

    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("")

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        let value = urlParams.get("value")
        if (value) {
            setSearch(value)
        } else {

            setSearch('')
        }
    }, [window.location.search])

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('cartMenu'))
        if (data) {
            setItems(data)
            console.log(items)
        } else {
            setItems([])
        }
    }, [])

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
                            <MenuIcon onClick={() => props.openSidebar()} />
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
                                        value={search}
                                        onChange={(ev) => setSearch(ev.target.value)}
                                    />
                                </div>
                            </div>
                            <HeaderButton
                                red
                                src={require('../../assets/cart.png').default}
                                text="Cart"
                                itemCounts={items && items.length}
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
                                                items.length ? items.map((item, i) => {
                                                    return (
                                                        <div className="details" key={i}>
                                                            <div>
                                                                <div className="selected-quantity">
                                                                    {item.quanity}
                                                                </div>
                                                            </div>

                                                            <div className="item-description">
                                                                <div className="item-title">
                                                                    {item.name}
                                                                </div>

                                                                <div className="size-title">
                                                                    Size
                                                                </div>

                                                                <div className="size">
                                                                    item.size
                                                                </div>
                                                            </div>

                                                            <div className="amount">
                                                                {item.totalPrice}
                                                            </div>
                                                        </div>
                                                    )
                                                }) : null
                                            }
                                        </div>
                                    </div>

                                    <div className="checkout-button">
                                        <span>
                                            {
                                                items && items.length > 0 ?
                                                    items.reduce((prevItem, currentItem) => prevItem.quanity + currentItem.quanity)
                                                    :
                                                    0
                                            }
                                        </span>

                                        <span>
                                            Next: Checkout
                                        </span>

                                        <span>
                                            ${
                                                items && items.length > 0 ?
                                                    items.reduce((prevItem, currentItem) => prevItem.totalPrice + currentItem.totalPrice)
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
                    <MenuIcon onClick={() => props.openSidebar()} />
                    <div className="HeaderLogoContainer">
                        <Logo
                            src={require('../../assets/logo.png').default}
                            onClick={() => props.history.push('/')}
                        />
                    </div>
                    {!customer ?
                        <>
                            <HeaderButton
                                src={require('../../assets/signin_icon.png').default}
                                text="Sign In"
                                onClick={() => props.history.push('/customer/signin')}
                            />
                            <HeaderButton
                                red
                                text="Sign Up"
                                onClick={() => props.history.push('/customer/signup')}
                            />
                        </>
                        :
                        <HeaderButton
                            red
                            src={require('../../assets/cart.png').default}
                            text="Cart"
                            itemCounts={0}
                        />
                    }
                </div>
            : null
    )
}

export default withRouter(Header)