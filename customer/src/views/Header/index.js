import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import "./styles.css"
import { HeaderButton, Logo, MenuIcon } from '../../components';
import { useEffect } from 'react';
import { GET_ORDER_ITEMS, INITIALIZE_ORDER, SUBMIT_ORDER_ITEM, TAKIE_AWAY_ORDER } from '../../constants';
import { customisedAction } from '../../redux/actions';
import { getItem } from '../../helpers';

const Header = props => {

    const customer = useSelector(({ sessionReducer }) => sessionReducer.customer)

    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("")
    const [updateState, setUpdateState] = useState(true)
    const [orderDetail, setOrderDetail] = useState("")
    let dispatch = useDispatch()

    let cartItemR = useSelector(({ orderReducer }) => orderReducer.cartMenu)
    let OrderItems = useSelector(({ getOrderItemsReducer }) => getOrderItemsReducer.OrderItems)

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        let value = urlParams.get("value")
        console.log(urlParams)
        if (value) {
            setSearch(value)
        } else {

            setSearch('')
        }
    }, [window.location.search])
    console.log(OrderItems)


    useEffect(() => {
        let arr = []
        if (cartItemR) {
            cartItemR.map((a, i) => {
                arr.push({
                    "quantity": a.quantity,
                    "name": a.name,
                    "price": a.price,
                    "totalPrice": a.totalPrice,
                    "specialInstructions": a.shortDescription,
                    "addOns": a.addOns,
                    "restaurantId": a.restaurantId,
                    "status": true
                })
            })
            setItems(arr)
        } else {
            let data = JSON.parse(localStorage.getItem('cartMenu'))
            if (data) {
                data.map((a, i) => {
                    arr.push({
                        "quantity": a.quantity,
                        "name": a.name,
                        "price": a.price,
                        "totalPrice": a.totalPrice,
                        "specialInstructions": a.shortDescription,
                        "addOns": a.addOns,
                        "restaurantId": a.restaurantId,
                        "status": true

                    })
                })
                setItems(arr)
            } else {
                setItems([])
            }
        }
        if (OrderItems) {
            OrderItems.map((a, i) => {
                arr.push({
                    "id": a.id,
                    "name": a.name,
                    "quantity": a.quantity,
                    "totalPrice": a.totalPrice,
                    "status": false
                })
            })
            setItems(arr)
        }
    }, [cartItemR, OrderItems])

    useEffect(() => {
        setOrderDetail(getItem("orderDetails"))

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

    useEffect(() => {
        if (orderDetail) {

            let obj = {
                restaurantId: orderDetail.restaurantId,
                orderNumber: orderDetail.orderNumber,

            }
            console.log('runnn')
            dispatch(customisedAction(GET_ORDER_ITEMS, obj))
        }

    }, [orderDetail, updateState])

    const submitOrder = () => {
        setUpdateState(false)

        if (!OrderItems) {
            if (orderDetail) {

                let obj = {
                    "restaurantId": orderDetail.restaurantId,
                    "orderNumber": orderDetail.orderNumber,
                    "items": items
                }
                dispatch(customisedAction(SUBMIT_ORDER_ITEM, obj))
                setTimeout(() => {
                    dispatch(customisedAction(GET_ORDER_ITEMS, obj))
                }, [300])
                setNetItems()
                setUpdateState(true)
            } else {
                let itemsArr = getItem('cartMenu')
                let obj = {
                    "restaurantId": itemsArr[0].restaurantId,
                    "items": itemsArr
                }
                dispatch(customisedAction(TAKIE_AWAY_ORDER, obj))
                setTakeAway(itemsArr)
            }


        } else {
            if (orderDetail) {
                let obj = {
                    "restaurantId": orderDetail.restaurantId,
                    "orderNumber": orderDetail.orderNumber,
                    "items": getItem('cartMenu')
                }
                dispatch(customisedAction(SUBMIT_ORDER_ITEM, obj))
                setTimeout(() => {
                    dispatch(customisedAction(GET_ORDER_ITEMS, obj))
                }, [300])
                setNetItems()
                setUpdateState(true)
            }

        }

    }
    const setTakeAway = (itemsArr) => {
        let arr = []
        itemsArr.map((a, i) => {
            arr.push({
                "id": a.id,
                "name": a.name,
                "quantity": a.quantity,
                "totalPrice": a.totalPrice,
                "status": false
            })
        })
        setItems([])
        setItems(arr)
    }
    const setNetItems = () => {
        let arr = []
        if (OrderItems) {
            OrderItems.map((a, i) => {
                arr.push({
                    "id": a.id,
                    "name": a.name,
                    "quantity": a.quantity,
                    "totalPrice": a.totalPrice,
                    "status": false
                })
            })
            setItems([])
            setItems(arr)
        }
    }
    const totalAmountFn = () => {
        let price = 0
        if (items.length) {
            items.map((a, i) => price += a.price ? a.price : a.totalPrice)
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
    function submitTakeAway() {
        // let obj = {
        //     "restaurantId": products[0].restaurantId,
        //     "items": products
        // }
        // dispatch(customisedAction(TAKIE_AWAY_ORDER, obj))
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
                                            {orderDetail ?
                                                <>
                                                    <div className="unlockItems">
                                                        <p>New Items</p>
                                                        {
                                                            items.length ? items.filter((a) => a.status).map((item, i) => {
                                                                return (
                                                                    <>
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
                                                                    </>
                                                                )
                                                            }) : null
                                                        }
                                                    </div>
                                                    <div className="lockItem">
                                                        <p>Submitted Item</p>
                                                        {
                                                            items.length ? items.filter((a) => !a.status).map((item, i) => {
                                                                return (
                                                                    <>
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
                                                                    </>
                                                                )
                                                            }) : null
                                                        }
                                                    </div>
                                                </>
                                                :


                                                items.length ? items.map((item, i) => {
                                                    return (
                                                        <>
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
                                                        </>
                                                    )
                                                }) : null

                                            }

                                        </div>
                                    </div>

                                    <div className="checkout-button" >
                                        <span>
                                            {
                                               
                                                totalQuantityFn()
                                            }
                                        </span>

                                        <span>
                                            Next: Checkout
                                        </span>

                                        <span>
                                            ${
                                              
                                                totalAmountFn()
                                            }
                                        </span>
                                    </div>
                                    <div className="orderSubBtn">
                                        <button className="submitOrder" onClick={() => { orderDetail ? submitOrder() : submitTakeAway() }}>{OrderItems && orderDetail ? `Add Items` : `Submit Order`}</button>
                                        <button className="addItem" onClick={() => props.history.push('/customer/checkout')}>Close Order</button>
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