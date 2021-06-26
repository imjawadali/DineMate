import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import "./styles.css"
import { HeaderButton, Logo, MenuIcon } from '../../components';
import { useEffect } from 'react';
import { SUBMIT_ORDER_ITEM } from '../../constants';
import { customisedAction } from '../../redux/actions';

const Header = props => {

    const customer = useSelector(({ sessionReducer }) => sessionReducer.customer)

    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("")
    let dispatch = useDispatch()

    let cartItemR = useSelector(({ orderReducer }) => orderReducer.cartMenu)

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
        if (cartItemR) {
            setItems(cartItemR)
        } else {
            let data = JSON.parse(localStorage.getItem('cartMenu'))
            if (data) {
                setItems(data)
                console.log(data)
            } else {
                setItems([])
            }
        }
    }, [cartItemR])

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

    const submitOrder = () => {
        let obj = {
            "restaurantId": items[0].restaurantId,
            "orderNumber": "000000032",
            "items": items
        }
        console.log(obj)
        dispatch(customisedAction(SUBMIT_ORDER_ITEM, obj))

    }
    const totalAmountFn = () => {
        let price = 0
        if (items.length) {
            items.map((a, i) => price += a.price)
        }
        return price
    }
    const totalQuantityFn = () => {
        let quantity = 0
        if (items.length) {
            items.map((a, i) => quantity += a.quantity)
        }
        return quantity
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
                                                        <div onClick={() => console.log(item)} className="details" key={i}>
                                                            <div>
                                                                <div className="selected-quantity">
                                                                    {item.quantity}
                                                                </div>
                                                            </div>

                                                            <div className="item-description">
                                                                <div className="item-title">
                                                                    {item.name}
                                                                </div>

                                                                <div className="size-title">
                                                                    {item.shortDescription}
                                                                </div>
                                                            </div>

                                                            <div className="amount">
                                                                ${item.totalPrice}
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
                                                // items && items.length > 0 ?
                                                //     items.reduce((prevItem, currentItem) => Number(prevItem.quantity) + Number(currentItem.quantity))
                                                //     :
                                                //     0
                                                totalQuantityFn()
                                            }
                                        </span>

                                        <span>
                                            Next: Checkout
                                        </span>

                                        <span>
                                            ${
                                                // items && items.length > 0 ?
                                                // items.reduce((prevItem, currentItem) => prevItem.totalPrice + currentItem.totalPrice)
                                                // :
                                                // 0
                                            totalAmountFn()
                                            }
                                        </span>
                                    </div>
                                    <div className="orderSubBtn">
                                        <button className="submitOrder" onClick={submitOrder}>Submit Order</button>
                                        <button className="addItem">Close Order</button>
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